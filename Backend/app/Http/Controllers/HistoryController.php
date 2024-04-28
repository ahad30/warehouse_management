<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;
use App\Interfaces\HistoryServiceInterface;
use App\Repositories\ReportRepository;

class HistoryController extends Controller
{
    private $historyService;
    private $reportRepository;
    public function __construct(HistoryServiceInterface $historyService, ReportRepository $reportRepository)
    {
        $this->historyService = $historyService;
        $this->reportRepository = $reportRepository;
    }
    /**
     * Get all histories
     *
     * @param Request $request
     * @return \Illuminate\Http\Response|array The response containing the status and history data.
     */
    public function histories(Request $request)
    {
        $histories = $this->historyService->getHistory($request);
        return response([
            'status' => true,
            'data' => $histories,
        ], 200);
    }
}