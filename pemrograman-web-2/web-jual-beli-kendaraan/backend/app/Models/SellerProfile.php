<?php

namespace App\Models;

use App\Enums\SellerProfileStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['ktp_path', 'npwp_path', 'status', 'reviewed_by', 'reviewed_at', 'rejection_reason'])]
class SellerProfile extends Model
{
    protected $attributes = [
        'npwp_path' => null,
        'reviewed_by' => null,
        'reviewed_at' => null,
        'rejection_reason' => null,
    ];

    protected function casts(): array
    {
        return [
            'status' => SellerProfileStatus::class,
            'reviewed_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
