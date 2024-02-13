<?php

namespace App\Models;

use App\Models\Brand;
use App\Models\Store;
use App\Models\Category;
use App\Models\SaleItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        "category_id",
        "brand_id",
        "warehouse_id",
        "product_name",
        "slug",
        "product_img",
        "product_unit",
        "product_code",
        "product_quantity",
        "product_retail_price",
        "product_sale_price",
        "product_code",
        "product_desc",
    ];

    public function getCategory()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
    public function getBrand()
    {
        return $this->belongsTo(Brand::class, 'brand_id', 'id');
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

    // Define mutator for 'slug' attribute
    public function setProductNameAttribute($value)
    {
        $this->attributes['product_name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }
}
