<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    // index
    public function index()
    {
        $categories = Category::orderBy('id', 'DESC')->get();

        if($categories->count() >= 0){            
            return response()->json([
                'success' => $categories
            ]);
        }else{
            return response()->json([
                'errors' => 'No Item Found',
            ]);
        }
    }

    // store
    public function store(Request $request)
    {
        $validateInput = Validator::make($request->all(), 
            [
                'category_name' => 'required|string|max:255',
                'description' => 'nullable',
            ]);

            if($validateInput->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateInput->errors()
                ], 401);
            }

        $categoryexist = Category::where('slug', Str::slug($request->category_name))->first();
        if($categoryexist){
            return response()->json([
                'message' => 'validation error',
                'errors' => 'Category Already Exist',
            ], 401);
        }else{
            Category::create([
                'category_name' => $request->category_name,
                'slug' => Str::slug($request->category_name),
                'description' => $request->description
            ]);
            
            return response()->json([
                'success' => 'Category Successfully Created'
            ], 201);
        }
    }

    // edit
    public function edit($id)
    {
        $category = Category::find($id);

        if($category){            
            return response()->json([
                'success' => $category,
            ], 201);
        }else{
            return response()->json([
                'error' => 'Category Not Found',
            ], 500);
        }
    }

    // update
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if($category){            
            $validateInput = Validator::make($request->all(), 
            [
                'category_name' => 'required|string|max:255',
                'description' => 'nullable',
            ]);

            if($validateInput->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateInput->errors()
                ], 401);
            }
    
            $category->update([
                'category_name' => $request->category_name,
                'slug' => Str::slug($request->category_name),
                'description' => $request->description
            ]);
    
            return response()->json([
                'success' => 'Category successfully updated'
            ], 201);
        }else{
            return response()->json([
                'error' => 'Category Not Found',
            ], 500);
        }
    }

    // distroy
    public function distroy($id)
    {
        $category = Category::find($id);
        if ($category) {
            $category->delete();

            return response()->json([
                'success' => 'Category successfully deleted'
            ], 201);
        } else {
            return response()->json([
                'errors' => 'Category not found'
            ], 500);
        }
    }
}
