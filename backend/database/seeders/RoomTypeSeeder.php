<?php

namespace Database\Seeders;

use App\Models\RoomType;
use Illuminate\Database\Seeder;

class RoomTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roomTypes = [
            ['room_type_name' => 'Living Room'],
            ['room_type_name' => 'Bed Room'],
            ['room_type_name' => 'Kitchen'],
            ['room_type_name' => 'Bath Room'],
            ['room_type_name' => 'Dining Room'],
            ['room_type_name' => 'Study Room'],
            ['room_type_name' => 'Guest Room'],
            ['room_type_name' => 'Balcony'],
            ['room_type_name' => 'Store Room'],
            ['room_type_name' => 'Puja Room'],
        ];

        foreach ($roomTypes as $roomType) {
            RoomType::firstOrCreate(
                ['room_type_name' => $roomType['room_type_name']],
                ['is_active' => true]
            );
        }
    }
}
