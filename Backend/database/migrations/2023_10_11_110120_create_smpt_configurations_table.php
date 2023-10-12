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
        Schema::create('smtp_configurations', function (Blueprint $table) {
            $table->id();
            $table->string("smtp_mailer")->nullable();
            $table->string("smtp_host")->nullable();
            $table->string("smtp_username")->nullable();
            $table->string("smtp_password")->nullable();
            $table->string("smtp_encryption")->nullable();
            $table->string("smtp_address")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('smpt_configurations');
    }
};