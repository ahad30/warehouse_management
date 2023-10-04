<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\SaleItem;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        "product_name",
        "product_img",
        "product_unit",
        "product_code",
        "product_quantity",
        "product_retail_price",
        "product_sale_price",
        "product_code",
        "product_desc",
        "category_id",
        "brand_id",
        "slug",
    ];

    public function categories()
    {
        return $this->belongsTo(Category::class);
    }

    public function saleitems()
    {
        return $this->belongsTo(SaleItem::class);
    }
}