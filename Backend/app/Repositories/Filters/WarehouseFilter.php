<?php

namespace App\Repositories\Filters;

use App\Models\Product;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class WarehouseFilter
{
    public function handle($query, Closure $next)
    {
        // if (request()->filled('from_warehouse')) {
        //     $query->where('from_warehouse_id', request('from_warehouse'));
        // }

        // if (request()->filled('to_warehouse')) {
        //     $query->where('to_warehouse_id', request('to_warehouse'));
        // }
        if(request()->filled('warehouse_id')) {
            $query->whereHas('products', function (Builder $query) {
                $query->where('warehouse_id', request('warehouse_id'));
            });
        }

        return $next($query);
    }
}