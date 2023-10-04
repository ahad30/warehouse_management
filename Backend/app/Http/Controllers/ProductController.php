<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    // index
    public function index()
    {
        $products = Product::orderBy('id', 'DESC')->with('categories')->get();

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
        return $request->all();
        $validateInput = Validator::make($request->all(), [
            'product_name' => ['required', 'string', 'max:255'],
            'product_quantity' => ['integer', 'required'],
            'product_unit' => ['string', 'required'],
            'product_retail_price' => ['required'],
            'product_sale_price' => ['required'],
            'product_code' => ['string'],
            // 'category_id' => ['integer', 'nullable'],
            // 'brand_id' => ['integer'],
            // 'brand_img' => 'mimes:jpg,png,jpeg,gif,svg|max:1024'
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
                'message' => 'Product Already Exist',
            ], 400);
        } else {
            // image upload
            $imageData = null;
            if ($request->file('product_img') != null) {
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
                'category_id' => $request->category_id == null ? 1 : $request->category_id,
                'brand_id' => $request->brand_id == null ? 1 : $request->brand_id,
            ]);
            $product = Product::latest()->first();
            return response()->json([
                'status' => true,
                'message' => 'New Product Created Successfully',
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
        $product = Product::find($request->id);

        if ($product) {
            $validateInput = Validator::make($request->all(), [
                'name' => 'required',
                'string',
                'max:255',
                'code' => 'required',
                'category_id' => 'required',
                'price' => 'required',
                'unit' => 'required',
                'desc' => 'nullable',
            ]);

            if ($validateInput->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error!',
                    'errors' => $validateInput->errors()
                ], 401);
            }

            $category = Category::where('id', $request->category_id)->first();
            $category_name = $category->category_name;

            $product->update([
                'name' => $request->name,
                'slug' => Str::slug($request->name . $request->code),
                'code' => $request->code,
                'category_id' => $request->category_id,
                'category_name' => $category_name,
                'price' => $request->price,
                'unit' => $request->unit,
                'desc' => $request->desc,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Product Detail Updated Successfully ',
                'product' => $product,
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Product Not Found',
            ], 500);
        }
    }

    // distroy
    public function distroy($id)
    {
        $product = Product::find($id);

        if ($product) {
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