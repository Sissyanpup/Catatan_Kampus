<?php

namespace App\Http\Controllers\Admin;

use App\Enums\TransactionPaymentStatus;
use App\Escrow\EscrowStateMachine;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\EscrowTransitionRequest;
use App\Http\Requests\Admin\ResolveDisputeRequest;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TransactionReviewController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $this->authorize('manage', Transaction::class);

        $escrowStatus = $request->query('escrow_status');

        $transactions = Transaction::query()
            ->with(['vehicle.photos', 'buyer:id,name', 'seller:id,name'])
            ->where('payment_status', TransactionPaymentStatus::Paid)
            ->when($escrowStatus, fn ($query) => $query->where('escrow_status', $escrowStatus))
            ->latest()
            ->paginate(20);

        return TransactionResource::collection($transactions);
    }

    public function show(Transaction $transaction): TransactionResource
    {
        $this->authorize('manage', Transaction::class);

        return new TransactionResource($transaction->load(['vehicle.photos', 'buyer', 'seller', 'statusHistories.actor']));
    }

    public function approveHandover(EscrowTransitionRequest $request, Transaction $transaction, EscrowStateMachine $escrow): TransactionResource
    {
        $escrow->approveHandover($transaction, $request->user(), $request->validated('note'));

        return new TransactionResource($transaction->fresh(['vehicle.photos', 'buyer', 'seller', 'statusHistories.actor']));
    }

    public function approvePayout(EscrowTransitionRequest $request, Transaction $transaction, EscrowStateMachine $escrow): TransactionResource
    {
        $escrow->approvePayoutRelease($transaction, $request->user(), $request->validated('note'));

        return new TransactionResource($transaction->fresh(['vehicle.photos', 'buyer', 'seller', 'statusHistories.actor']));
    }

    public function markCompleted(EscrowTransitionRequest $request, Transaction $transaction, EscrowStateMachine $escrow): TransactionResource
    {
        $escrow->markCompleted($transaction, $request->user(), $request->validated('note'));

        return new TransactionResource($transaction->fresh(['vehicle.photos', 'buyer', 'seller', 'statusHistories.actor']));
    }

    public function resolveDispute(ResolveDisputeRequest $request, Transaction $transaction, EscrowStateMachine $escrow): TransactionResource
    {
        $escrow->resolveDispute($transaction, $request->user(), $request->validated('resolution'), $request->validated('note'));

        return new TransactionResource($transaction->fresh(['vehicle.photos', 'buyer', 'seller', 'statusHistories.actor']));
    }
}
