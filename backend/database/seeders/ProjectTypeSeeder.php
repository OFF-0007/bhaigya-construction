<?php

namespace Database\Seeders;

use App\Models\ProjectType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => 'Luxury', 'description' => 'High-end luxury residential projects with premium amenities.'],
            ['name' => 'Premium', 'description' => 'Premium quality projects with modern amenities.'],
            ['name' => 'Affordable', 'description' => 'Budget-friendly projects for first-time home buyers.'],
            ['name' => 'Commercial', 'description' => 'Office spaces, retail outlets, and commercial complexes.'],
            ['name' => 'Villa', 'description' => 'Independent villa and bungalow projects.'],
            ['name' => 'Apartment', 'description' => 'Multi-floor apartment complexes.'],
            ['name' => 'Township', 'description' => 'Large integrated township projects.'],
            ['name' => 'Plotted Development', 'description' => 'Residential plotted developments and layouts.'],
        ];

        foreach ($types as $type) {
            ProjectType::firstOrCreate(
                ['slug' => Str::slug($type['name'])],
                [
                    'name'        => $type['name'],
                    'description' => $type['description'],
                    'status'      => 'active',
                ]
            );
        }
    }
}
