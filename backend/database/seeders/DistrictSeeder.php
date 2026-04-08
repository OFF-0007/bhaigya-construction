<?php

namespace Database\Seeders;

use App\Models\District;
use Illuminate\Database\Seeder;

class DistrictSeeder extends Seeder
{
    public function run(): void
    {
        $districts = [
            // Rajasthan
            ['name' => 'Jaipur', 'state' => 'Rajasthan'],
            ['name' => 'Jodhpur', 'state' => 'Rajasthan'],
            ['name' => 'Udaipur', 'state' => 'Rajasthan'],
            ['name' => 'Kota', 'state' => 'Rajasthan'],
            ['name' => 'Ajmer', 'state' => 'Rajasthan'],
            ['name' => 'Bikaner', 'state' => 'Rajasthan'],
            ['name' => 'Alwar', 'state' => 'Rajasthan'],
            ['name' => 'Sikar', 'state' => 'Rajasthan'],
            ['name' => 'Bharatpur', 'state' => 'Rajasthan'],
            ['name' => 'Bhilwara', 'state' => 'Rajasthan'],
            // Uttar Pradesh
            ['name' => 'Lucknow', 'state' => 'Uttar Pradesh'],
            ['name' => 'Agra', 'state' => 'Uttar Pradesh'],
            ['name' => 'Kanpur', 'state' => 'Uttar Pradesh'],
            ['name' => 'Varanasi', 'state' => 'Uttar Pradesh'],
            ['name' => 'Noida', 'state' => 'Uttar Pradesh'],
            ['name' => 'Ghaziabad', 'state' => 'Uttar Pradesh'],
            // Delhi
            ['name' => 'New Delhi', 'state' => 'Delhi'],
            ['name' => 'North Delhi', 'state' => 'Delhi'],
            ['name' => 'South Delhi', 'state' => 'Delhi'],
            ['name' => 'West Delhi', 'state' => 'Delhi'],
            // Maharashtra
            ['name' => 'Mumbai', 'state' => 'Maharashtra'],
            ['name' => 'Pune', 'state' => 'Maharashtra'],
            ['name' => 'Nagpur', 'state' => 'Maharashtra'],
            ['name' => 'Nashik', 'state' => 'Maharashtra'],
            ['name' => 'Thane', 'state' => 'Maharashtra'],
            // Gujarat
            ['name' => 'Ahmedabad', 'state' => 'Gujarat'],
            ['name' => 'Surat', 'state' => 'Gujarat'],
            ['name' => 'Vadodara', 'state' => 'Gujarat'],
            // Haryana
            ['name' => 'Gurugram', 'state' => 'Haryana'],
            ['name' => 'Faridabad', 'state' => 'Haryana'],
            ['name' => 'Ambala', 'state' => 'Haryana'],
            // Madhya Pradesh
            ['name' => 'Bhopal', 'state' => 'Madhya Pradesh'],
            ['name' => 'Indore', 'state' => 'Madhya Pradesh'],
            ['name' => 'Jabalpur', 'state' => 'Madhya Pradesh'],
        ];

        foreach ($districts as $district) {
            District::firstOrCreate(
                ['name' => $district['name'], 'state' => $district['state']],
                ['country' => 'India']
            );
        }
    }
}
