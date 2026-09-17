<?php

namespace App\Models;

use App\Enums\VehicleStatus;
use App\Support\CatalogCache;
use Database\Factories\VehicleFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
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

    /**
     * Bump the catalog cache version on any write so cached public catalog
     * responses (see App\Support\CatalogCache) never serve stale data after
     * a status change (approve/reject/sold/etc).
     */
    protected static function booted(): void
    {
        static::saved(fn () => CatalogCache::bump());
        static::deleted(fn () => CatalogCache::bump());
    }

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

    /**
     * Single cheap relation for list views that only need a thumbnail,
     * instead of eager-loading every photo just to show the first one.
     */
    public function coverPhoto(): HasOne
    {
        return $this->hasOne(VehiclePhoto::class)->orderBy('sort_order');
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
