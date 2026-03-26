<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TechniqueCategories extends Model
{
    protected $fillable = [
        "name",
        "description",
    ];

    public $timestamps = false;
}
