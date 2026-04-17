<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoomTypeRequest;
use App\Http\Requests\UpdateRoomTypeRequest;
use App\Models\RoomType;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RoomTypeController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/RoomTypes/Index', [
            'roomTypes' => RoomType::latest()->get(),
        ]);
    }

    public function store(StoreRoomTypeRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('primary_image')) {
            $validated['primary_image'] = $request->file('primary_image')->store('room_types', 'public');
        }

        RoomType::create($validated);

        return redirect()->back()->with('success', 'Room Type created successfully.');
    }

    public function update(UpdateRoomTypeRequest $request, RoomType $roomType)
    {
        $validated = $request->validated();

        if ($request->hasFile('primary_image')) {
            // Delete old image
            if ($roomType->primary_image) {
                Storage::disk('public')->delete($roomType->primary_image);
            }
            $validated['primary_image'] = $request->file('primary_image')->store('room_types', 'public');
        }

        $roomType->update($validated);

        return redirect()->back()->with('success', 'Room Type updated successfully.');
    }

    public function destroy(RoomType $roomType)
    {
        if ($roomType->primary_image) {
            Storage::disk('public')->delete($roomType->primary_image);
        }
        $roomType->delete();

        return redirect()->back()->with('success', 'Room Type deleted successfully.');
    }
}
