<?php

namespace Database\Seeders;

use App\Models\Amenity;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AmenitySeeder extends Seeder
{
    public function run(): void
    {
        $amenities = [
            ['name' => 'Swimming Pool', 'icon' => 'pool'],
            ['name' => 'Gymnasium', 'icon' => 'gym'],
            ['name' => 'Covered Parking', 'icon' => 'parking'],
            ['name' => 'CCTV Surveillance', 'icon' => 'cctv'],
            ['name' => 'Power Backup', 'icon' => 'power'],
            ['name' => 'Passenger Lift', 'icon' => 'lift'],
            ['name' => 'Landscaped Garden', 'icon' => 'garden'],
            ['name' => 'Club House', 'icon' => 'club'],
            ['name' => '24/7 Security', 'icon' => 'security'],
            ['name' => 'Rainwater Harvesting', 'icon' => 'rainwater'],
            ['name' => 'Intercom', 'icon' => 'intercom'],
            ['name' => 'Children\'s Play Area', 'icon' => 'playground'],
            ['name' => 'Jogging Track', 'icon' => 'jogging'],
            ['name' => 'Indoor Games Room', 'icon' => 'indoor-games'],
            ['name' => 'Fire Safety System', 'icon' => 'fire-safety'],
            ['name' => 'Gas Pipeline', 'icon' => 'gas'],
            ['name' => 'Solar Energy', 'icon' => 'solar'],
            ['name' => 'Solid Waste Management', 'icon' => 'waste'],
            ['name' => 'High-speed Internet', 'icon' => 'internet'],
            ['name' => 'Air Conditioning', 'icon' => 'ac'],
        ];

        foreach ($amenities as $amenity) {
            Amenity::firstOrCreate(
                ['slug' => Str::slug($amenity['name'])],
                [
                    'name' => $amenity['name'],
                    'icon' => $amenity['icon'],
                ]
            );
        }
    }
}
