<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    // index
    public function index()
    {
        $products = Product::orderBy('id', 'DESC')->with('getCategory', 'getBrand', 'getStore')->get();

        if ($products->count() > 0) {
            return response()->json([
                'status' => true,
                'products' => $products,
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'No Products Found',
                'products' => $products,
            ], 404);
        }
    }

    // create
    public function create()
    {
        $categories = Category::all();

        if ($categories->count() > 0) {
            return response()->json([
                'status' => true,
                'categories' => $categories,
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'No Products Found',
            ]);
        }
    }

    // store
    public function store(Request $request)
    {

        $validateInput = Validator::make($request->all(), [
            'product_name' => ['required', 'string', 'max:255'],
            'product_quantity' => ['integer', 'required'],
            'product_unit' => ['string', 'required'],
            'product_retail_price' => ['required'],
            'product_sale_price' => ['required'],
            'product_code' => ['string'],
            'category_id' => ['required'],
            'store_id' => ['nullable'],
            'brand_id' => ['nullable'],
            'product_img' => ['nullable', 'max:5000'],
        ]);

        if ($validateInput->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => $validateInput->errors()
            ], 400);
        }

        $productExist = Product::where('slug', Str::slug($request->product_name . $request->product_code))->first();
        if ($productExist != null) {
            return response()->json([
                'status' => false,
                'message' => 'Product already exist',
            ], 400);
        } else {
            // image upload
            $imageData = null;

            if ($request->hasFile('product_img')) {
                $file = $request->file('product_img');
                $filename = $file->getClientOriginalName();
                $imageData = $request->product_name . "-" . time() . '-' . $filename;
                $file->move('uploads/products/', $imageData);
            }
            // checking category is exit or not
            if (Category::where('id', $request->category_id)->count() < 1) {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid Category',
                ], 400);
            }
            if (Brand::where('id', $request->brand_id)->count() < 1) {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid Brand',
                ], 400);
            }

            Product::create([
                'product_name' => $request->product_name,
                'product_img' => $imageData,
                'product_quantity' => $request->product_quantity,
                'product_unit' => $request->product_unit,
                'product_retail_price' => $request->product_retail_price,
                'product_sale_price' => $request->product_sale_price,
                'slug' => Str::slug($request->product_name . $request->product_code),
                'product_code' => $request->product_code,
                'store_id' => $request->store_id == null ? 1 : $request->store_id,
                'category_id' => $request->category_id == null ? 1 : $request->category_id,
                'brand_id' => $request->brand_id == null ? 1 : $request->brand_id,
            ]);
            $product = Product::latest()->first();
            return response()->json([
                'status' => true,
                'message' => 'New Product Updated Successfully',
                'product' => $product,
            ]);
        }
    }

    // edit
    public function edit($id)
    {
        $product = Product::find($id);

        if ($product) {
            $categories = Category::all();

            return response()->json([
                'status' => true,
                'product' => $product,
                'categories' => $categories,
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Product Not Found',
            ], 500);
        }
    }

    // update
    public function update(Request $request)
    {
        $validateInput = Validator::make($request->all(), [
            'product_name' => ['required', 'string', 'max:255'],
            'product_quantity' => ['integer', 'required'],
            'product_unit' => ['string', 'required'],
            'product_retail_price' => ['required'],
            'product_sale_price' => ['required'],
            'product_code' => ['string'],
            'category_id' => ['required'],
            'brand_id' => ['nullable'],
            'product_img' => ['nullable', 'mimes:jpg,png,jpeg,gif,svg', 'max:5000']
        ]);
        if ($validateInput->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => $validateInput->errors()
            ], 400);
        }

        $product = Product::find($request->id);
        if ($product == null) {
            return response()->json([
                'status' => false,
                'message' => 'Product not found',

            ], 404);
        }

        // image upload
        $imageData = null;
        if ($request->hasFile('product_img')) {
            $file = $request->file('product_img');
            $filename = $file->getClientOriginalName();
            $imageData = $request->product_name . "-" . time() . '-' . $filename;
            $file->move('uploads/products/', $imageData);
        }
        // checking category is exit or not
        if (Category::where('id', $request->category_id)->count() < 1) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid Category',
            ], 400);
        }
        if (Brand::where('id', $request->brand_id)->count() < 1) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid Brand',
            ], 400);
        }

        $product->update([
            'product_name' => $request->product_name,
            'product_img' => $request->brand_img == null ? "" : $imageData,
            'product_quantity' => $request->product_quantity,
            'product_unit' => $request->product_unit,
            'product_retail_price' => $request->product_retail_price,
            'product_sale_price' => $request->product_sale_price,
            'slug' => Str::slug($request->product_name . $request->product_code),
            'product_code' => $request->product_code,
            'category_id' => $request->category_id == null ? $product->category_id : $request->category_id,
            'brand_id' => $request->brand_id == null ? $product->brand_id : $request->brand_id,
            'store_id' => $request->store_id == null ? $product->store_id : $request->store_id,
        ]);
        $product = Product::find($request->id);
        return response()->json([
            'status' => true,
            'message' => 'New Product Created Successfully',
            'product' => $product,
        ]);
    }

    // destroy
    public function distroy($id)
    {
        $product = Product::find($id);

        if ($product != null) {

            // deleting image
            if ($product->product_img != null) {
                $imagePath = public_path('uploads/products/' . $product->product_img);
                // Check if the file exists before attempting to delete it
                if (File::exists($imagePath)) {
                    File::delete($imagePath);
                }
            }
            $product->delete();

            return response()->json([
                'status' => true,
                'message' => 'Product Deleted Successfully'
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Product not found'
            ], 404);
        }
    }
}
