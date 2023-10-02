<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
                'brands' => $brands,
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
            'brand_name' => 'required|unique:' . Brand::class,
            // 'brand_img' => 'mimes:jpeg,jpg,png,gif|max:10000'
        ]);
        $imageData = null;
        if ($request->file('brand_img') != null) {
            $file = $request->file('brand_img');
            $filename = $file->getClientOriginalName();
            $imageData = time() . '-' . $filename;
            $file->move('uploads/brands', $imageData);
        }
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => $validator->errors()
            ], 400);
        }
        $brand = Brand::create([
            'brand_name' => $request->brand_name,
            'brand_img' => $imageData
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Brand Successful',
            'brand' => $brand,
        ], 201);
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
            'brand_id' => 'required'
            // 'brand_img' => 'mimes:jpeg,jpg,png,gif|max:10000'
        ]);
        $imageData = $request->old_image;
        if ($request->file('brand_img') != null) {
            $file = $request->file('brand_img');
            $filename = $file->getClientOriginalName();
            $imageData = time() . '-' . $filename;
            $file->move('uploads/brands', $imageData);
        }
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => $validator->errors()
            ], 400);
        }
        $brand = DB::where('id', $request->brand_id)->update([
            'brand_name' => $request->brand_name,
            'brand_img' => $imageData
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Brand Updated',
            'brand' => $brand,
        ], 201);
    }
    public function delete($id)
    {
        if ($id != null) {
            $brand = Brand::where('id', $id)->first();


            if ($brand != null) {
                $brand->delete();
                return response()->json([
                    'status' => true,
                    'message' => 'Brand delete successfully',
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Brand not found',
                ], 404);
            }
        }
        return response()->json([
            'status' => false,
            'message' => 'Provide brand id',
        ], 400);
    }
}