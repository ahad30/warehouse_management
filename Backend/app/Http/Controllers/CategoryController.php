<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    // index
    public function index(Request $request)
    {
        $categories = Category::orderBy('id', 'DESC')->get();

        if ($categories->count() > 0) {
            return response()->json([
                'status' => true,
                'categories' => $categories,
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'No Categories Found',
            ]);
        }
    }

    // store
    public function store(Request $request)
    {
        $validateInput = Validator::make($request->all(), [
            'category_name' => 'required|string|max:255',
            'description' => 'nullable',
        ]);

        if ($validateInput->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateInput->errors()
            ], 401);
        }

        $categoryExist = Category::where('slug', Str::slug($request->category_name))->first();
        if ($categoryExist) {
            return response()->json([
                'status' => false,
                'message' => 'Category Already Exist',
            ], 401);
        } else {
            Category::create([
                'category_name' => $request->category_name,
                'slug' => Str::slug($request->category_name),
                'description' => $request->description
            ]);

            $category = Category::latest()->first();

            return response()->json([
                'status' => true,
                'message' => 'Category Created Successfully',
                'category' => $category
            ], 201);
        }
    }

    // edit
    public function edit($id)
    {
        $category = Category::find($id);

        if ($category) {
            return response()->json([
                'status' => true,
                'category' => $category,
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Category Not Found',
            ], 500);
        }
    }

    // update
    public function update(Request $request)
    {

        $category = Category::find($request->id);

        if ($category) {
            $validateInput = Validator::make(
                $request->all(),
                [
                    'category_name' => 'required|string|max:255',
                    'description' => 'nullable',
                ]
            );

            if ($validateInput->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation Error!',
                    'errors' => $validateInput->errors()
                ], 401);
            }

            $category->update([
                'category_name' => $request->category_name,
                'slug' => Str::slug($request->category_name),
                'description' => $request->description
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Category successfully updated',
                'category' => $category,
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Category Not Found',
            ], 500);
        }
    }

    // destroy
    public function destroy($id)
    {
        $category = Category::find($id);

        if ($category) {
            $category->delete();

            return response()->json([
                'status' => true,
                'message' => 'Category successfully deleted'
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Category not found'
            ], 500);
        }
    }
}