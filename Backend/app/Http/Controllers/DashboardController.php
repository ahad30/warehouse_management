<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\User;
use App\Models\Brand;
use App\Models\Store;
use App\Models\Product;
use App\Models\Category;
use App\Models\Customer;
use App\Models\SaleItem;
use Illuminate\Http\Request;

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
}
