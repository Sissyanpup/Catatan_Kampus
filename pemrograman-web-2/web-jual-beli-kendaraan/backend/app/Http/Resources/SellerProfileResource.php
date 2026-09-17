<?php

namespace App\Http\Resources;

use App\Models\SellerProfile;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin SellerProfile */
class SellerProfileResource extends JsonResource
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
            'user' => new UserResource($this->whenLoaded('user')),
            'status' => $this->status,
            'ktp_url' => route('seller-kyc.documents.show', [$this->id, 'ktp']),
            'npwp_url' => $this->npwp_path ? route('seller-kyc.documents.show', [$this->id, 'npwp']) : null,
            'reviewed_by' => $this->reviewer?->name,
            'reviewed_at' => $this->reviewed_at,
            'rejection_reason' => $this->rejection_reason,
            'created_at' => $this->created_at,
        ];
    }
}
