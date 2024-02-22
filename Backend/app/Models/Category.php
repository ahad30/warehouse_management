<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'category_name',
        'image',
        'slug',
        'description',
    ];

    // Define mutator for 'slug' attribute
    public function setCategoryNameAttribute($value)
    {
        $this->attributes['category_name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
