<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class SearchProductController extends Controller
{


    public function index(Request $request)
    {
<<<<<<< HEAD
        $product = Product::where('scan_code', $request->scan_code)->with('histories.fromWarehouseId','histories.toWarehouseId','histories.user','getCategory','getBrand','warehouse','productImages')->latest()->first();
        
        if (!$product) {
            return response()->json([
                'status' => true,
                'message' => 'Product not found',
            ], 200);
        }
        return response()->json([
            'status' => true,
            'data' =>  $product,
        ], 200);
    }
}
=======
        
        $product = Product::all();

        if($request->scan_code != null )
        {
            $product = Product::where('scan_code', $request->scan_code)->get();
        }
    
       return response()->json([
        'status' => true,
        'data' =>  $product,
         ]);

    }

}
>>>>>>> 61be3512 (search api)
