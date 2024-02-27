<?php

namespace App\Providers;

use App\Services\HistoryService;
use Illuminate\Support\ServiceProvider;
use App\Services\Interfaces\HistoryServiceInterface;

class HistoryDataProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(HistoryServiceInterface::class,HistoryService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}