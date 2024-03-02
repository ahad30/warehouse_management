<?php

namespace App\Http\Controllers;

use App\Repositories\ReportRepository;
use App\Traits\ReportResponse;
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
