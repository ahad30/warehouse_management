<?php

namespace App\Services;

use App\Interfaces\ReportInterface;
use App\Models\SaleItem;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class SaleReport implements ReportInterface
{
    public function generateReport()
    {

    $category = request()->category_id;
    $brand = request()->brand_id;
    $warehouse = request()->warehouse_id;
    $productCode = request()->product_code;
    $startDate = request()->starting_date;
    $endDate = request()->ending_date ;

    // Adjust the end date if start date and end date are the same
    if ($startDate && $endDate && $startDate == $endDate) {
        $endDate .= ' 23:59:59';
    }

    // Initialize the base query
    $query = SaleItem::query();

    // Apply filters if any query parameters are provided
    if ($category) {
        $query->whereHas('products', function ($q) use ($category) {
            $q->where('category_id', $category);
        });
    }
    if ($brand) {
        $query->whereHas('products', function ($q) use ($brand) {
            $q->where('brand_id', $brand);
        });
    }
    if ($warehouse) {
        $query->whereHas('products', function ($q) use ($warehouse) {
            $q->where('warehouse_id', $warehouse);
        });
    }
    if ($productCode) {
        $query->where('scan_code', $productCode);
    }

    // Apply date filtering
    if ($startDate && $endDate) {
        // Adjust end date to include the entire day
        $endDate .= ' 23:59:59';
        $query->whereBetween('created_at', [$startDate, $endDate]);
    } elseif ($startDate) {
        $query->where('created_at', '>=', $startDate);
    } elseif ($endDate) {
        // Adjust end date to include the entire day
        $endDate .= ' 23:59:59';
        $query->where('created_at', '<=', $endDate);
    }

    // Execute the query and eager load relationships
    $products = $query->with('products','products.getCategory:id,category_name','products.getBrand:id,brand_name', 'products.warehouse:id,name')
                      ->paginate(15)
                      ->appends(request()->query());

    return [
        'status' => true,
        'data' => $products,
        'statusCode' => 200
    ];



        // $timeRange = request()->time_range; 
        // $newProducts = $this->collectNewProducts($timeRange);
        // $soldProducts = $this->collectSoldProduct($timeRange);
        // $products = $this->mergeData($soldProducts, $newProducts);
    }
    /**
     * collect New Products
     *
     * @param [type] $timeRange
     */
    private function collectNewProducts($timeRange)
    {
        /** Select new product group by created at date */
        $query = DB::table('products');
        $query = $this->generateQuery($timeRange, $query);
        $products = $query->selectRaw('COUNT(*) as newProducts,DATE(created_at) as date')->groupBy(DB::raw('DATE(created_at)'))->get();
        return $products;
    }
    /**
     * Select new product group by created at date
     *
     * @param [type] $timeRange
     */
    private function collectSoldProduct($timeRange)
    {
        $query = DB::table('sale_items');
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
        if ($timeRange === 'custom') {
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
