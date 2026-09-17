<?php

namespace App\Models;

use App\Enums\VehicleStatus;
use Database\Factories\VehicleFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['brand', 'model', 'year', 'price', 'mileage', 'location', 'description', 'specs', 'status', 'reviewed_by', 'reviewed_at', 'rejection_reason'])]
class Vehicle extends Model
{
    /** @use HasFactory<VehicleFactory> */
    use HasFactory, SoftDeletes;

    protected $attributes = [
        'description' => null,
        'specs' => null,
        'reviewed_by' => null,
        'reviewed_at' => null,
        'rejection_reason' => null,
    ];

    protected function casts(): array
    {
        return [
            'specs' => 'array',
            'status' => VehicleStatus::class,
            'reviewed_at' => 'datetime',
            'price' => 'decimal:2',
        ];
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function photos(): HasMany
    {
        return $this->hasMany(VehiclePhoto::class)->orderBy('sort_order');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(VehicleDocument::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', VehicleStatus::Approved);
    }
}
