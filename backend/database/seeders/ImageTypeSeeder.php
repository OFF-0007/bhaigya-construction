<?php

namespace Database\Seeders;

use App\Models\ImageType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ImageTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => '2D Model', 'description' => 'Two-dimensional architectural drawings and plans.'],
            ['name' => '3D Model', 'description' => 'Three-dimensional rendered views of the project.'],
            ['name' => 'Floor Plan', 'description' => 'Detailed floor-by-floor layout plans.'],
            ['name' => 'Elevation', 'description' => 'Front, rear, and side elevation drawings.'],
            ['name' => 'Site Plan', 'description' => 'Overall site layout and master plan.'],
            ['name' => 'Interior', 'description' => 'Interior design renders and actual photos.'],
            ['name' => 'Progress Photo', 'description' => 'On-site construction progress photographs.'],
            ['name' => 'Exterior', 'description' => 'External facade and exterior renders.'],
        ];

        foreach ($types as $type) {
            ImageType::firstOrCreate(
                ['slug' => Str::slug($type['name'])],
                [
                    'name'        => $type['name'],
                    'description' => $type['description'],
                ]
            );
        }
    }
}
