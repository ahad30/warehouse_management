<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait QueryTrait
{
    public function getData($model)
    {
        $data = $model;
        if (!$data) {
            return $this->notFoundResponse($data, "Data not found");
        }
        return $data;
    }
    public function storeData($model, $request, $image = null)
    {
        DB::transaction(function () use ($model, $request, $image) {
            $data =  $model::create(array_merge($request->validated(), $image));
            return $data;
        }, 5);
    }
    public function updateData($model, $id, $request, $image = null)
    {
        DB::transaction(function () use ($model, $id, $request, $image) {
            $data = $model::findOrFail($id)
                ->update(array_merge($request->validated(), $image));
            return $data;
        }, 5);
    }
    public function destroyData($model, $id)
    {
        $data = $model::findOrFail($id)->delete();
        return $data;
    }
}
