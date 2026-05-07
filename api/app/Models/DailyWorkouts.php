<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyWorkouts extends Model
{
    protected $fillable = [
        'user_id',
        'training_date',
        'observations',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function techniques()
    {
        return $this->belongsToMany(
            Techniques::class,
            'daily_workout_techniques',
            'daily_workout_id',
            'technique_id'
        );
    }
}
