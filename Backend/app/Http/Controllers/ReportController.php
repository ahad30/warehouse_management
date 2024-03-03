<?php

namespace App\Http\Controllers;

use App\Repositories\ReportRepository;
use App\Traits\ReportResponse;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    use ReportResponse;

    private $reportRepository;

    public function __construct(ReportRepository $reportRepository)
    {
        $this->reportRepository = $reportRepository;
    }


    // getting product reports
    public function productReport(Request $request)
    {
      
        $reports = $this->reportRepository->getProductReport();

        if (!$reports) {
            return $this->emptyResponse();
        }

        return $this->successResponse($reports);
    }

    // getting sale reports
    public function salesReport(Request $request)
    {
        $processedData = $this->extractRequest($request);

        $timeRange = $processedData['timeRange'];
        $startDate = $processedData['startDate'];
        $endDate = $processedData['endDate'];

        $reports = $this->reportRepository->getSaleReport($timeRange, $startDate, $endDate);

        if (!$reports) {
            return $this->emptyResponse();
        }

        return $this->successResponse($reports);
    }

    // getting shifting reports
    public function shiftingReport(Request $request)
    {
        $processedData = $this->extractRequest($request);

        $timeRange = $processedData['timeRange'];
        $startDate = $processedData['startDate'];
        $endDate = $processedData['endDate'];

        $reports = $this->reportRepository->getShiftingReport($timeRange, $startDate, $endDate);

        if (!$reports) {
            return $this->emptyResponse();
        }

        return $this->successResponse($reports);
    }

    protected function extractRequest($request)
    {
        $timeRange = $request->timeRange;
        $startDate = Carbon::parse($request->startDate)->format("Y-m-d");
        $endDate = Carbon::parse($request->endDate)->format("Y-m-d");

        return [
            'timeRange' => $timeRange,
            'startDate' => $startDate,
            'endDate' => $endDate
        ];
    }
}