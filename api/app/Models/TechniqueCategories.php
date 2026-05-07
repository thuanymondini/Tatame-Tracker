<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TechniqueCategories extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'description',
    ];

    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
