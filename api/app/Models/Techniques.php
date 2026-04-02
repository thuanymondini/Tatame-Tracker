<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Techniques extends Model
{
    protected $fillable = [
        "name",
        "description",
        "category_id",
        "linked_technique"
    ];

    public $timestamps = false;

    // Técnica pai
    public function linkedTechnique()
    {
        return $this->belongsTo(Techniques::class, 'linked_technique');
    }

    public function category()
    {
        return $this->belongsTo(TechniqueCategories::class, 'category_id');
    }

    public function dailyWorkouts()
    {
        return $this->belongsToMany(
            DailyWorkouts::class,
            'daily_workout_techniques',
            'linked_technique',
            'daily_workout_id'
        );
    }
}
