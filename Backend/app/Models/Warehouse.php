<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'web_link',
    ];
}
