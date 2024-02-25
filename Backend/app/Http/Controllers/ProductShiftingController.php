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
         
        if (!$productIds)
         {
            return response()->json([
                'status' => false,
                'message' => "No product selected",
            ],404);
        }

        foreach ($productIds as $productId) {
            // Create history record
            History::create([
                "from_warehouse_id" => $request->from_warehouse_id,
                "to_warehouse_id" => $request->to_warehouse_id,
                "product_id" => $productId,
                "user_id" => Auth()->id(),
            ]);
            if(!Product::where('warehouse_id', $request->from_warehouse_id)){
                return response()->json([
                    'status' => false,
                    'message' => "Product not found by this warehouse",
                ],404);
            }
        // Update product's warehouse_id directly in the database query
            Product::find($productId)->update([
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
//end  ProductShiftingStore() method

    public function  ProductShiftingIndex(Request $request)
    {


        $histories = History::paginate(5);
        
        return response()->json([
            'status' => true,
            'message' => "History Successfully Retrived",
            'data' => $histories,
        ]);


        


    }// end ProductShiftingIndex()



    public function ProductShiftingDelete(Request $request,$id)
    {
        $history = History::find($id);

        $history->delete();

    }//end ProductShiftingDelete 



}
