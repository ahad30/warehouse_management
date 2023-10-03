<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StoreController extends Controller
{
    /**
     *
     * return all Stores
     *
     */
    public function index()
    {
        $stores = Store::all();
        if ($stores->count() > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Stores found',
                'Stores' => $stores
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'No store found',
                'Stores' => $stores,
            ], 200);
        }
    }
    /**
     *
     * store Store
     *
     */
    public function store(Request $request)
    {
        // return $request->file('Store_img');
        $validator = Validator::make($request->all(), [
            'store_name' => 'required|max:100',
            'store_email' => 'max:100',
            'store_web' => 'max:100',
            'store_address' => 'required',
            'store_phone' => 'required|max:100|unique:stores,store_phone',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => $validator->errors()
            ], 400);
        }


        $store = Store::create([
            'store_name' => $request->store_name,
            'store_email' => $request->store_email,
            'store_web' => $request->store_web,
            'store_address' => $request->store_address,
            'store_phone' => $request->store_phone,

        ]);

        return response()->json([
            'status' => true,
            'message' => 'Store Created Successful',
            'Store' => $store,
        ], 201);
    }
    /**
     *
     *
     * update Stores
     *
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Store_name' => 'required|unique:Stores,Store_name,' . $request->id,
            'id' => 'required'
            // 'Store_img' => 'mimes:jpeg,jpg,png,gif|max:10000'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => $validator->errors()
            ], 404);
        }
        $store = Store::find($request->id);
        if ($store == null) {
            return response()->json([
                'status' => false,
                'message' => 'Store not found',

            ], 400);
        }

        $imageData = $request->old_image;
        if ($request->file('Store_img') != null) {
            $file = $request->file('Store_img');
            $filename = $file->getClientOriginalName();
            $imageData = time() . '-' . $filename;
            $file->move('uploads/stores', $imageData);
        }
        // updating Store
        $store->update([
            'Store_name' => $request->Store_name,
            'Store_img' => $imageData
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Store Updated',
            'Store' => $store,
        ], 201);
    }
    public function delete($id)
    {
        if ($id != null) {
            $store = Store::find($id);


            if ($store != null) {
                $store->delete();
                return response()->json([
                    'status' => true,
                    'message' => 'Store delete successfully',
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Store not found',
                ], 404);
            }
        }
        return response()->json([
            'status' => false,
            'message' => 'Provide Store id',
        ], 400);
    }
}