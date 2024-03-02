<?php

namespace App\Repositories;

use App\Interfaces\ReportInterface;
use Carbon\Carbon;

class ReportRepository

{
    private $reportInterface;

    public function __construct(ReportInterface $reportInterface)
    {
        $this->reportInterface = $reportInterface;
    }

    public function getProductReport($request)
    {
        $processedData = $this->extractRequest($request);

        $timeRange = $processedData['timeRange'];
        $startDate = $processedData['startDate'];
        $endDate = $processedData['endDate'];

        // generate product report
        return $this->reportInterface->generateReport($timeRange, $startDate, $endDate);
    }

    public function getSaleReport($request)
    {
        $processedData = $this->extractRequest($request);

        $timeRange = $processedData['timeRange'];
        $startDate = $processedData['startDate'];
        $endDate = $processedData['endDate'];

        return $this->reportInterface->generateReport($timeRange, $startDate, $endDate);
    }

    public function getShiftingReport($request)
    {
        $processedData = $this->extractRequest($request);

        $timeRange = $processedData['timeRange'];
        $startDate = $processedData['startDate'];
        $endDate = $processedData['endDate'];

        return $this->reportInterface->generateReport($timeRange, $startDate, $endDate);
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
