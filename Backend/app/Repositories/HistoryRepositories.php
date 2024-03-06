<?php

namespace App\Repositories;

use App\Interfaces\HistoryServiceInterface;
use App\Models\History;
use App\Models\Product;
use Illuminate\Http\Request;


class HistoryRepositories implements HistoryServiceInterface
{
    public function getHistory(Request $request): array
    {
        $query = History::latest()->with('products.getBrand', 'products.getCategory');
        /**FIltering */
        $inputQuery = $request->input('query');
        if ($inputQuery) {
            $products = Product::with('getBrand', 'getCategory')
                ->where(function ($query) use ($inputQuery) {
                    $query->where('scan_code', 'like', "%" . $inputQuery . "%")
                        ->orWhere('product_name', 'like', "%" . $inputQuery . "%")
                        ->orWhereHas('getBrand', function ($query) use ($inputQuery) {
                            $query->where('brand_name', 'like', "%" . $inputQuery . "%");
                        })
                        ->orWhereHas('getCategory', function ($query) use ($inputQuery) {
                            $query->where('category_name', 'like', "%" . $inputQuery . "%");
                        });
                })
                ->get();

            foreach ($products as $product) {
                $query = $query->orWhere('product_id', $product->id);
            }
        }
        $query = $query->paginate(15);

        $pagination = $query->toArray()['links'];
        $histories = $query->load('fromWarehouseId', 'toWarehouseId', 'user');

        return [
            'histories' => $histories,
            'paginator' => $pagination
        ];
    }
}
