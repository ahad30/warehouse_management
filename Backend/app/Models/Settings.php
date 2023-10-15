<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    use HasFactory;
    protected $fillable = [
        'discount',
        'shipping',
        'taxation',
        'tax_value',
        'currency',
        'footer_note',
        'mail_option',
        'mail_credential_status',

    ];
}