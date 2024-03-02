<?php

namespace App\Providers;

use App\Interfaces\ProductReportInterface;
use App\Interfaces\SaleRepositoryInterface;
use App\Repositories\ProductReportRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(SaleRepositoryInterface::class, \App\Repositories\SaleRepository::class);
        $this->app->bind(ProductReportInterface::class, ProductReportRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
