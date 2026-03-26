<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('technique_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->unique('name')->comment('Name of the technique category');
            $table->string('description', 400)->nullable()->comment('Description of the technique category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('technique_categories');
    }
};
