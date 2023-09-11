<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Sale;

class SaleItem extends Model
{
    use HasFactory;
    protected $fillable = [
        'sale_id',
        'name',
        'code',
        'description',
        'unit',
        'quantity',
        'rate',
    ];

    public function sales(){
        return $this->belongsTo(Sale::class);
    }
}
