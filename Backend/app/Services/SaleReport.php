<?php

namespace App\Services;

use App\Interfaces\ReportInterface;

class SaleReport implements ReportInterface
{
    public function generateReport($timeRange, $startDate, $endDate)
    {
        return "okay";
    }
}
