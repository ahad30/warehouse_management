<?php

namespace App\Services;

use App\Interfaces\ReportInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

// class SaleReport implements ReportInterface
// {
//     public function generateReport($timeRange = 0, $startDate = null, $endDate = null)
//     {
//         return $this->getReport($timeRange, $startDate, $endDate);
//     }
//     public function getReport($timeRange, $startDate, $endDate)
//     {
//         if ($timeRange > 0) {
//             return $this->getReportByRange($timeRange);
//         }

//         $query = DB::table('sales');
//         if ($startDate && $endDate) {
//             $query->whereBetween('sales.created_at', [$startDate, $endDate]);
//         }
//         return $query->get();
//     }

//     public function getReportByRange($timeRange)
//     {
//         $previousDate = Carbon::now()->subDays($timeRange);
//         $formattedDate = $previousDate->format('Y-m-d');
//         $currentDate = now()->toDateString();
//         return DB::table('sales')
//             ->whereBetween('created_at', [$formattedDate, $currentDate])
//             ->get();
//     }
// }
