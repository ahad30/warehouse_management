<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SaleItem;
use App\Models\Customer;

class Sale extends Model
{
    use HasFactory;
    protected $fillable = [
        'invoice_no',
        'customer_id',
        'invoice_date',
        'company_name',
        'company_email',
        'company_phone',
        'company_address',
        'customer_name',
        'customer_email',
        'customer_phone',
        'customer_address',
        'discount',
        'shipping',
        'total',
        'issue_date',
        'due_date',
    ];

    public function saleitems()
    {
        return $this->hasMany(SaleItem::class);
    }

    public function customers()
    {
        return $this->belongsTo(Customer::class);
    }
}