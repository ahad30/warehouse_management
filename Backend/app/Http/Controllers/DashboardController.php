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
use App\Models\SaleItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    // index
    public function index()
    {
        $totalsales = Sale::all();
        $totalproducts = Product::all();
        $totalcustomers = Customer::all();
        $totalusers = User::all();
        $totalStore = Store::all();
        $totalCategory = Category::all();
        $totalBrand = Brand::all();
        $totalRevenue = sale::all()->sum('paid_amount');
        // $totalRevenueInOneMonth = SaleItem::
        return response()->json([
            'status' => true,
            'data' => [
                'totalSales' => $totalsales->count(),
                'totalRevenue' => $totalRevenue,
                'totalProducts' => $totalproducts->count(),
                'totalCustomers' => $totalcustomers->count(),
                'totalUsers' => $totalusers->count(),
                'totalStore' => $totalStore->count(),
                'totalCategory' => $totalCategory->count(),
                'totalBrand' => $totalBrand->count(),
            ]
        ], 201);
    }

    /**
     *
     * @return graph of sell left 30 days
     *
     */

    public function sellGraph()
    {

        $beginningDate = Carbon::now()->subDays(30);
        $endingDate = Carbon::now();
        $dayWiseSales = DB::table('sales')
            ->whereBetween("issue_date", [$beginningDate, $endingDate])
            ->selectRaw('COUNT(*) as count')
            ->groupBy('issue_date')
            ->get();

        return response()->json([
            'status' => true,
            'dayWiseSales' => $dayWiseSales
        ], 200);
    }

    /**
     *
     *  @return grap of revenue left 30 days
     *
     */
    public function revenueGraph()
    {

        $beginningDate = Carbon::now()->subDays(30);
        $endingDate = Carbon::now();
        $dayWiseRevenue = DB::table('sales')
            ->whereBetween("issue_date", [$beginningDate, $endingDate])
            ->selectRaw("SUM(paid_amount) as revenue,COUNT(*) as count")
            ->groupBy('issue_date')
            ->get();

        return response()->json([
            'status' => true,
            'dayWiseRevenue' => $dayWiseRevenue
        ], 200);
    }
}