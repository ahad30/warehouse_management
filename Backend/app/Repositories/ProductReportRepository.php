<?php

namespace App\Repositories;

use App\Interfaces\ProductReportInterface;
use App\Models\Product;
use Carbon\Carbon;

class ProductReportRepository implements ProductReportInterface
{
    /**
     * Undocumented function
     *
     * @param mixed $timeRange
     * @param mixed $startDate
     * @param mixed $endDate
     * @return \Illuminate\Http\Response
     */
    public function getReport($timeRange, $startDate, $endDate): object
    {

        $startDate = Carbon::parse($startDate)->format('Y-m-d');
        $endDate = Carbon::parse($endDate)->format('Y-m-d');

        if ($timeRange != null && $timeRange === 1) {
            return Product::whereDate('created_at', '=', now()->toDateString());
        } elseif ($timeRange != null && $timeRange === 7) {
            return  Product::whereBetween('created_at', [now()->subDays(7), now()]);
        } elseif ($timeRange != null && $timeRange === 30) {
            return Product::whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()]);
        }
        if ($startDate && $endDate) {
            return Product::whereBetween('created_at', [$startDate, $endDate]);
        }
        return response([
            'message' => 'something went wrong',
        ], 400);
    }
}
