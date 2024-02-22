<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class SearchProductController extends Controller
{


    public function index(Request $request)
    {
        
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
