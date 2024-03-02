<?php

namespace App\Http\Controllers;

use App\Repositories\ReportRepository;
use App\Traits\ReportResponse;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    use ReportResponse;
    /**
     * Handle the incoming request.
     */

    // public function __invoke($time_range = null, $start_date = null, $end_date = null){
    //     $timeRange = $time_range; // Values: daily, weekly, monthly, custom

    //     $query = DB::table('products')
    //         ->join('sale_items', 'sale_items.product_id', '=', 'products.id')
    //         ->join('sales', 'sales.id', '=', 'sale_items.sale_id')
    //         ->selectRaw('product_name, SUM(sale_items.quantity) as quantity, AVG(sale_items.average_rate) as price,
    //         AVG(sale_items.tax) as average_vat, SUM(sale_items.quantity * sale_items.average_rate)  as total_sold_price_without_vat, MAX(sales.issue_date) as last_sale_date')
    //         ->groupBy('product_name');
    //     // Apply date filters based on the time range
    //     if ($timeRange == 1) {
    //         $query->whereDate('sales.issue_date', '=', now()->toDateString());
    //     } elseif ($timeRange == 7) {
    //         $query->whereBetween('sales.issue_date', [now()->subDays(7), now()]);
    //     } elseif ($timeRange == 31) {
    //         $query->whereBetween('sales.issue_date', [now()->startOfMonth(), now()->endOfMonth()]);
    //     } elseif ($timeRange === 'custom') {
    //         // Get the time range parameters from the request
    //         $startDate = Carbon::parse($start_date)->format("Y-m-d");
    //         $endDate = Carbon::parse($end_date)->format("Y-m-d");
    //         if ($startDate && $endDate) {
    //             $query->whereBetween('sales.issue_date', [$startDate, $endDate]);
    //         }
    //     }

    //     $products = $query->orderByDesc('quantity')->get();
    //     $productData = [];
    //     foreach ($products as $product) {
    //         $productData[] = [
    //             "product_name" => $product->product_name,
    //             "quantity" => formatLargeNumber($product->quantity),
    //             "price" => formatLargeNumber($product->price),
    //             "average_vat" => formatLargeNumber($product->average_vat),
    //             "total_sold_price_without_vat" => formatLargeNumber($product->total_sold_price_without_vat),
    //             "last_sale_date" => $product->last_sale_date
    //         ];
    //     }

    //     if ($products->count() > 0) {
    //         return response()->json([
    //             'status' => true,
    //             'products' => $productData
    //         ], 200);
    //     }

    //     return response()->json([
    //         'status' => false,
    //         'message' => "No product Found",
    //         'products' => $products
    //     ]);
    // }

    // public function __invoke(Request $request)
    // {
    //     $type = $request->type;
    //     $startDate = Carbon::parse($request->start_date)->format("Y-m-d");
    //     $endDate = Carbon::parse($request->end_date)->format("Y-m-d");

    //     $time_range = $request->time_range;

    //     if ($type == "products") {
    //         $query = DB::table('products');
    //         $startDate = Carbon::parse($startDate)->format("Y-m-d");
    //         $endDate = Carbon::parse($endDate)->format("Y-m-d");
    //         if ($startDate && $endDate) {
    //             $query->whereBetween('products.created_at', [$startDate, $endDate]);
    //         }

    //         if ($query->count() > 0) {
    //             return $this->successResponse($query->get());
    //         }
    //         return $this->emptyResponse();
    //     } elseif ($type == "shifting") {
    //         return $type;
    //     } elseif ($type == "sales") {
    //         return $type;
    //     } else {
    //         return response()->json([
    //             'status' => false,
    //             'message' => "Invalid type"
    //         ], 400);
    //     }
    // }


    private $reportRepository;

    public function __construct(ReportRepository $reportRepository)
    {
        $this->reportRepository = $reportRepository;
    }

    // getting product reports
    public function productReport(Request $request)
    {
        // you need to pass only request parameters
        $reports = $this->reportRepository->getProductReport($request);

        if (!$reports) {
            return $this->emptyResponse();
        }

        return $this->successResponse($reports);
    }

    // getting sale reports
    public function salesReport(Request $request)
    {
        $reports = $this->reportRepository->getSaleReport($request);

        if (!$reports) {
            return $this->emptyResponse();
        }

        return $this->successResponse($reports);
    }

    // getting shifting reports
    public function shiftingReport(Request $request)
    {
        $reports = $this->reportRepository->getShiftingReport($request);

        if (!$reports) {
            return $this->emptyResponse();
        }

        return $this->successResponse($reports);
    }
}
