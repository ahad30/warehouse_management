<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    // index
    public function index()
    {
        $products = Product::orderBy('id', 'DESC')->get();

        if ($products->count() > 0) {
            return response()->json([
                'status' => true,
                'products' => $products,
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'No Item Found',
            ]);
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
                'message' => 'No Item Found',
            ]);
        }
    }

    // store
    public function store(Request $request)
    {
        $validateInput = Validator::make($request->all(), [
            'name' => 'required', 'string', 'max:255',
            'code' => 'nullable',
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

        $productexist = Product::where('slug', Str::slug($request->name))->first();
        if ($productexist) {
            return response()->json([
                'status' => false,
                'message' => 'Product Already Exist',
            ], 401);
        } else {
            Product::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'code' => $request->code,
                'category_id' => $request->category_id,
                'price' => $request->price,
                'unit' => $request->unit,
                'desc' => $request->desc,
            ]);
            $product = Product::latest()->first();
            return response()->json([
                'status' => true,
                'message' => 'New product successfully created',
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
                'name' => 'required', 'string', 'max:255',
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

            $product->update([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'code' => $request->code,
                'category_id' => $request->category_id,
                'price' => $request->price,
                'unit' => $request->unit,
                'desc' => $request->desc,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Product Detail Successfully Updated',
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
                'message' => 'Product Successfully Deleted'
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Product not found'
            ], 500);
        }
    }
}
