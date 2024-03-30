<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class SearchProductController extends Controller
{


    public function index(Request $request)
    {
        $product = Product::where('scan_code', $request->scan_code)->with('histories.fromWarehouseId', 'histories.toWarehouseId', 'histories.user', 'getCategory', 'getBrand', 'warehouse', 'productImages')->latest()->first();

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' =>  $product,
        ], 200);
    }
}
