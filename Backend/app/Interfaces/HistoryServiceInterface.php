<?php 

namespace App\Interfaces;

use Illuminate\Http\Request;

Interface HistoryServiceInterface
{
    public function getHistory(Request $request):array;
}