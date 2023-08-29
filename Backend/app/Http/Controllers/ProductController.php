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
            'products' => $products
        ]);
    }

    // create
    public function create(){
        $categories = Category::all();
        
        return response()->json([
            'categories' => $categories
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

    // update
    public function update(Request $request, $id){
        $product = Product::findOrFail($id);

        $codeValidation = Validator::make($request->all(),[
            'name' => ['required', 'string', 'max:255'],
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
            'success' => 'Product detail successfully updated'
        ]);
    }

    // distroy 
    public function distroy($id){
        $product = Product::findOrFail($id);

        if($product){
            $product->delete();

            return response()->json([
                'success'=> 'Product successfully deleted'
            ],201);
        }else{
            return response()->json([
                'errors'=> 'Product not found'
            ],500);
        }
    }
}
