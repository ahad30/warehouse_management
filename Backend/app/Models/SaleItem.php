<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Sale;
use App\Models\Product;

class SaleItem extends Model
{
    use HasFactory;
    protected $fillable = [
        'sale_id',
        'product_id',
        'name',
        'code',
        'description',
        'unit',
        'quantity',
        'rate',
        'product_retail_price',
    ];

    public function sales()
    {
        return $this->belongsTo(Sale::class);
    }

    public function products()
    {
        return $this->belongsTo(Product::class);
    }

}