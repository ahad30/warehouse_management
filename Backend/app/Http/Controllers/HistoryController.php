<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\History;

class HistoryController extends Controller
{
    public function Histories(Request $request)
    {

        $histories = History::paginate(5);
        
        return response()->json([
            'status' => true,
            'message' => "History Successfully Retrived",
            'data' => $histories,
        ]);

    }//end Histories() 

}
