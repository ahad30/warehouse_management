<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Traits\ImageTrait;
use App\Traits\ResponseTrait;

class CategoryController extends Controller
{
    use ResponseTrait, ImageTrait;
    // index
    public function index()
    {
        $categories =  CategoryResource::collection(Category::latest()->get());

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

        if (!$category) {
            return $this->errorResponse(null, "No Categories Found");
        }
        return $this->successResponse([
            'status' => true,
            'data' => $category,
        ]);
    }

    // update
    public function update(CategoryRequest $request)
    {
        $data = Category::find($request->id);
        if (!$data) {
            return $this->errorResponse(null, 'Data Not Found', 404);
        }
        $image = ['image' => $this->imageUpdate($request, 'image', $data->image, 'uploads/categories')];
        $data->update(array_merge($request->validated(), $image));
        return $this->successResponse(['status' => true, 'message' => "Category Updated"]);
    }

    // destroy
    public function destroy($id)
    {
        $data = Category::findOrFail($id);
        if (!$data) {
            return $this->errorResponse(null, "No Categories Found");
        }
        $this->deleteImage($data->image);
        $data->delete();
        return $this->successResponse(['status' => true, 'message' => "Warehouse Deleted"]);
    }
}
