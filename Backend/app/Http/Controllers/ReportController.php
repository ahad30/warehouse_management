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

    // getting sale reports
    public function salesReport()
    {

        $reports = $this->reportRepository->getSaleReport();

        if (!$reports['status']) {
            return response()->json(
                [
                    'status' => false,
                    'message' => $reports['message']
                ],
                $reports['statusCode']
            );
        }
        return response()->json([
            'status' => true,
            'data' => $reports['data']
        ], $reports['statusCode']);
    }

    // getting shifting reports
    public function shiftingReport()
    {
        $reports = $this->reportRepository->getShiftingReport();

        if (!$reports['status']) {
            return response()->json(
                [
                    'status' => false,
                    'message' => $reports['message']
                ],
                $reports['statusCode']
            );
        }
        return response()->json([
            'status' => true,
            'data' => $reports['data']
        ], $reports['statusCode']);
    }
}
