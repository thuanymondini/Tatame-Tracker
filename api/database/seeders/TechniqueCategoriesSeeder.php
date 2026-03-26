<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TechniqueCategories;

class TechniqueCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $registros = [
            ['name' => 'Guarda', 'description' => 'Técnicas de guarda, onde o praticante está de costas para o chão e controla o adversário com as pernas.'],
            ['name' => 'Passagem de Guarda', 'description' => 'Técnicas de passagem de guarda, onde o praticante tenta passar as pernas do adversário para alcançar uma posição dominante.'],
            ['name' => 'Finalizações', 'description' => 'Técnicas de finalização, onde o praticante tenta finalizar o adversário com chaves de braço, estrangulamentos ou outras técnicas de submissão.'],
        ];

        foreach ($registros as $registro) {
            TechniqueCategories::firstOrCreate($registro);
        }
    }
}
