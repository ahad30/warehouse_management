<?php

namespace App\Repositories\Filters;

use App\Models\Product;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class BrandFilter
{
    public function handle($query, Closure $next)
    {
        if (request()->filled('brand_id')) {
            $query->whereHas('products', function (Builder $query) {
                $query->where('brand_id', request('brand_id'));
            });
        }

        return $next($query);
    }
}
