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
        Schema::create('daily_workouts', function (Blueprint $table) {
            $table->id();
            $table->date('training_date')->comment('Data do treino, não pode ser futura');
            $table->string('observations', 600)->nullable()->comment('Observações do treino');
            $table->timestamps();
        });

        // Tabela pivot para o relacionamento N:N com techniques
        Schema::create('daily_workout_techniques', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('daily_workout_id');
            $table->unsignedBigInteger('technique_id');

            $table->foreign('daily_workout_id')->references('id')->on('daily_workouts')->onDelete('cascade');
            $table->foreign('technique_id')->references('id')->on('techniques')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_workouts');
    }
};
