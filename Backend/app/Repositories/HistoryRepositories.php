<?php

namespace App\Repositories;

use App\Interfaces\HistoryServiceInterface;
use App\Models\History;
use App\Models\Product;
use App\Repositories\Filters\{NameFilter, BrandFilter, CategoryFilter, TimeFilter, WarehouseFilter};
use Illuminate\Http\Request;
use Illuminate\Pipeline\Pipeline;

class HistoryRepositories implements HistoryServiceInterface
{
    public function getHistory(Request $request): array
    {
        $query = History::latest()->with('products');

        $histories = app(Pipeline::class)
            ->send($query)
            ->through([
                NameFilter::class,
                BrandFilter::class,
                CategoryFilter::class,
                TimeFilter::class,
                WarehouseFilter::class,
            ])
            ->thenReturn()
            ->paginate(15);

        return [
            'histories' => $histories->load('fromWarehouseId', 'toWarehouseId', 'user'),
            'paginator' => $histories->links()->toArray()
        ];
    }
}
