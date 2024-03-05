<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\History;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use App\Traits\ResponseTrait;
use App\Http\Requests\ProductShiftingRequest;


class ProductShiftingController extends Controller
{

    use ResponseTrait;


    public function store(ProductShiftingRequest $request)
    {
        try {

            $productIds = $request->product_ids;

            if (!$productIds) {
                return response()->json([
                    'status' => false,
                    'message' => "No product selected",
                ], 404);
            }




            /** checking is the product belongs to warehouse or not */
            if (!$this->isProductsBelongsToWarehouse($productIds, $request->from_warehouse_id)) {
                return response(['status' => true, 'message' => "Product is not belongs to warehouse"], 400);
            };




            // Create history record
            $newHistories = [];
            foreach ($productIds as $productId) {
                $newHistories[] = [
                    "from_warehouse_id" => $request->from_warehouse_id,
                    "to_warehouse_id" => $request->to_warehouse_id,
                    "product_id" => $productId,
                    "user_id" => auth()->id(),
                    'created_at' => now(),
                    'updated_at' => now()
                ];

                // Update product's warehouse_id directly in the database query
                Product::where('id', $productId)->update([
                    "warehouse_id" => $request->to_warehouse_id,
                ]);
            }
            // inserting history record to db
            $histories = History::insert($newHistories);

            return response()->json([
                'status' => true,
                'message' => "Products Successfully shifted.",
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'status' => false,
                'message' => "An error occurred while shifting products.",
            ]);
        }
    }



    /**
     *  Is the product belongs to warehouse or nots
     * 
     */
    public function isProductsBelongsToWarehouse($productId, $fromWarehouseId): bool
    {
        foreach ($productId as $id) {
            $product = Product::find($id);
            if ($product->warehouse_id != $fromWarehouseId) {
                return false;
            }
        }
        return true;
    }
}
