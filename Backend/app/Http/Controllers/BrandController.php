<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
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
        $data = BrandResource::collection($this->getData(Brand::get()));
        return $this->successResponse($data);
    }
    /**
     *
     * store brand
     *
     */
    public function store(StoreBrandRequest $request)
    {
        $image = ['brand_img' => $this->imageUpload($request, 'brand_img', 'uploads/brand')];
        Brand::create(array_merge($request->validated(), $image));
        return $this->createdResponse(['status' => true, 'message' => "Brands Created Successfully"]);
    }

    /**
     *
     *
     * update brands
     *
     */
    public function update(UpdateBrandRequest $request, $id)
    {
        $data = Brand::findOrFail($id);
        $image = ['brand_img' => $this->imageUpdate($request, 'brand_img', $data->brand_img, 'uploads/brand')];
        $data->update(array_merge($request->validated(), $image));
        return $this->successResponse(['status' => true, 'message' => "Brand Updated Successfully"]);
    }


    //this is delate() function

    public function delete($id)
    {
        $data = Brand::findOrFail($id);
        $this->deleteImage($data->brand_img);
        $data->delete();
        return $this->successResponse(['status' => true, 'message' => "Brand Deleted Successfully"]);
    }
}
