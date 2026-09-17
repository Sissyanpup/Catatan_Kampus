<?php

namespace App\Payments;

use App\Enums\TransactionPaymentStatus;
use App\Models\Transaction;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * Simulates an invoice entirely inside the app — no outbound network call.
 * Used as the default driver so the app works in a fully offline classroom
 * demo. The buyer "pays" by visiting the frontend mock-payment page, which
 * calls MockPaymentController to flip the transaction's own status directly.
 */
class MockGateway implements PaymentGateway
{
    public function createInvoice(Transaction $transaction): GatewayInvoice
    {
        $reference = (string) Str::uuid();
        $expiresAt = Carbon::now()->addDay()->toImmutable();

        return new GatewayInvoice(
            reference: $reference,
            url: rtrim(config('app.frontend_url'), '/')."/checkout/mock/{$reference}",
            status: TransactionPaymentStatus::Pending,
            expiresAt: $expiresAt,
        );
    }

    public function fetchStatus(Transaction $transaction): TransactionPaymentStatus
    {
        return $transaction->payment_status;
    }
}
