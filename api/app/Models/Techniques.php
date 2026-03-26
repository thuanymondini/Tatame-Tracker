<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Techniques extends Model
{
    protected $fillable = [
        "name",
        "description",
        "category_id",
        "technique_id"
    ];

    public $timestamps = false;

    // Técnica pai
    public function parentTechnique()
    {
        return $this->belongsTo(Techniques::class, 'technique_id');
    }

    // Técnicas filhas
    public function children()
    {
        return $this->hasMany(Techniques::class, 'technique_id');
    }
}
