<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAmenityRequest;
use App\Http\Requests\UpdateAmenityRequest;
use App\Models\Amenity;
use Inertia\Inertia;

class AmenityController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Amenities/Index', [
            'amenities' => Amenity::latest()->get(),
        ]);
    }

    public function store(StoreAmenityRequest $request)
    {
        Amenity::create($request->validated());

        return redirect()->back()->with('success', 'Amenity created successfully.');
    }

    public function update(UpdateAmenityRequest $request, Amenity $amenity)
    {
        $amenity->update($request->validated());

        return redirect()->back()->with('success', 'Amenity updated successfully.');
    }

    public function destroy(Amenity $amenity)
    {
        $amenity->delete();

        return redirect()->back()->with('success', 'Amenity deleted successfully.');
    }
}
