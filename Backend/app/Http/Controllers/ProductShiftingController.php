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

        $product = Product::find($request->product_id);

        // return $product_id->warehouse_id;
        // $product_id = DB::select('SELECT id FROM products');

        $history = History::create([
            "from_warehouse_id" => request('from_warehouse_id'),
            "to_warehouse_id" => request('to_warehouse_id'),
            "product_id" =>   $product->id,
            "user_id" => Auth()->user()->id,
        ]);

        // return $history;
        
        $product->update([
            "warehouse_id" => $request->to_warehouse_id,
        ]);

        return response()->json([
            'status' => true,
            'message' => "History added Successfully",
        ]);

    } catch (\Exception $e) {
        DB::rollBack();        
        return $this->errorResponse(['status' => false, 'message' => $e->getMessage(),
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

    public function ProductShiftingUpdate(Request $request,$id)
    {

    }//end ProductShiftingUpdate() 


    public function ProductShiftingDelete(Request $request,$id)
    {
        $history = History::find($id);

        $history->delete();

    }//end ProductShiftingDelete 



}
