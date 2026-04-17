<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceCategory;
use App\Models\ServicePackage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ServicePackageController extends Controller
{
    public function index()
    {
        $packages = ServicePackage::with('category')->latest()->get();
        $categories = ServiceCategory::where('is_active', true)
            ->whereIn('type', ['package', 'common'])
            ->get();

        return Inertia::render('Admin/ServicePackages/Index', [
            'packages' => $packages,
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:service_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'benefits' => 'nullable|array',
            'is_active' => 'required|boolean',
            'popularity' => 'required|in:standard,popular,premium',
            'price' => 'nullable|numeric|min:0',
            'is_featured' => 'required|boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('service-packages', 'public');
        }

        $validated['slug'] = Str::slug($validated['title']);

        ServicePackage::create($validated);

        return redirect()->back()->with('success', 'Service package created successfully.');
    }

    public function update(Request $request, ServicePackage $servicePackage)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:service_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'benefits' => 'nullable|array',
            'is_active' => 'required|boolean',
            'popularity' => 'required|in:standard,popular,premium',
            'price' => 'nullable|numeric|min:0',
            'is_featured' => 'required|boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($servicePackage->image) {
                Storage::disk('public')->delete($servicePackage->image);
            }
            $validated['image'] = $request->file('image')->store('service-packages', 'public');
        }

        if ($servicePackage->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $servicePackage->update($validated);

        return redirect()->back()->with('success', 'Service package updated successfully.');
    }

    public function show(ServicePackage $servicePackage)
    {
        return Inertia::render('Admin/ServicePackages/Show', [
            'package' => $servicePackage->load('category')
        ]);
    }

    public function destroy(ServicePackage $servicePackage)
    {
        $servicePackage->delete();

        return redirect()->back()->with('success', 'Service package deleted successfully.');
    }
}
