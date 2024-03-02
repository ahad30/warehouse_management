<?php

namespace App\Traits;

trait ReportResponse
{
    // success response
    protected function successResponse($query)
    {
        return response()->json([
            'status' => true,
            'products' => $query
        ]);
    }

    // empty response
    protected function emptyResponse()
    {
        return response()->json([
            'status' => false,
            'message' => "No item Found",
        ]);
    }
}
