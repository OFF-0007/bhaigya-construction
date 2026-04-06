<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceCategoryController extends Controller
{
    public function index()
    {
        $categories = ServiceCategory::latest()->get();
        return Inertia::render('Admin/ServiceCategories/Index', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_name' => 'required|string|max:255',
            'is_active' => 'required|boolean',
            'type' => 'required|in:package,project,common',
        ]);

        ServiceCategory::create($validated);

        return redirect()->back()->with('success', 'Service category created successfully.');
    }

    public function update(Request $request, ServiceCategory $serviceCategory)
    {
        $validated = $request->validate([
            'category_name' => 'required|string|max:255',
            'is_active' => 'required|boolean',
            'type' => 'required|in:package,project,common',
        ]);

        $serviceCategory->update($validated);

        return redirect()->back()->with('success', 'Service category updated successfully.');
    }

    public function destroy(ServiceCategory $serviceCategory)
    {
        $serviceCategory->delete();

        return redirect()->back()->with('success', 'Service category deleted successfully.');
    }
}
