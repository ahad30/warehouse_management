<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Warehouse extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'image',
        'country',
        'city',
        'address',
        'phone',
        'email',
        'site_link',
    ];

    // Define mutator for 'slug' attribute
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function staffs()
    {
        return $this->hasMany(Staff::class);
    }

    public function fromWarehouseHistories()
    {
        return $this->hasMany(History::class, 'from_warehouse_id');
    }

    public function toWarehouseHistories()
    {
        return $this->hasMany(History::class, 'to_warehouse_id');
    }
}
