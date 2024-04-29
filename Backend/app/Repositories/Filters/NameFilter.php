<?php

namespace App\Repositories\Filters;

use App\Models\Product;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class NameFilter
{
    public function handle($query, Closure $next)
    {
        if (request()->filled('query')) {
            $query->whereHas('products', function (Builder $query) {
                $query->orWhere('product_name', 'like', '%' . request('query') . '%')->orWhere('scan_code', request('query'));
            });
        }

        return $next($query);
    }
}