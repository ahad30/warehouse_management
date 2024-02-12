<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWarehouseRequest;
use App\Http\Requests\UpdateWarehouseRequest;
use App\Http\Resources\WarehouseResource;
use App\Models\Warehouse;
use App\Traits\ImageTrait;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    use ResponseTrait, ImageTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = WarehouseResource::collection(Warehouse::get());
        if ($data->count() < 1) {
            return $this->errorResponse(null, 'data not found', 404);
        }
        return $this->successResponse(['status' => true, 'data' => $data]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWarehouseRequest $request)
    {
        $image = ['image' => $this->imageUpload($request, 'image', 'uploads/warehouse')];
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
    public function update(UpdateWarehouseRequest $request, $id)
    {
        $data = Warehouse::findOrFail($id);
        $image = ['image' => $this->imageUpdate($request, 'image', $data->image, 'uploads/warehouse/', 'uploads/warehouse')];
        $data->update(array_merge($request->validated(), $image));
        return $this->successResponse(['status' => true, 'message' => "Warehouse Updated"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = Warehouse::findOrFail($id);
        $this->deleteImage($data->image, 'uploads/warehouse/');
        $data->delete();
        return $this->successResponse(['status' => true, 'message' => "Warehouse Deleted"]);
    }
}
