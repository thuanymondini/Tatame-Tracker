<?php

namespace Database\Seeders;

use App\Models\TechniqueCategories;
use App\Models\User;
use Illuminate\Database\Seeder;

class TechniqueCategoriesSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'demo@tatame.com')->firstOrFail();

        $registros = [
            ['name' => 'Guarda', 'description' => 'Técnicas de guarda, onde o praticante está de costas para o chão e controla o adversário com as pernas.'],
            ['name' => 'Passagem de Guarda', 'description' => 'Técnicas de passagem de guarda, onde o praticante tenta passar as pernas do adversário para alcançar uma posição dominante.'],
            ['name' => 'Finalizações', 'description' => 'Técnicas de finalização, onde o praticante tenta finalizar o adversário com chaves de braço, estrangulamentos ou outras técnicas de submissão.'],
        ];

        foreach ($registros as $registro) {
            TechniqueCategories::firstOrCreate(
                ['user_id' => $user->id, 'name' => $registro['name']],
                ['description' => $registro['description']]
            );
        }
    }
}
