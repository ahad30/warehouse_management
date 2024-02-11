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
        'site_link',
    ];
    // protected $visible = [
    //     'name',
    //     'slug',
    //     'country',
    //     'city',
    //     'address',
    //     'phone',
    //     'email',
    //     'site_link',
    // ];
    public static $rules =  [
        'name' => 'required|string|max:255',
        'slug' => 'required|string|max:255',
        'country' => 'required|string',
        'city' => 'required|string',
        'address' => 'nullable',
        'phone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
        'email' => 'required|email|string|lowercase',
        'site_link' => 'nullable|active_url',
    ];
}
