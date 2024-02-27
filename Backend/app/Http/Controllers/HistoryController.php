<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\History;

class HistoryController extends Controller
{
    public function histories(Request $request)
    {

        $query = History::latest()->paginate(15);
        $pagination = $query->toArray()['links'];
        $histories = $query->load('fromWarehouseId', 'toWarehouseId', 'products', 'user');
        return response([
            'status' => true,
            'data' => [
                'histories' => $histories,
                'paginator' => $pagination
            ],
        ], 200);
    }
}
