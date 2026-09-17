<?php

namespace App\Http\Controllers\Seller;

use App\Enums\SellerProfileStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Seller\SellerKycRequest;
use App\Http\Resources\SellerProfileResource;
use App\Models\SellerProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SellerProfileController extends Controller
{
    public function show(Request $request): SellerProfileResource
    {
        $profile = $request->user()->sellerProfile;

        abort_if($profile === null, 404, 'Belum ada pengajuan KYC.');

        return new SellerProfileResource($profile);
    }

    public function store(SellerKycRequest $request): JsonResponse
    {
        $this->authorize('create', SellerProfile::class);

        $profile = $request->user()->sellerProfile()->create([
            'ktp_path' => $request->file('ktp')->store('kyc/'.$request->user()->id, 'local'),
            'npwp_path' => $request->file('npwp')?->store('kyc/'.$request->user()->id, 'local'),
            'status' => SellerProfileStatus::Pending,
        ]);

        return (new SellerProfileResource($profile))->response()->setStatusCode(201);
    }

    public function update(SellerKycRequest $request): SellerProfileResource
    {
        $profile = $request->user()->sellerProfile;

        abort_if($profile === null, 404);

        $this->authorize('update', $profile);

        $oldKtp = $profile->ktp_path;
        $oldNpwp = $profile->npwp_path;

        $profile->update([
            'ktp_path' => $request->file('ktp')->store('kyc/'.$request->user()->id, 'local'),
            'npwp_path' => $request->file('npwp')?->store('kyc/'.$request->user()->id, 'local') ?? $oldNpwp,
            'status' => SellerProfileStatus::Pending,
            'reviewed_by' => null,
            'reviewed_at' => null,
            'rejection_reason' => null,
        ]);

        Storage::disk('local')->delete($oldKtp);

        return new SellerProfileResource($profile);
    }
}
