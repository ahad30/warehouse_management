<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use App\Models\User;
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

        return response()->json([
            'status' => true,
            'data' => [
                'totalSales' => $totalsales->count(),
                'totalRevenue' => $totalsales->sum('total'),
                'totalProducts' => $totalproducts->count(),
                'totalCustomers' => $totalcustomers->count(),
                'totalUsers' => $totalusers->count(),
            ]
        ], 201);
    }
}
