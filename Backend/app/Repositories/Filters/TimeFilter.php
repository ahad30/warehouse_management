<?php

namespace App\Repositories\Filters;

use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class TimeFilter
{
    public function handle($query, Closure $next)
    {  
        $startingDate = request('starting_date');
        $endingDate = request('ending_date');
        
        if ($startingDate && $endingDate && $startingDate == $endingDate) {
            // If starting_date and ending_date are the same, but both are provided
            // Adjust ending_date to the end of the day to include records of the same day
            $endingDate .= '23:59:59';
        }

        if ($startingDate && $endingDate) {
            // If both starting_date and ending_date are provided, apply whereBetween
            $query->whereBetween('created_at', [$startingDate, $endingDate]);
        } elseif ($startingDate) {
            // If only starting_date is provided, apply greater than or equal
            $query->where('created_at', '>=', $startingDate);
        } elseif ($endingDate) {
            // If only ending_date is provided, apply less than or equal
            $query->where('created_at', '<=', $endingDate);
        }

        return $next($query);
    }
}

