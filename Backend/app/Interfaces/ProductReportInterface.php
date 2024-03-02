<?php

namespace App\Interfaces;

interface ProductReportInterface
{
    /**
     * Undocumented function
     *
     * @param [type] $timeRange
     * @param [type] $startDate
     * @param mixed $endDate
     * @return object
     */
    public function getReport($timeRange, $startDate, mixed $endDate): object;
}
