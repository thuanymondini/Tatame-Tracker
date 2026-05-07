<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'demo@tatame.com'],
            [
                'name'     => 'Demo',
                'password' => 'demo123',
                'belt'     => 'branca',
            ]
        );
    }
}
