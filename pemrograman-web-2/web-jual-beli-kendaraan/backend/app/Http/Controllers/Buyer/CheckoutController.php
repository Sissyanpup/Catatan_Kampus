<?php

namespace App\Http\Controllers\Buyer;

use App\Enums\PaymentGatewayDriver;
use App\Enums\TransactionPaymentStatus;
use App\Escrow\EscrowStateMachine;
use App\Http\Controllers\Controller;
use App\Http\Requests\Buyer\CheckoutRequest;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use App\Models\Vehicle;
use App\Payments\PaymentGateway;

class CheckoutController extends Controller
{
    public function store(CheckoutRequest $request, Vehicle $vehicle, PaymentGateway $gateway): TransactionResource
    {
        $this->authorize('checkout', $vehicle);

        abort_if($this->hasActiveTransaction($vehicle), 409, 'Kendaraan ini sudah punya transaksi berjalan atau sudah lunas.');

        $transaction = Transaction::create([
            'vehicle_id' => $vehicle->id,
            'buyer_id' => $request->user()->id,
            'seller_id' => $vehicle->seller_id,
            'amount' => $request->validated('amount'),
            'payment_gateway' => PaymentGatewayDriver::from(config('payment.gateway')),
            'payment_status' => TransactionPaymentStatus::Pending,
        ]);

        $invoice = $gateway->createInvoice($transaction);

        $transaction->update([
            'gateway_reference' => $invoice->reference,
            'gateway_invoice_url' => $invoice->url,
            'expires_at' => $invoice->expiresAt,
        ]);

        return new TransactionResource($transaction->load('vehicle.photos'));
    }

    public function refreshStatus(Transaction $transaction, PaymentGateway $gateway, EscrowStateMachine $escrow): TransactionResource
    {
        $this->authorize('view', $transaction);

        if ($transaction->payment_status === TransactionPaymentStatus::Pending) {
            $status = $gateway->fetchStatus($transaction);

            $transaction->update([
                'payment_status' => $status,
                'paid_at' => $status === TransactionPaymentStatus::Paid ? now() : null,
            ]);

            if ($status === TransactionPaymentStatus::Paid) {
                $escrow->holdFunds($transaction);
            }
        }

        return new TransactionResource($transaction->load('vehicle.photos'));
    }

    private function hasActiveTransaction(Vehicle $vehicle): bool
    {
        return $vehicle->transactions()
            ->where(function ($query) {
                $query->where('payment_status', TransactionPaymentStatus::Paid)
                    ->orWhere(function ($pending) {
                        $pending->where('payment_status', TransactionPaymentStatus::Pending)
                            ->where(function ($notExpired) {
                                $notExpired->whereNull('expires_at')->orWhere('expires_at', '>', now());
                            });
                    });
            })
            ->exists();
    }
}
