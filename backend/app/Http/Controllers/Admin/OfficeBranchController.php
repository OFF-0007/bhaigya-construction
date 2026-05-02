<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OfficeBranch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OfficeBranchController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/OfficeBranches/Index', [
            'branches' => OfficeBranch::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'location' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'map_url' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('branches', 'public');
        }

        OfficeBranch::create($validated);

        return redirect()->back()->with('success', 'Office branch created successfully.');
    }

    public function update(Request $request, OfficeBranch $office_branch)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'location' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'map_url' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($office_branch->image) {
                Storage::disk('public')->delete($office_branch->image);
            }
            $validated['image'] = $request->file('image')->store('branches', 'public');
        }

        $office_branch->update($validated);

        return redirect()->back()->with('success', 'Office branch updated successfully.');
    }

    public function destroy(OfficeBranch $office_branch)
    {
        if ($office_branch->image) {
            Storage::disk('public')->delete($office_branch->image);
        }
        $office_branch->delete();

        return redirect()->back()->with('success', 'Office branch deleted successfully.');
    }
}
