<?php

namespace App\Providers;

use App\Enums\PaymentGatewayDriver;
use App\Payments\MockGateway;
use App\Payments\PaymentGateway;
use App\Payments\XenditGateway;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(PaymentGateway::class, function () {
            return match (PaymentGatewayDriver::from(config('payment.gateway'))) {
                PaymentGatewayDriver::Xendit => new XenditGateway,
                PaymentGatewayDriver::Mock => new MockGateway,
            };
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Catch silently-dropped mass-assignments and typo'd attribute access early.
        // Lazy-loading is intentionally left unguarded: resources read single-model
        // relations (reviewer, seller) that don't need eager loading outside list endpoints.
        Model::preventSilentlyDiscardingAttributes(! $this->app->isProduction());
        Model::preventAccessingMissingAttributes(! $this->app->isProduction());
    }
}
