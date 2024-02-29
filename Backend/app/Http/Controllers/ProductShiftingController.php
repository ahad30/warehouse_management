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
            $products = Product::whereIn('id', $productIds)
                ->where('warehouse_id', $request->from_warehouse_id)
                ->get();

            // If some products are not found in the from_warehouse_id, return error
            if (count($products) !== count($productIds)) {
                return response()->json([
                    'status' => false,
                    'message' => "One or more products not found in the specified warehouse",
                ], 404);
            }
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
    //end  ProductShiftingStore() method

    public function  ProductShiftingIndex(Request $request)
    {


        $histories = History::paginate(5);

        return response()->json([
            'status' => true,
            'message' => "History Successfully Retrived",
            'data' => $histories,
        ]);
    } // end ProductShiftingIndex()



    public function ProductShiftingDelete(Request $request, $id)
    {
        $history = History::find($id);

        $history->delete();
    } //end ProductShiftingDelete 



}
