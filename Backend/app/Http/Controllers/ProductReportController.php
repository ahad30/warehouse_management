<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Product;
use App\Models\SaleItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ProductReportController extends Controller
{
    /**
     * Handle the incoming request.
     */

    public function __invoke($time_range = null, $start_date = null, $end_date = null)
    {

        $timeRange = $time_range; // Values: daily, weekly, monthly, custom

        $query = DB::table('sale_items')
            ->join('products', 'products.id', '=', 'sale_items.product_id')
            ->join('sales', 'sales.id', '=', 'sale_items.sale_id')
            ->selectRaw('products.product_name, SUM(quantity) as quantity, AVG(rate) as price, SUM(quantity * rate) as total_sold_price, MAX(sales.issue_date) as max_issue_date')
            ->groupBy('products.product_name');
        // Apply date filters based on the time range
        if ($timeRange == 1) {
            $query->whereDate('sales.issue_date', '=', now()->toDateString());
        } elseif ($timeRange == 7) {
            $query->whereBetween('sales.issue_date', [now()->subDays(7), now()]);
        } elseif ($timeRange == 31) {
            $query->whereBetween('sales.issue_date', [now()->startOfMonth(),now()->endOfMonth()]);
           
        } elseif ($timeRange === 'custom') {
            // Get the time range parameters from the request
            $startDate = Carbon::parse($start_date)->format("Y-m-d");
            $endDate = Carbon::parse($end_date)->format("Y-m-d");
            if ($startDate && $endDate) {
                $query->whereBetween('sales.issue_date', [$startDate, $endDate]);
            }
        }

        $products = $query->orderByDesc('quantity')->get();

        if ($products->count() > 0) {
            return response()->json([
                'status' => true,
                'products' => $products
            ], 200);
        }
        return response()->json([
            'status' => false,
            'message' => "No product Found",
            'products' => $products
        ]);
    }
}
