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
    public function index(){
        $products = Product::orderBy('id', 'DESC')->get();

        return response()->json([
            'success' => $products
        ]);
    }

    // store
    public function store(Request $request){
        $codeValidation = Validator::make($request->all(),[
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['unique:products'],
            'code' => ['nullable'],
            'category_id' => ['required'],
            'price' => ['required'],
            'unit' => ['required'],
            'desc' => ['nullable'],
        ]);

        if($codeValidation->fails())
        {
            return response()->json([
                'errors'=> $codeValidation->errors()
            ],500);
        }

        Product::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'code' => $request->code,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'unit' => $request->unit,
            'desc' => $request->desc,
        ]);

        return response()->json([
            'success' => 'New product successfully created'
        ]);
    }

    // edit
    public function edit($id){
        $product = Product::findOrFail($id);
        $categories = Category::all();

        return response()->json([
            'product' => $product,
            'categories' => $categories,
        ]);
    }
}
