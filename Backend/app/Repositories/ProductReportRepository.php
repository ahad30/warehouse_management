<?php

namespace App\Repositories;

use App\Interfaces\ProductReportInterface;
use App\Models\Product;
use Carbon\Carbon;

class ProductReportRepository implements ProductReportInterface
{


    public function getReport()
    {
        $query = Product::query();

        if (request()->timeRange !== null) {
            switch (request()->timeRange) {
                case 1:
                    $query->whereDate('created_at', now()->toDateString());
                    break;
                case 7:
                    $query->whereBetween('created_at', [now()->subDays(7)->startOfDay(), now()->endOfDay()]);
                    break;
                case 30:
                    $query->whereBetween('created_at', [now()->subDays(30)->startOfMonth(), now()]);
                    break;
                default:
                    return response()->json(['message' => 'Invalid time range.'], 400);
            }
        } elseif (request()->startDate && request()->endDate) {
            $query->whereBetween('created_at', [Carbon::parse(request()->startDate), Carbon::parse(request()->endDate)]);
        } else {
            return response()->json(['message' => 'Invalid request.'], 400);
        }

        return $query->get();
    }
}
