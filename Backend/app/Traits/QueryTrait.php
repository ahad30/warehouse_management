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
    /**
     *  Store a newly created resource in storage.
     * @param mixed $request
     * @param mixed $image
     */
    // public function storeData($request, $image = "")
    // {
    //     DB::transaction(function () use ($request, $image) {
    //         if ($image) {
    //             $data = array_merge($request->validated() + [$image]);
    //         } else {
    //             $data = $request->validated();
    //         }

    //         return $data;
    //     }, 5);
    // }
    public function updateData($id, $model, $request, $image = null)
    {
        DB::transaction(function () use ($model, $id, $request, $image) {
            $data = $model::findOrFail($id)
                ->update(array_merge($request->validated(), $image));
            return $data;
        }, 5);
    }

    public function destroyData($id, $model)
    {
        $data = $model::findOrFail($id)->delete();
        return $data;
    }
}
