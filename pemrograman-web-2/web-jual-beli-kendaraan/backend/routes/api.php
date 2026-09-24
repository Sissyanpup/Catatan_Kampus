<?php

use App\Http\Controllers\Admin\PayoutReconciliationController;
use App\Http\Controllers\Admin\SellerKycController;
use App\Http\Controllers\Admin\TransactionReviewController;
use App\Http\Controllers\Admin\VehicleReviewController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\MeController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Buyer\CheckoutController;
use App\Http\Controllers\Catalog\VehicleCatalogController;
use App\Http\Controllers\Payments\MockPaymentController;
use App\Http\Controllers\Payments\XenditWebhookController;
use App\Http\Controllers\Seller\SellerBankAccountController;
use App\Http\Controllers\Seller\SellerProfileController;
use App\Http\Controllers\Seller\VehicleController;
use App\Http\Controllers\SellerProfileDocumentController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\VehicleDocumentController;
use Illuminate\Support\Facades\Route;

// Auth
Route::post('/auth/register', [RegisterController::class, 'store'])->name('auth.register');
Route::post('/auth/login', [LoginController::class, 'store'])->name('auth.login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [LogoutController::class, 'destroy'])->name('auth.logout');
    Route::get('/auth/me', [MeController::class, 'show'])->name('auth.me');

    // Profil — semua role
    Route::put('/auth/profile', [ProfileController::class, 'update'])->name('auth.profile.update');
    Route::put('/auth/profile/password', [ProfileController::class, 'updatePassword'])->name('auth.profile.password');
    Route::post('/auth/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('auth.profile.avatar');

    // Seller — KYC & listing CRUD
    Route::middleware('role:seller')->prefix('seller')->name('seller.')->group(function () {
        Route::get('/kyc', [SellerProfileController::class, 'show'])->name('kyc.show');
        Route::post('/kyc', [SellerProfileController::class, 'store'])->name('kyc.store');
        Route::put('/kyc', [SellerProfileController::class, 'update'])->name('kyc.update');
        Route::put('/bank-account', [SellerBankAccountController::class, 'update'])->name('bank-account.update');

        Route::get('/vehicles', [VehicleController::class, 'index'])->name('vehicles.index');
        Route::post('/vehicles', [VehicleController::class, 'store'])->name('vehicles.store');
        Route::get('/vehicles/{vehicle}', [VehicleController::class, 'show'])->name('vehicles.show');
        Route::post('/vehicles/{vehicle}', [VehicleController::class, 'update'])->name('vehicles.update');
        Route::delete('/vehicles/{vehicle}', [VehicleController::class, 'destroy'])->name('vehicles.destroy');
        Route::post('/vehicles/{vehicle}/submit-for-review', [VehicleController::class, 'submitForReview'])->name('vehicles.submit-for-review');

        // Seller — tracking & serah-terima transaksi penjualan
        Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
        Route::get('/transactions/{transaction}', [TransactionController::class, 'show'])->name('transactions.show');
        Route::post('/transactions/{transaction}/confirm-handover', [TransactionController::class, 'confirmHandover'])->name('transactions.confirm-handover');
        Route::post('/transactions/{transaction}/dispute', [TransactionController::class, 'dispute'])->name('transactions.dispute');
    });

    // Admin — KYC, listing review, & dashboard approval escrow
    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/kyc', [SellerKycController::class, 'index'])->name('kyc.index');
        Route::patch('/kyc/{sellerProfile}', [SellerKycController::class, 'review'])->name('kyc.review');

        Route::get('/vehicles', [VehicleReviewController::class, 'index'])->name('vehicles.index');
        Route::get('/vehicles/{vehicle}', [VehicleReviewController::class, 'show'])->name('vehicles.show');
        Route::patch('/vehicles/{vehicle}', [VehicleReviewController::class, 'review'])->name('vehicles.review');

        Route::get('/transactions', [TransactionReviewController::class, 'index'])->name('transactions.index');
        Route::get('/transactions/{transaction}', [TransactionReviewController::class, 'show'])->name('transactions.show');
        Route::post('/transactions/{transaction}/approve-handover', [TransactionReviewController::class, 'approveHandover'])->name('transactions.approve-handover');
        Route::post('/transactions/{transaction}/approve-payout', [TransactionReviewController::class, 'approvePayout'])->name('transactions.approve-payout');
        Route::post('/transactions/{transaction}/disburse', [TransactionReviewController::class, 'disburse'])->name('transactions.disburse');
        Route::post('/transactions/{transaction}/mark-completed', [TransactionReviewController::class, 'markCompleted'])->name('transactions.mark-completed');
        Route::post('/transactions/{transaction}/resolve-dispute', [TransactionReviewController::class, 'resolveDispute'])->name('transactions.resolve-dispute');

        Route::get('/payouts/reconciliation', [PayoutReconciliationController::class, 'index'])->name('payouts.reconciliation');
    });

    // Buyer — checkout, pembayaran DP, & tracking serah-terima
    Route::middleware('role:buyer')->prefix('buyer')->name('buyer.')->group(function () {
        Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
        Route::get('/transactions/{transaction}', [TransactionController::class, 'show'])->name('transactions.show');
        Route::post('/transactions/{transaction}/refresh-status', [CheckoutController::class, 'refreshStatus'])->name('transactions.refresh-status');
        Route::post('/transactions/{transaction}/confirm-handover', [TransactionController::class, 'confirmHandover'])->name('transactions.confirm-handover');
        Route::post('/transactions/{transaction}/dispute', [TransactionController::class, 'dispute'])->name('transactions.dispute');
        Route::post('/vehicles/{vehicle}/checkout', [CheckoutController::class, 'store'])->name('vehicles.checkout');
    });

    // Simulasi pembayaran offline (gateway "mock") — lihat App\Payments\MockGateway.
    Route::prefix('payments/mock')->name('payments.mock.')->group(function () {
        Route::get('/{reference}', [MockPaymentController::class, 'show'])->name('show');
        Route::post('/{reference}/pay', [MockPaymentController::class, 'pay'])->name('pay');
        Route::post('/{reference}/fail', [MockPaymentController::class, 'fail'])->name('fail');
    });

    // Dokumen privat (KTP/NPWP/STNK/BPKB) — hanya owner & admin, lihat kebijakan di masing-masing controller.
    Route::get('/seller-kyc/{sellerProfile}/documents/{type}', [SellerProfileDocumentController::class, 'show'])->name('seller-kyc.documents.show');
    Route::get('/vehicles/{vehicle}/documents/{document}', [VehicleDocumentController::class, 'show'])->name('vehicles.documents.show');
});

// Webhook Xendit — server-to-server, tidak lewat auth:sanctum (verifikasi pakai x-callback-token).
Route::post('/webhooks/xendit', XenditWebhookController::class)->name('webhooks.xendit');

// Katalog publik
Route::get('/vehicles', [VehicleCatalogController::class, 'index'])->name('catalog.index');
Route::get('/vehicles/{vehicle}', [VehicleCatalogController::class, 'show'])->name('catalog.show');
