<?php

namespace App\Repositories;

use App\Interfaces\ReportInterface;
use App\Services\ProductReport;
use App\Services\SaleReport;
use App\Services\ShiftingReport;

class ReportRepository

{

    protected $productReport;
    protected $saleReport;
    protected $shiftingReport;


    public function __construct(ProductReport $productReport)
    {
        $this->productReport = $productReport;
    }
    // public function getProductReport($timeRange, $startDate, $endDate)
    // {
    //     // generate product report
    //     return $this->productReport->generateReport($timeRange, $startDate, $endDate);
    // }
    public function getProductReport()
    {
        return $this->productReport->generateReport();
    }

    // generate sales report
    public function getSaleReport($timeRange, $startDate, $endDate)
    {
        return $this->saleReport->generateReport($timeRange, $startDate, $endDate);
    }

    // generate shifting report
    public function getShiftingReport($timeRange, $startDate, $endDate)
    {
        return $this->shiftingReport->generateReport($timeRange, $startDate, $endDate);
    }
}
