<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Sale;
use App\Models\User;
use App\Models\Brand;
use App\Models\Store;
use App\Models\Product;
use App\Models\Category;
use App\Models\SaleItem;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    // index
    public function index()
    {
        $totalProducts = Product::count();
        $totalUsers = User::count();
        $totalSales = Sale::count();
        $totalRevenue = SaleItem::get('product_sold_price')->sum();
        return response()->json([
            'status' => true,
            'data' => [
                'totalProducts' => formatLargeNumber((int) $totalProducts),
                'totalUsers' => formatLargeNumber((int) $totalUsers),
                'totalSales' => formatLargeNumber((int) $totalSales),
                'totalRevenue' => formatLargeNumber($totalRevenue),
                // 'totalCustomers' => formatLargeNumber($totalCustomers->count()),
                // 'totalStore' => formatLargeNumber($totalStore->count()),
                // 'totalCategory' => formatLargeNumber($totalCategory->count()),
                // 'totalBrand' => formatLargeNumber($totalBrand->count()),
            ]
        ], 200);
    }


    /**
     * graph of sell left 30 days
     *
     * @return \Illuminate\Http\Response
     */
    public function sellGraph()
    {
        $beginningDate = Carbon::now()->subDays(31);
        $endingDate = Carbon::now();
        $dayWiseSales = DB::table('sales')
            ->whereBetween("issue_date", [$beginningDate, $endingDate])
            ->selectRaw('issue_date,COUNT(*) as sells')
            ->groupBy('issue_date')
            ->get();

        return response()->json([
            'status' => true,
            'dayWiseSales' => $dayWiseSales
        ], 200);
    }

    /**
     * grap of revenue left 30 days
     *
     * @return \Illuminate\Http\Response
     */
    public function revenueGraph()
    {

        $beginningDate = Carbon::now()->subDays(31);
        $endingDate = Carbon::now();
        $dayWiseRevenue = DB::table('sales')
            ->whereBetween("issue_date", [$beginningDate, $endingDate])
            ->selectRaw("issue_date,SUM(paid_amount) as revenue,COUNT(*) as sells")
            ->groupBy('issue_date')
            ->get();

        return response()->json([
            'status' => true,
            'dayWiseRevenue' => $dayWiseRevenue
        ], 200);
    }
}
