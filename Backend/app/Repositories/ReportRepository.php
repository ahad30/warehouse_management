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


    public function __construct(SaleReport $saleReport, ShiftingReport $shiftingReport)
    {
        $this->saleReport = $saleReport;
        $this->shiftingReport = $shiftingReport;
    }
    // generate sales report
    public function getSaleReport()
    {
        return $this->saleReport->generateReport();
    }

    // generate shifting report
    public function getShiftingReport()
    {
        return $this->shiftingReport->generateReport();
    }
}
