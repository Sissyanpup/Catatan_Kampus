<?php

namespace App\Http\Controllers;

use App\Models\SellerProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SellerProfileDocumentController extends Controller
{
    public function show(Request $request, SellerProfile $sellerProfile, string $type): StreamedResponse
    {
        abort_unless(in_array($type, ['ktp', 'npwp'], true), 404);
        abort_unless(
            $request->user()->isAdmin() || $request->user()->id === $sellerProfile->user_id,
            403
        );

        $path = $type === 'ktp' ? $sellerProfile->ktp_path : $sellerProfile->npwp_path;

        abort_if($path === null, 404);

        return Storage::disk('local')->response($path);
    }
}
