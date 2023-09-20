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
        'name',
        'category_id',
        'category_name',
        'slug',
        'code',
        'price',
        'unit',
        'desc',
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
