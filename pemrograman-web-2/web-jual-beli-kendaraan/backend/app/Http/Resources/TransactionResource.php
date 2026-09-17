<?php

namespace App\Http\Resources;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Transaction */
class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'vehicle' => new VehicleResource($this->whenLoaded('vehicle')),
            'buyer' => $this->whenLoaded('buyer', fn () => ['id' => $this->buyer->id, 'name' => $this->buyer->name]),
            'seller' => $this->whenLoaded('seller', fn () => ['id' => $this->seller->id, 'name' => $this->seller->name]),
            'seller_bank_account' => $this->when(
                $this->relationLoaded('seller') && $this->seller->relationLoaded('sellerProfile') && $this->seller->sellerProfile,
                fn () => [
                    'bank_name' => $this->seller->sellerProfile->bank_name,
                    'bank_account_number' => $this->seller->sellerProfile->bank_account_number,
                    'bank_account_holder_name' => $this->seller->sellerProfile->bank_account_holder_name,
                ]
            ),
            'amount' => $this->amount,
            'payment_gateway' => $this->payment_gateway,
            'payment_status' => $this->payment_status,
            'gateway_reference' => $this->gateway_reference,
            'gateway_invoice_url' => $this->gateway_invoice_url,
            'paid_at' => $this->paid_at,
            'expires_at' => $this->expires_at,
            'escrow_status' => $this->escrow_status,
            'buyer_confirmed_at' => $this->buyer_confirmed_at,
            'seller_confirmed_at' => $this->seller_confirmed_at,
            'dispute_reason' => $this->dispute_reason,
            'disputed_at' => $this->disputed_at,
            'dispute_resolution_note' => $this->dispute_resolution_note,
            'dispute_resolved_at' => $this->dispute_resolved_at,
            'payout_status' => $this->payout_status,
            'status_history' => $this->whenLoaded('statusHistories', fn () => TransactionStatusHistoryResource::collection($this->statusHistories)),
            'payouts' => $this->whenLoaded('payouts', fn () => TransactionPayoutResource::collection($this->payouts)),
            'created_at' => $this->created_at,
        ];
    }
}
