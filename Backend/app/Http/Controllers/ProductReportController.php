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

        $query = DB::table('products')
            ->join('sale_items', 'sale_items.product_id', '=', 'products.id')
            ->join('sales', 'sales.id', '=', 'sale_items.sale_id')
            ->selectRaw('product_name, SUM(sale_items.quantity) as quantity, AVG(sale_items.rate) as price, SUM(sale_items.quantity * sale_items.rate) as total_sold_price, MAX(sales.issue_date) as max_issue_date')
            ->groupBy('product_name');
        // Apply date filters based on the time range
        if ($timeRange == 1) {
            $query->whereDate('sales.issue_date', '=', now()->toDateString());

        } elseif ($timeRange == 7) {
            $query->whereBetween('sales.issue_date', [now(), now()->subDays(7)]);
        } elseif ($timeRange == 31) {
            $query->whereYear('sales.issue_date', now()->startOfMonth())
                ->whereMonth('sales.issue_date', now()->endOfMonth());
        } elseif ($timeRange === 'custom') {
            // Get the time range parameters from the request
            $startDate = Carbon::parse($start_date)->formate("Y-m-d");
            $endDate = Carbon::parse($end_date)->formate("Y-m-d");
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