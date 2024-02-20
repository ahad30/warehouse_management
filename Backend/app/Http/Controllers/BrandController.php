<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Traits\ImageTrait;
use App\Traits\QueryTrait;
use App\Traits\ResponseTrait;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandResource;

class BrandController extends Controller
{
    use QueryTrait, ResponseTrait, ImageTrait;
    /**
     *
     * return all brands
     *
     */
    public function index()
    {
        $data = BrandResource::collection(Brand::latest()->get());
        if (!$data) {
            return $this->errorResponse([
                "status" => false,
                "message" => "No Brands Found"
            ]);
        }
        return $this->successResponse([
            'status' => true,
            'data' => $data,
        ]);
    }
    /**
     *
     * store brand
     *
     */
    public function store(StoreBrandRequest $request)
    {
        $image = ['brand_img' => $this->imageUpload($request, 'brand_img', 'uploads/brand')];
        $brand = Brand::create(array_merge($request->validated(), $image));

        if (!$brand) {
            return $this->errorResponse([
                "status" => false,
                "message" => "Something went wrong"
            ]);
        }

        return $this->createdResponse([
            'status' => true,
            'message' => "Brands Created Successfully"
        ]);
    }

    /**
     *
     *
     * update brands
     *
     */
    public function update(UpdateBrandRequest $request, $id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return $this->errorResponse([
                "status" => false,
                "message" => "brand not found"
            ]);
        }
        $image = ['brand_img' => $this->imageUpdate($request, 'brand_img', $brand->brand_img, 'uploads/brand')];
        $data = $brand->update(array_merge($request->validated(), $image));

        if (!$data) {
            return $this->errorResponse([
                "status" => false,
                "message" => "Something went wrong"
            ]);
        }
        return $this->successResponse(['status' => true, 'message' => "Brand Updated Successfully"]);
    }


    //this is delate() function

    public function delete($id)
    {
        $brand = Brand::find($id);
        return $brand;
        if (!$brand) {
            return $this->errorResponse([
                "status" => false,
                "message" => "brand not found"
            ]);
        }

        $this->deleteImage($brand->brand_img);
        $brand->delete();
        return $this->successResponse(['status' => true, 'message' => "Brand Deleted Successfully"]);
    }
}
