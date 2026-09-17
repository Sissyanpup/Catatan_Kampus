<?php

namespace Tests\Feature\Seller;

use App\Enums\SellerProfileStatus;
use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class SellerKycTest extends TestCase
{
    use RefreshDatabase;

    public function test_seller_can_submit_kyc(): void
    {
        Storage::fake('local');
        $seller = User::factory()->create(['role' => UserRole::Seller]);

        $response = $this->actingAs($seller)->postJson('/api/seller/kyc', [
            'ktp' => UploadedFile::fake()->image('ktp.jpg'),
        ]);

        $response->assertCreated()->assertJsonPath('data.status', 'pending');
        $this->assertDatabaseHas('seller_profiles', ['user_id' => $seller->id, 'status' => 'pending']);
    }

    public function test_buyer_cannot_submit_kyc(): void
    {
        Storage::fake('local');
        $buyer = User::factory()->create(['role' => UserRole::Buyer]);

        $this->actingAs($buyer)->postJson('/api/seller/kyc', [
            'ktp' => UploadedFile::fake()->image('ktp.jpg'),
        ])->assertForbidden();
    }

    public function test_admin_can_list_pending_kyc_queue(): void
    {
        $admin = User::factory()->create(['role' => UserRole::Admin]);
        $seller = User::factory()->create(['role' => UserRole::Seller]);
        $seller->sellerProfile()->create([
            'ktp_path' => 'kyc/1/ktp.jpg',
            'status' => SellerProfileStatus::Pending,
        ]);

        $response = $this->actingAs($admin)->getJson('/api/admin/kyc');

        $response->assertOk()->assertJsonFragment(['status' => 'pending']);
    }

    public function test_admin_can_approve_kyc_with_audit_trail(): void
    {
        Storage::fake('local');
        $admin = User::factory()->create(['role' => UserRole::Admin]);
        $seller = User::factory()->create(['role' => UserRole::Seller]);
        $profile = $seller->sellerProfile()->create([
            'ktp_path' => 'kyc/1/ktp.jpg',
            'status' => SellerProfileStatus::Pending,
        ]);

        $response = $this->actingAs($admin)->patchJson("/api/admin/kyc/{$profile->id}", [
            'status' => 'approved',
        ]);

        $response->assertOk()->assertJsonPath('data.status', 'approved');
        $this->assertDatabaseHas('seller_profiles', [
            'id' => $profile->id,
            'status' => 'approved',
            'reviewed_by' => $admin->id,
        ]);
        $this->assertNotNull($profile->fresh()->reviewed_at);
    }

    public function test_reject_requires_reason(): void
    {
        $admin = User::factory()->create(['role' => UserRole::Admin]);
        $seller = User::factory()->create(['role' => UserRole::Seller]);
        $profile = $seller->sellerProfile()->create([
            'ktp_path' => 'kyc/1/ktp.jpg',
            'status' => SellerProfileStatus::Pending,
        ]);

        $this->actingAs($admin)
            ->patchJson("/api/admin/kyc/{$profile->id}", ['status' => 'rejected'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('rejection_reason');
    }

    public function test_seller_cannot_review_own_kyc(): void
    {
        $seller = User::factory()->create(['role' => UserRole::Seller]);
        $profile = $seller->sellerProfile()->create([
            'ktp_path' => 'kyc/1/ktp.jpg',
            'status' => SellerProfileStatus::Pending,
        ]);

        $this->actingAs($seller)
            ->patchJson("/api/admin/kyc/{$profile->id}", ['status' => 'approved'])
            ->assertForbidden();
    }
}
