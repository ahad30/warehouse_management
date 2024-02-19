<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\History;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Auth;


class ProductShiftingController extends Controller
{

use ResponseTrait;
    

public function ProductShiftingStore(Request $request,$id)
{

    try {

        $product_id = Product::find($id);
        $product_id = DB::select('SELECT id FROM products');
        $history = History::create([
            "from_warehouse_id" => $request->from_warehouse_id,
            "to_warehouse_id" => $request->to_warehouse_id,
            "product_id" =>   $product_id,
            "user_id" => Auth()->user()->id,
        ]);

        return $this->successResponse([ 'data' => $history ,'status' => true, 'message' => "Histoy uploaded"]);

    } catch (\Exception $e) {
        DB::rollBack();        
        return $this->errorResponse(['status' => false, 'message' => "something went wrong"
        ]);
    }

}
//end  ProductShiftingStore() method

    public function  ProductShiftingIndex(Request $request)
    {
        $histories = History::all();

        if($histories->count() == 0)
        {
            return $this->errorResponse(['status' => false, 'message' => "something went wrong"]);
        }

        return $this->successResponse([ 'data' => $histories ,'status' => true, 'message' => "Histoy Reterived"]);


    }



}
