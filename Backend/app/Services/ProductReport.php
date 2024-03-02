<?php

namespace App\Services;

use App\Interfaces\ReportInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ProductReport implements ReportInterface
{
    public function generateReport($timeRange = 0, $startDate = null, $endDate = null)
    {
        return $this->getReport($timeRange, $startDate, $endDate);
    }

    public function getReport($timeRange, $startDate, $endDate)
    {
        if ($timeRange > 0) {
            return $this->getReportByRange($timeRange);
        }

        $query = DB::table('products');
        if ($startDate && $endDate) {
            $query->whereBetween('products.created_at', [$startDate, $endDate]);
        }
        return $query->get();
    }

    public function getReportByRange($timeRange)
    {
        $previousDate = Carbon::now()->subDays($timeRange);

        // Format the date if needed
        $formattedDate = $previousDate->format('Y-m-d');

        return DB::table('products')->whereDate('created_at', '=', now()->toDateString($formattedDate))->get();

        // $currentDate = now()->toDateString();

        // return DB::table('products')
        //     ->whereBetween('created_at', [$formattedDate, $currentDate])
        //     ->get();
    }
}
