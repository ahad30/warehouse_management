<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWarehouseRequest;
use App\Http\Requests\UpdateWarehouseRequest;
use App\Http\Resources\WarehouseResource;
use App\Models\Warehouse;
use App\Traits\QueryTrait;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    use QueryTrait, ResponseTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = WarehouseResource::collection($this->getData(Warehouse::get()));
        return $this->successResponse($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWarehouseRequest $request)
    {
        $data = $this->storeData(Warehouse::class, $request);
        return $this->successResponse($data);
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
        $data = $this->updateData($id, Warehouse::class, $request);
        return $this->successResponse($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = $this->destroyData($id, Warehouse::class);
        return $this->successResponse($data);
    }
}
