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
                $query->where('product_name', 'like', '%' . request('query') . '%');
            });
        }

        return $next($query);
    }
}
