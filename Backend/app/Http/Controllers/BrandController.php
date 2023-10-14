<?php

namespace App\Http\Controllers;


use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
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
        $brands = Brand::latest()->get();
        if ($brands->count() > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Brands found',
                'brands' => $brands
            ], 200);
        }
        return response()->json([
            'status' => false,
            'message' => 'No Brands found',
            'brands' => $brands,
        ], 200);

    }
    /**
     *
     * store brand
     *
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'brand_name' => 'required|max:100|unique:' . Brand::class,
            'brand_img' => 'nullable|mimes:jpg,png,jpeg,gif,svg|max:5000'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => $validator->errors()
            ], 400);
        }

        $imageData = null; // new image name

        if ($request->hasFile('brand_img')) {
            $file = $request->file('brand_img');
            $filename = $file->getClientOriginalName(); //given image name
            $imageData = $request->brand_name . "-" . time() . '-' . $filename;
            $file->move('uploads/brands', $imageData);
        }


        $data = Brand::create([
            'brand_name' => $request->brand_name,
            'brand_img' => $imageData,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Brand Successful',
            'brand' => $data,
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
            'brand_name' => 'required|max:100|unique:brands,brand_name,' . $request->id,
            'brand_img' => 'mimes:jpg,png,jpeg,gif,svg|max:5000'
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => $validator->errors()
            ], 400);
        }
        $brand = Brand::find($request->id);
        if ($brand == null) {
            return response()->json([
                'status' => false,
                'message' => 'Brand not found',

            ], 404);
        }

        $imageData = null; //new image name

        if ($request->hasFile('brand_img')) {
            $file = $request->file('brand_img');
            $filename = $file->getClientOriginalName(); // given image name
            $imageData = $request->brand_name . "-" . time() . '-' . $filename;
            $file->move('uploads/brands/', $imageData);


            // Check if the file exists before attempting to delete it
            if ($brand->brand_img != null) {
                $imagePath = public_path('uploads/brands/' . $brand->brand_img); //getting the old image from storage
                if (File::exists($imagePath)) {

                    File::delete($imagePath);
                }
            }
        }
        // updating brand
        $brand->update([
            'brand_name' => $request->brand_name,
            'brand_img' => $imageData != null ? $imageData : $brand->brand_img
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Brand Updated',
            'brand' => $brand,
        ], 200);
    }
    public function delete($id)
    {
        if ($id == null) {
            return response()->json([
                'status' => false,
                'message' => 'Provide brand id',
            ], 400);
        }

        $brand = Brand::where('id', $id)->first();
        if ($brand == null) {
            return response()->json([
                'status' => false,
                'message' => 'Brand not found',
            ], 404);

        } else {
            // deleting image
            if ($brand->brand_img != null) {
                $imagePath = public_path('uploads/brands/' . $brand->brand_img);
                // Check if the file exists before attempting to delete it
                if (File::exists($imagePath)) {
                    File::delete($imagePath);
                }
            }
            $brand->delete();

            return response()->json([
                'status' => true,
                'message' => 'Brand delete successfully',
            ], 200);
        }


    }
}