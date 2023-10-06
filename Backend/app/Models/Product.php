<?php

namespace App\Models;

use App\Models\Brand;
use App\Models\Store;
use App\Models\Category;
use App\Models\SaleItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        "store_id",
        "slug",
    ];

    public function getCategory()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
    public function getBrand()
    {
        return $this->belongsTo(Brand::class, 'brand_id', 'id');
    }
    public function getStore()
    {
        return $this->belongsTo(Store::class, 'store_id', 'id');
    }

    // public function saleitems()
    // {
    //     return $this->belongsTo(SaleItem::class);
    // }

}