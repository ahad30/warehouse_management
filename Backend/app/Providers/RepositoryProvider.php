<?php

namespace App\Providers;

use App\Interfaces\HistoryServiceInterface;
use App\Interfaces\ProductReportInterface;
use App\Interfaces\ReportInterface;
use App\Interfaces\SaleRepositoryInterface;
use App\Repositories\ProductReportRepository;
use App\Repositories\ReportRepository;
use App\Services\ProductReport;
use App\Services\SaleReport;
use App\Services\ShiftingReport;
use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(SaleRepositoryInterface::class,\App\Repositories\SaleRepository::class);

        $this->app->singleton(HistoryServiceInterface::class,\App\Repositories\HistoryRepositories::class);
        
        // bind ProductReport
        $this->app->bind(ReportInterface::class, ProductReport::class);
        // bind SaleReport
        // $this->app->bind(ReportInterface::class, SaleReport::class);
        // bind ShiftingReport
        // $this->app->bind(ReportInterface::class, ShiftingReport::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}