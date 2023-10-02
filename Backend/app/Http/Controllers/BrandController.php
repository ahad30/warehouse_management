<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    /**
     *
     * return all brands
     *
     */
    public function index()
    {
        $brands = Brand::all();
        if ($brands->count() > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Brands found',
                'brands' => $brands
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'No Brands found',
                'invoices' => $brands,
            ], 200);
        }
    }
    /**
     *
     * store brand
     *
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brand_name' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => $validator->errors()
            ], 401);
        }
    }
    /**
     *
     *
     * update brands
     *
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brand_name' => 'required',
        ]);
    }
}