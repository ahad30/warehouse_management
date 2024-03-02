<?php

namespace App\Interfaces;

interface ReportInterface
{
    /**
     * Undocumented function
     *
     * @param [type] $timeRange
     * @param [type] $startDate
     * @param mixed $endDate
     */
    public function generateReport($timeRange, $startDate, $endDate);
}
