<?php

namespace App\Http\Controllers\Catalog;

use App\Enums\VehicleStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\VehicleDetailResource;
use App\Http\Resources\VehicleResource;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class VehicleCatalogController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $vehicles = Vehicle::query()
            ->approved()
            ->with(['photos', 'seller:id,name'])
            ->when($request->query('brand'), fn ($query, $brand) => $query->where('brand', 'like', "%{$brand}%"))
            ->when($request->query('year_min'), fn ($query, $year) => $query->where('year', '>=', $year))
            ->when($request->query('year_max'), fn ($query, $year) => $query->where('year', '<=', $year))
            ->when($request->query('price_min'), fn ($query, $price) => $query->where('price', '>=', $price))
            ->when($request->query('price_max'), fn ($query, $price) => $query->where('price', '<=', $price))
            ->when($request->query('location'), fn ($query, $location) => $query->where('location', 'like', "%{$location}%"))
            ->latest()
            ->paginate(12);

        return VehicleResource::collection($vehicles);
    }

    public function show(Vehicle $vehicle): VehicleDetailResource
    {
        abort_unless($vehicle->status === VehicleStatus::Approved, 404);

        return new VehicleDetailResource($vehicle->load(['photos', 'seller']));
    }
}
