<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    // index
    public function index(){
        $categories = Category::orderBy('id', 'DESC')->get();
        
        return response()->json([
            'success' => $categories
        ]);
    }

    // store
    public function store(Request $request){
        $codeValidation = Validator::make($request->all(),[
            'category_name' => ['required', 'string', 'max:255'],
            'slug' => ['unique:categories'],
            'description' => ['nullable'],
        ]);

        if($codeValidation->fails())
        {
            return response()->json([
                'errors'=> $codeValidation->errors()
            ],500);
        }

        Category::create([
            'category_name' => $request->category_name,
            'slug' => Str::slug($request->category_name),
            'description' => $request->description
        ]);

        return response()->json([
            'success'=> 'Category successfully created'
        ],201);
    }

    // edit
    public function edit($id){
        $category = Category::findOrFail($id);

        return response()->json([
            'success'=> $category
        ],201);
    }

    // update
    public function update(Request $request, $id){
        $category = Category::findOrFail($id);

        $codeValidation = Validator::make($request->all(),[
            'category_name' => ['required', 'string', 'max:255'],
            'description' => ['required'],
        ]);

        if($codeValidation->fails())
        {
            return response()->json([
                'errors'=> $codeValidation->errors()
            ],500);
        }

        $category->update([
            'category_name' => $request->category_name,
            'slug' => Str::slug($request->category_name),
            'description' => $request->description
        ]);

        return response()->json([
            'success'=> 'Category successfully updated'
        ],201);
    }

    // distroy
    public function distroy($id){
        $category = Category::findOrFail($id);
        if($category){
            $category->delete();

            return response()->json([
                'success'=> 'Category successfully deleted'
            ],201);
        }else{
            return response()->json([
                'errors'=> 'Category not found'
            ],500);
        }
    }
}
