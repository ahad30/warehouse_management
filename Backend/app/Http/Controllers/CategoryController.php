<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Traits\ImageTrait;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    use ResponseTrait, ImageTrait;
    // index
    public function index()
    {
        $categories =  CategoryResource::collection(Category::all());

        if ($categories->count() > 0) {
            return $this->successResponse([
                'status' => true,
                'data' => $categories,
            ]);
        }
        return $this->errorResponse(null, "No Categories Found");
    }

    // store
    public function store(CategoryRequest $request)
    {
        $image = ['image' => $this->imageUpload($request, 'image', 'uploads/categories')];
        Category::create(array_merge($request->validated(), $image));
        return $this->createdResponse([
            'status' => true,
            'message' => "Category successfully created",
        ]);
    }

    // edit
    public function edit($id)
    {
        $category = new CategoryResource(Category::find($id));

        if ($category) {
            return $this->successResponse([
                'status' => true,
                'data' => $category,
            ]);
        }
        return $this->errorResponse(null, "No Categories Found");
    }

    // update
    public function update(CategoryRequest $request)
    {
        $data = Category::findOrFail($request->id);
        $image = ['image' => $this->imageUpdate($request, 'image', $data->image, 'uploads/categories/', 'uploads/categories')];
        $data->update(array_merge($request->validated(), $image));
        return $this->successResponse(['status' => true, 'message' => "Category Updated"]);
    }

    // destroy
    public function destroy($id)
    {
        $data = Category::findOrFail($id);
        $this->deleteImage($data->image, 'uploads/categories/');
        $data->delete();
        return $this->successResponse(['status' => true, 'message' => "Warehouse Deleted"]);
    }
}
