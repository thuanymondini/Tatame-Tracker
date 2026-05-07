<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('techniques', function (Blueprint $table) {
            $table->dropUnique('techniques_name_unique');
            $table->unique(['user_id', 'name']);
        });
    }

    public function down(): void
    {
        Schema::table('techniques', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'name']);
            $table->unique('name');
        });
    }
};
