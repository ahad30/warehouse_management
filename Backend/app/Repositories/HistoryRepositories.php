<?php

namespace App\Repositories;

use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Pipeline\Pipeline;
use App\Interfaces\HistoryServiceInterface;
use App\Repositories\Filters\{NameFilter, BrandFilter, WarehouseFilter, CategoryFilter, TimeFilter};

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
                WarehouseFilter::class,
                TimeFilter::class,
            ])
            ->thenReturn()
            ->paginate(15);

        return [
            'histories' => $histories->load('fromWarehouseId', 'toWarehouseId', 'user', 'products.getBrand', 'products.getCategory'),
            // 'histories' => $histories,
            'paginator' => $histories->toArray()['links'],
        ];
    }
}
