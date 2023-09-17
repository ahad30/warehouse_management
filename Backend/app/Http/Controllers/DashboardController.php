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
    public function index(){
        $totalsales = Sale::all();
        $totalproducts = Product::all();
        $totalcustomers = Customer::all();
        $totalusers = User::all();
        
        return response()->json([
            'status' => true,
            'data' => [
                'totalsales' => $totalsales->count(),
                'totalrevenue' => $totalsales->sum('total'),
                'totalproducts' => $totalproducts->count(),
                'totalcustomers' => $totalcustomers->count(),
                'totalusers' => $totalusers->count(),
            ]
        ], 201);
    }
}
