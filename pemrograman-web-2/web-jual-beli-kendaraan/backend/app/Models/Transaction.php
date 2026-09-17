<?php

namespace App\Models;

use App\Enums\EscrowStatus;
use App\Enums\PaymentGatewayDriver;
use App\Enums\TransactionPaymentStatus;
use App\Enums\TransactionPayoutStatus;
use Database\Factories\TransactionFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'vehicle_id', 'buyer_id', 'seller_id', 'amount', 'payment_gateway', 'payment_status',
    'gateway_reference', 'gateway_invoice_url', 'paid_at', 'expires_at',
    'escrow_status', 'buyer_confirmed_at', 'seller_confirmed_at', 'escrow_status_before_dispute',
    'dispute_reason', 'disputed_by', 'disputed_at',
    'dispute_resolution_note', 'dispute_resolved_by', 'dispute_resolved_at',
    'payout_status',
])]
class Transaction extends Model
{
    /** @use HasFactory<TransactionFactory> */
    use HasFactory;

    protected $attributes = [
        'payment_status' => TransactionPaymentStatus::Pending,
        'gateway_reference' => null,
        'gateway_invoice_url' => null,
        'paid_at' => null,
        'expires_at' => null,
        'escrow_status' => null,
        'buyer_confirmed_at' => null,
        'seller_confirmed_at' => null,
        'escrow_status_before_dispute' => null,
        'dispute_reason' => null,
        'disputed_by' => null,
        'disputed_at' => null,
        'dispute_resolution_note' => null,
        'dispute_resolved_by' => null,
        'dispute_resolved_at' => null,
        'payout_status' => null,
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'payment_gateway' => PaymentGatewayDriver::class,
            'payment_status' => TransactionPaymentStatus::class,
            'paid_at' => 'datetime',
            'expires_at' => 'datetime',
            'escrow_status' => EscrowStatus::class,
            'buyer_confirmed_at' => 'datetime',
            'seller_confirmed_at' => 'datetime',
            'disputed_at' => 'datetime',
            'dispute_resolved_at' => 'datetime',
            'payout_status' => TransactionPayoutStatus::class,
        ];
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function disputedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'disputed_by');
    }

    public function disputeResolvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'dispute_resolved_by');
    }

    public function statusHistories(): HasMany
    {
        return $this->hasMany(TransactionStatusHistory::class)->oldest();
    }

    public function payouts(): HasMany
    {
        return $this->hasMany(TransactionPayout::class)->latest();
    }
}
