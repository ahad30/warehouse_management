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
        
        if ($startingDate && $endingDate) {
            // If both starting_date and ending_date are provided, adjust them to include the entire day
            $startingDate .= ' 00:00:00';
            $endingDate .= ' 23:59:59';
            $query->whereBetween('created_at', [$startingDate, $endingDate]);
        } elseif ($startingDate) {
            // If only starting_date is provided, apply greater than or equal and include entire day
            $startingDate .= ' 00:00:00';
            $query->where('created_at', '>=', $startingDate);
        } elseif ($endingDate) {
            // If only ending_date is provided, apply less than or equal and include entire day
            $endingDate .= ' 23:59:59';
            $query->where('created_at', '<=', $endingDate);
        }

        return $next($query);
    }
}
