<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Techniques;

class DailyWorkouts extends Model
{
    protected $fillable = [
        "training_date",
        "observations",
    ];
    public function techniques()
    {
        return $this->belongsToMany(Techniques::class, 'daily_workout_techniques');
    }
}
