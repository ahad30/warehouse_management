<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    use ResponseTrait;
    // index
    public function index()
    {
        $categories =  CategoryResource::collection(Category::all());

        if ($categories->count() > 0) {
            return $this->successResponse([
                'status' => true,
                'data' => $categories,
            ]);
        } else {
            return $this->errorResponse(null, "No Categories Found");
        }
    }

    // store
    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->validated());

        if (!$category) {
            return $this->errorResponse(null, "Something went wrong");
        }
        return $this->createdResponse([
            'status' => true,
            'data' => $category,
        ]);
    }

    // edit
    public function edit($id)
    {
        $category = CategoryResource::collection(Category::find($id));
        return $category;

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
