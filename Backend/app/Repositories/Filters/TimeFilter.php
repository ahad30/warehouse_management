<?php

namespace App\Repositories\Filters;

use App\Models\Product;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class TimeFilter
{
    public function handle($query, Closure $next)
    {
        if (request()->filled('starting_date') && request()->filled('ending_date')) {
            $query->whereBetween('created_at', [request('starting_date'), request('ending_date')]);
        }

        return $next($query);
    }
}
