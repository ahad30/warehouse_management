<?php

namespace App\Models;

use App\Models\Brand;
use App\Models\Category;
use App\Models\SaleItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        "warehouse_id",
        "category_id",
        "brand_id",
        "product_name",
        "unique_code",
        'scan_code',
        "product_unit",
        "product_retail_price",
        "product_sale_price",
    ];

    public function getCategory()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
    public function getBrand()
    {
        return $this->belongsTo(Brand::class, 'brand_id', 'id');
    }
    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }
    public function saleitems()
    {
        return $this->belongsTo(SaleItem::class);
    }

    // product images rel
    public function productImages()
    {
        return $this->hasMany(ProductImage::class);
    }
}
