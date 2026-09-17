<?php

namespace Tests\Feature\Catalog;

use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VehicleCatalogTest extends TestCase
{
    use RefreshDatabase;

    public function test_catalog_filters_by_brand(): void
    {
        Vehicle::factory()->approved()->create(['brand' => 'Toyota']);
        Vehicle::factory()->approved()->create(['brand' => 'Honda']);

        $response = $this->getJson('/api/vehicles?brand=Toyota');

        $response->assertOk();
        $this->assertCount(1, $response->json('data'));
        $this->assertSame('Toyota', $response->json('data.0.brand'));
    }

    public function test_catalog_filters_by_price_range(): void
    {
        Vehicle::factory()->approved()->create(['price' => 100_000_000]);
        Vehicle::factory()->approved()->create(['price' => 500_000_000]);

        $response = $this->getJson('/api/vehicles?price_min=200000000');

        $response->assertOk();
        $this->assertCount(1, $response->json('data'));
    }

    public function test_draft_listings_are_excluded(): void
    {
        Vehicle::factory()->create();

        $response = $this->getJson('/api/vehicles');

        $response->assertOk();
        $this->assertCount(0, $response->json('data'));
    }
}
