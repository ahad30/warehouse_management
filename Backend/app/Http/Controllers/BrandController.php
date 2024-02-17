<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Traits\ImageTrait;
use App\Traits\QueryTrait;
use App\Traits\ResponseTrait;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Warehouse;

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
        return $this->successResponse([
            'status' => true,
            'data' => $data,
        ]);
    }

    // singleWarehouseBrands
    public function singleWarehouseBrands($id)
    {
        $warehouse = Warehouse::find($id);
        if (!$warehouse) {
            return $this->errorResponse(null, 'Warehouse not found', 404);
        }
        $brands =  BrandResource::collection($warehouse->brands);
        return $this->successResponse([
            'status' => true,
            'data' => $brands
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
