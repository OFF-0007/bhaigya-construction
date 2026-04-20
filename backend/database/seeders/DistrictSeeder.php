<?php

namespace Database\Seeders;

use App\Models\District;
use Illuminate\Database\Seeder;

class DistrictSeeder extends Seeder
{
    public function run(): void
    {
        $districts = [
            ['name' => 'Kamrup Metropolitan', 'state' => 'Assam'],
            ['name' => 'Kamrup', 'state' => 'Assam'],
            ['name' => 'Dibrugarh', 'state' => 'Assam'],
            ['name' => 'Tinsukia', 'state' => 'Assam'],
            ['name' => 'Jorhat', 'state' => 'Assam'],
            ['name' => 'Sivasagar', 'state' => 'Assam'],
            ['name' => 'Golaghat', 'state' => 'Assam'],
            ['name' => 'Nagaon', 'state' => 'Assam'],
            ['name' => 'Morigaon', 'state' => 'Assam'],
            ['name' => 'Sonitpur', 'state' => 'Assam'],
            ['name' => 'Lakhimpur', 'state' => 'Assam'],
            ['name' => 'Dhemaji', 'state' => 'Assam'],
            ['name' => 'Barpeta', 'state' => 'Assam'],
            ['name' => 'Nalbari', 'state' => 'Assam'],
            ['name' => 'Darrang', 'state' => 'Assam'],
            ['name' => 'Goalpara', 'state' => 'Assam'],
            ['name' => 'Dhubri', 'state' => 'Assam'],
            ['name' => 'Kokrajhar', 'state' => 'Assam'],
            ['name' => 'Chirang', 'state' => 'Assam'],
            ['name' => 'Bongaigaon', 'state' => 'Assam'],
            ['name' => 'Cachar', 'state' => 'Assam'],
            ['name' => 'Karimganj', 'state' => 'Assam'],
            ['name' => 'Hailakandi', 'state' => 'Assam'],
            ['name' => 'Dima Hasao', 'state' => 'Assam'],
            ['name' => 'Karbi Anglong', 'state' => 'Assam'],
            ['name' => 'West Karbi Anglong', 'state' => 'Assam'],
            ['name' => 'Majuli', 'state' => 'Assam'],
            ['name' => 'Charaideo', 'state' => 'Assam'],
            ['name' => 'Hojai', 'state' => 'Assam'],
            ['name' => 'South Salmara-Mankachar', 'state' => 'Assam'],
            ['name' => 'Bajali', 'state' => 'Assam'],
            ['name' => 'Tamulpur', 'state' => 'Assam'],
            ['name' => 'Udalguri', 'state' => 'Assam'],
            ['name' => 'Baksa', 'state' => 'Assam'],
        ];

        foreach ($districts as $district) {
            District::firstOrCreate(
                ['name' => $district['name'], 'state' => $district['state']],
                ['country' => 'India']
            );
        }
    }
}