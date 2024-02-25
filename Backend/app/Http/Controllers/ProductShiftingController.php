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


    public function ProductShiftingStore(ProductShiftingRequest $request)
    {
        try {

            $productIds = $request->product_ids;

            if (!$productIds) {
                return response()->json([
                    'status' => false,
                    'message' => "No product selected",
                ], 404);
            }


            /** checking is both warehouse is same or not */
            if($this->isSameWarehouse($request->from_warehouse_id,$request->to_warehouse_id)){
                return $this->isSameWarehouse($request->from_warehouse_id,$request->to_warehouse_id);
            }
            
                /** checking is the product belongs to warehouse or not */
            if(!$this->isProductsBelongsToWarehouse($productIds,$request->from_warhouse_id)){
                return response()->json(['status'=>true,'message' => "Product is not belongs to warehouse"]);
            };
              
        


            foreach ($productIds as $productId) {
                // Create history record
                History::create([
                    "from_warehouse_id" => $request->from_warehouse_id,
                    "to_warehouse_id" => $request->to_warehouse_id,
                    "product_id" => $productId,
                    "user_id" => Auth()->id(),
                ]);

                // Update product's warehouse_id directly in the database query
                Product::where('id', $productId)->update([
                    "warehouse_id" => $request->to_warehouse_id,
                ]);
            }


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
     *  Same warehouse checker
     * 
     */
    public function isSameWarehouse($fromWarehouse,$toWarehouse):array
    {
        if($request->from_warehouse_id == $request->to_warehouse_id)
            {
             return  [
                    'status' => false,
                    'message' => "Same warehouse product can not shifted",
                ];
            }
            
    }

  /**
   *  Is the product belongs to warehouse or nots
   * 
   */
  public function isProductsBelongsToWarehouse($productId,$fromWarehouseId): boolean
  {
    foreach($productId as $id){
        $product = Product::find($id);
        if($product->id != $fromWarehouseId){
            return false;
        }
    }
    return true;
  }
}
