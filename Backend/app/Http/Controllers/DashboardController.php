<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\User;
use App\Models\Brand;
use App\Models\Store;
use App\Models\Product;
use App\Models\Category;
use App\Models\Customer;
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
        // $totalRevenue = Proudct->sum('total')
        return response()->json([
            'status' => true,
            'data' => [
                'totalSales' => $totalsales->count(),
                // 'totalRevenue' => ,
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