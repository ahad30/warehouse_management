<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Sale;
use App\Models\User;
use App\Models\Brand;
use App\Models\Store;
use App\Models\Product;
use App\Models\Category;
use App\Models\Customer;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    // index
    public function index()
    {
        $totalSales = Sale::all();
        $totalProducts = Product::all();
        $totalCustomers = Customer::all();
        $totalUsers = User::all();
        $totalStore = Store::all();
        $totalCategory = Category::all();
        $totalBrand = Brand::all();
        $totalRevenue = sale::all()->sum('paid_amount');
        return response()->json([
            'status' => true,
            'data' => [
                'totalSales' =>formatLargeNumber( $totalSales->count()),
                'totalRevenue' => formatLargeNumber($totalRevenue),
                'totalProducts' => formatLargeNumber($totalProducts->count()),
                'totalCustomers' => formatLargeNumber($totalCustomers->count()),
                'totalUsers' => formatLargeNumber($totalUsers->count()),
                'totalStore' =>formatLargeNumber( $totalStore->count()),
                'totalCategory' => formatLargeNumber($totalCategory->count()),
                'totalBrand' => formatLargeNumber($totalBrand->count()),
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