<?php

namespace Database\Seeders;

use App\Models\AgreementType;
use Illuminate\Database\Seeder;

class AgreementTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = ['Labour', 'Client', 'Branch'];

        foreach ($types as $type) {
            AgreementType::firstOrCreate(['type_name' => $type]);
        }
    }
}
