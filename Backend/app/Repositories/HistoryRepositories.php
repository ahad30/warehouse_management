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
        $query = History::latest()->with('products');

        if ($request->input('query')) {
            /**FIltering */
            $products = $this->findProduct($request, $query);
            if (count($products) > 0) {
                foreach ($products as $product) {

                    $query = $query->where('product_id', $product->id);
                }
            } else {
                $query = $query->where('product_id', 0);
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

    private function findProduct(Request $request, $query)
    {

        $products = Product::where('scan_code', $request->input('query'));
        /** Find by name */
        $products = $this->findByName($request->input('query'), $products);
        /** Find by brand */
        $products = $this->findByBrand($request->input('brand_id'), $products);
        /**Find by category */
        $products = $this->findByCategory($request->input('category_id'), $products);
        $products =  $products->get();

        return $products;
    }
    private function findByName($inputQuery, $query)
    {
        if ($inputQuery) {
            $query = $query->where('product_name', 'like', "%" . $inputQuery . "%");
        }

        return $query;
    }

    private function findByBrand($brandId, $query)
    {
        if ($brandId) {
            $query = $query->where('brand_id', $brandId);
        }
        return $query;
    }
    private function findByCategory($categoryId, $query)
    {
        if ($categoryId) {
            $query = $query->where('category_id',  $categoryId);
        }
        return $query;
    }
}
