<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWarehouseRequest;
use App\Http\Requests\UpdateWarehouseRequest;
use App\Http\Resources\WarehouseResource;
use App\Models\Warehouse;
use App\Traits\ImageTrait;
use App\Traits\ResponseTrait;

class WarehouseController extends Controller
{
    use ResponseTrait, ImageTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $data = WarehouseResource::collection(Warehouse::latest()->get());
        if (!$data) {
            return $this->notFoundResponse('data not found');
        }
        return $this->successResponse([
            'status' => true,
            'data' => $data,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWarehouseRequest $request)
    {
        $image = ['image' => $this->imageUpload($request, 'image', 'uploads/warehouses')];
        Warehouse::create(array_merge($request->validated(), $image));
        return $this->createdResponse(['status' => true, 'message' => "Warehouse Created"]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWarehouseRequest $request)
    {
        $data = Warehouse::findOrFail($request->id);
        $image = ['image' => $this->imageUpdate($request, 'image', $data->image,  'uploads/warehouses')];
        $data->update(array_merge($request->validated(), $image));
        return $this->successResponse(['status' => true, 'message' => "Warehouse Updated"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = Warehouse::findOrFail($id);
        $this->deleteImage($data->image);
        $data->delete();
        return $this->successResponse(['status' => true, 'message' => "Warehouse Deleted"]);
    }
}
