<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class History extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function fromWarehouseId()
    {
        return $this->belongsTo(Warehouse::class, 'from_warehouse_id', 'id');
    }
    public function toWarehouseId()
    {
        return $this->belongsTo(Warehouse::class, 'to_warehouse_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function getCreateAtAttribute($value)
    {
        return $value;
    }
    public function products()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
