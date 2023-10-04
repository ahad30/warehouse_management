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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->string('product_img')->nullable();
            $table->string('product_code')->unique()->nullable();
            $table->string('product_unit');
            $table->integer('product_quantity')->default(0);
            $table->text('product_desc')->nullable();
            $table->float('product_retail_price');
            $table->float('product_sale_price', 10, 2);
            $table->unsignedBigInteger('category_id')->default(1);
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};