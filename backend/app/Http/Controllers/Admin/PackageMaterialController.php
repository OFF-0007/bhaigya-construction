<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PackageMaterial;
use App\Models\ServicePackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PackageMaterialController extends Controller
{
    public function index()
    {
        $materials = PackageMaterial::with('servicePackage')->latest()->paginate(15);
        
        return Inertia::render('Admin/Materials/Index', [
            'materials' => $materials,
            'servicePackages' => ServicePackage::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'service_package_id' => 'required|exists:service_packages,id',
            'material_name' => 'required|string|max:255',
            'material_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp,bmp|max:5120',
            'description' => 'nullable|string',
            'is_available' => 'boolean',
        ]);

        $path = null;
        if ($request->hasFile('material_image')) {
            $path = $request->file('material_image')->store('materials', 'public');
        }

        PackageMaterial::create([
            'service_package_id' => $request->service_package_id,
            'material_name' => $request->material_name,
            'material_image' => $path,
            'description' => $request->description,
            'is_available' => $request->boolean('is_available', true),
        ]);

        return redirect()->back()->with('success', 'Material added successfully.');
    }

    public function update(Request $request, PackageMaterial $material)
    {
        $request->validate([
            'service_package_id' => 'required|exists:service_packages,id',
            'material_name' => 'required|string|max:255',
            'material_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp,bmp|max:5120',
            'description' => 'nullable|string',
            'is_available' => 'boolean',
        ]);

        $data = [
            'service_package_id' => $request->service_package_id,
            'material_name' => $request->material_name,
            'description' => $request->description,
            'is_available' => $request->boolean('is_available'),
        ];

        if ($request->hasFile('material_image')) {
            if ($material->material_image) {
                Storage::disk('public')->delete($material->material_image);
            }
            $data['material_image'] = $request->file('material_image')->store('materials', 'public');
        }

        $material->update($data);

        return redirect()->back()->with('success', 'Material updated successfully.');
    }

    public function destroy(PackageMaterial $material)
    {
        if ($material->material_image) {
            Storage::disk('public')->delete($material->material_image);
        }
        $material->delete();

        return redirect()->back()->with('success', 'Material deleted successfully.');
    }
}
