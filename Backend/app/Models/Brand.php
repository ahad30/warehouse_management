<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Warehouse;

class Brand extends Model
{
    use HasFactory;
    protected $fillable = [
        'warehouse_id',
        'brand_name',
        'brand_img',
    ];

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }
}
