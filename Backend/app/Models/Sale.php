<?php

namespace App\Models;


use App\Models\Product;
use App\Models\Customer;
use App\Models\SaleItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        'sub_total',
        'issue_date',
        'due_date',
        'paid_amount',
        'due_amount',
        'status',
    ];

    public function saleitems()
    {
        return $this->hasMany(SaleItem::class);
    }

    public function customer()
    {
        return $this->hasOne(Customer::class, 'id', 'customer_id');
    }


}