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
}