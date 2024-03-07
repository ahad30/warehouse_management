<?php

namespace App\Repositories\Filters;

use App\Models\Product;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CategoryFilter
{
    public function handle($query, Closure $next)
    {
        if (request()->filled('category_id')) {
            $query->whereHas('products', function (Builder $query) {
                $query->where('category_id', request('category_id'));
            });
        }

        return $next($query);
    }
}
