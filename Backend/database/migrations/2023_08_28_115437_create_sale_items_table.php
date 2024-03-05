<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sale_items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code');
            $table->float('product_sold_price');
            $table->float('average_rate')->default(1);
            $table->float('product_retail_price');
            $table->foreignId('sale_id')->constraint('sales')->onDelete('cascade');
            $table->foreignId('product_id')->constraint('products')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_items');
    }
};