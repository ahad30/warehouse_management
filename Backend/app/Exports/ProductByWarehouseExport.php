<?php

namespace App\Exports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromCollection;

class ProductByWarehouseExport implements FromCollection
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public $product;
    public function __construct($product)
    {
        $this->product = $product;
    }
    public function collection()
    {
        return $this->product;
    }
}
