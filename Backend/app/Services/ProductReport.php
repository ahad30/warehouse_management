<?php

namespace App\Services;

use App\Interfaces\ReportInterface;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ProductReport implements ReportInterface
{
    // public function generateReport($timeRange = 0, $startDate = null, $endDate = null)
    // {
    //     return $this->getReport($timeRange, $startDate, $endDate);
    // }

    // public function getReport($timeRange, $startDate, $endDate)
    // {
    //     if ($timeRange > 0) {
    //         return $this->getReportByRange($timeRange);
    //     }

    //     $query = DB::table('products');
    //     if ($startDate && $endDate) {
    //         $query->whereBetween('products.created_at', [$startDate, $endDate]);
    //     }
    //     return $query->get();
    // }

    // public function getReportByRange($timeRange)
    // {
    //     $previousDate = Carbon::now()->subDays($timeRange);
    //     $formattedDate = $previousDate->format('Y-m-d');
    //     $currentDate = now()->toDateString();
    //     return DB::table('products')
    //         ->whereBetween('created_at', [$formattedDate, $currentDate])
    //         ->get();
    // }
    public function generateReport()
    {
        $query = Product::query();

        if (request()->timeRange !== null) {
            switch (request()->timeRange) {
                case 1:
                    $query->whereDate('created_at', now()->toDateString());
                    break;
                case 7:
                    $query->whereBetween('created_at', [now()->subDays(7)->startOfDay(), now()->endOfDay()]);
                    break;
                case 30:
                    $query->whereBetween('created_at', [now()->subDays(30)->startOfMonth(), now()]);
                    break;
                default:
                    return response()->json(['message' => 'Invalid time range.'], 400);
            }
        } elseif (request()->startDate && request()->endDate) {
            $query->whereBetween('created_at', [Carbon::parse(request()->startDate), Carbon::parse(request()->endDate)]);
        } else {
            return response()->json(['message' => 'Invalid request.'], 400);
        }

        return $query->get();
    }
}
