<?php 
namespace App\Services;

use App\Interfaces\HistoryServiceInterface;
use App\Models\History;
use App\Models\Product;
use Illuminate\Http\Request;


class HistoryService implements HistoryServiceInterface
{
    public function getHistory(Request $request) :array
    {
        $query = History::latest()->with('products');
        /**FIltering */
        $inputQuery = $request->input('query');
        if($inputQuery){
           $products = Product::where('scan_code','like', "%".$inputQuery."%")->orWhere('product_name','like', "%".$inputQuery."%")->get();
           foreach($products as $product){
            $query = $query->orWhere('product_id',$product->id);
           }
        }
        $query = $query->paginate(15);
        
        $pagination = $query->toArray()['links'];
        $histories = $query->load('fromWarehouseId', 'toWarehouseId', 'user');

        return [
            'histories' => $histories,
            'paginator' => $pagination
        ];
    }
}