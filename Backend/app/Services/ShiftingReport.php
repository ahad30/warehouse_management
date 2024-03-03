<?php

namespace App\Services;

use App\Interfaces\ReportInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ShiftingReport implements ReportInterface
{
    public function generateReport()
    {
        $timeRange = request()->time_range; // Values: daily, weekly, monthly, custom
        $warehouseId = request()->warehouse_id;

        /** For new product */
        $newProducts = $this->collectNewProducts($timeRange, $warehouseId);
        /** for selling */
        $soldProducts = $this->collectSoldProduct($timeRange, $warehouseId);

        $products = $this->mergeData($soldProducts, $newProducts);
        return [
            'status' => true,
            'data' => $products,
            'statusCode' => 200
        ];
    }
    /**
     * collect New Products
     *
     * @param [type] $timeRange
     */
    private function collectNewProducts($timeRange, $warehouseId)
    {
        /** Select new product group by created at date */
        $query = DB::table('products')->where('warehouse_id', $warehouseId);
        $query = $this->generateQuery($timeRange, $query);
        $products = $query->selectRaw('COUNT(*) as newProducts,DATE(created_at) as date')->groupBy(DB::raw('DATE(created_at)'))->get();
        return $products;
    }
    /**
     * Select new product group by created at date
     *
     * @param [type] $timeRange
     */
    private function collectSoldProduct($timeRange, $warehouseId)
    {
        $query = DB::table('products')->where('warehouse_id', $warehouseId);
        $query = $this->generateQuery($timeRange, $query);
        $products = $query->selectRaw('COUNT(*) as soldProducts,DATE(created_at) as date')->groupBy(DB::raw('DATE(created_at)'))->get();
        return $products;
    }
    /**
     * Apply date filters based on the time range
     *
     * @param [type] $timeRange
     * @param [type] $query
     */
    private function generateQuery($timeRange, $query)
    {

        if ($timeRange == 1) {
            $query->whereDate('created_at', '=', now()->toDateString());
        } elseif ($timeRange == 7) {
            $query->whereBetween('created_at', [now()->subDays(7), now()]);
        } elseif ($timeRange == 30) {
            $query->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()]);
        } elseif ($timeRange === 'custom') {
            // Get the time range parameters from the request
            $startDate = Carbon::parse(request()->start_date)->format("Y-m-d");
            $endDate = Carbon::parse(request()->end_date)->format("Y-m-d");
            if ($startDate && $endDate) {
                $query->whereBetween('created_at', [$startDate, $endDate]);
            }
        }
        return $query;
    }
    /**
     * merge Data
     *
     * @param [object] $newProducts
     * @param [object] $soldProducts
     */
    private function mergeData($newProducts, $soldProducts)
    {
        $mergedProducts = [];
        foreach ($newProducts as $newProduct) {
            $date = $newProduct->date;
            // Check if there is a corresponding entry in $soldProducts for the same date
            $soldProduct = collect($soldProducts)->firstWhere('date', $date);

            // Merge the entries into a single array
            $mergedProducts[] = array_merge((array) $newProduct, (array) $soldProduct ?? (array) []);
        }
        return $mergedProducts;
    }
}
