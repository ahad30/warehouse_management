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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->float("discount")->default(0.0)->nullable();
            $table->float("shipping", 50)->nullable();
            $table->string("taxation", 20)->nullable();
            $table->float("tax_value", 10, 2)->nullable();
            $table->string('currency', 20)->nullable();
            $table->text('footer_note')->nullable();
            $table->string('mail_option', 20)->nullable();
            $table->string('mail_credential_status', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};