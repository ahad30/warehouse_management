<?php 
namespace App\Services;

use App\Models\History;
use Illuminate\Http\Request;
use App\Services\Interfaces\HistoryServiceInterface;

class HistoryService implements HistoryServiceInterface
{
    public function getHistory(Request $request) :array
    {
        $query = History::latest();
        /**FIltering */
        if($request->input('query')){
            $query =  $query->where('scan_code', "%".$request->input('query')."%")->orWhere('product_name', "%".$request->input('query')."%");
        }
        $query = $query->paginate(15);
        
        $pagination = $query->toArray()['links'];
        $histories = $query->load('fromWarehouseId', 'toWarehouseId', 'products', 'user');

        return [
            'histories' => $histories,
            'paginator' => $pagination
        ];
    }
}