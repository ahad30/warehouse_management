<?php 

namespace App\Services\Interfaces;

use Illuminate\Http\Request;

Interface HistoryServiceInterface
{
    public function getHistory(Request $request):array;
}