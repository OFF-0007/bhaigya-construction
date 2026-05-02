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
    public function index(Request $request)
    {
        $query = PackageMaterial::with('servicePackage');

        if ($request->has('package_id')) {
            $query->where('service_package_id', $request->package_id);
        }

        $materials = $query->latest()->paginate(15);
        
        return Inertia::render('Admin/Materials/Index', [
            'materials' => $materials,
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Admin/Materials/Create', [
            'servicePackages' => ServicePackage::all(),
            'selectedPackageId' => $request->service_package_id,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'service_package_id' => 'required|exists:service_packages,id',
            'materials' => 'required|array|min:1',
            'materials.*.material_name' => 'required|string|max:255',
            'materials.*.material_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp,bmp|max:5120',
            'materials.*.description' => 'nullable|string',
            'materials.*.is_available' => 'boolean',
        ]);

        foreach ($request->input('materials') as $index => $materialData) {
            $path = null;
            if ($request->hasFile("materials.{$index}.material_image")) {
                $path = $request->file("materials.{$index}.material_image")->store('materials', 'public');
            }

            PackageMaterial::create([
                'service_package_id' => $request->service_package_id,
                'material_name' => $materialData['material_name'],
                'material_image' => $path,
                'description' => $materialData['description'] ?? null,
                'is_available' => isset($materialData['is_available']) ? filter_var($materialData['is_available'], FILTER_VALIDATE_BOOLEAN) : true,
            ]);
        }

        return redirect()->route('admin.package-materials.index')->with('success', 'Materials added successfully.');
    }

    public function edit(PackageMaterial $packageMaterial)
    {
        return Inertia::render('Admin/Materials/Edit', [
            'material' => $packageMaterial,
            'servicePackages' => ServicePackage::all(),
        ]);
    }

    public function update(Request $request, PackageMaterial $packageMaterial)
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
            if ($packageMaterial->material_image) {
                Storage::disk('public')->delete($packageMaterial->material_image);
            }
            $data['material_image'] = $request->file('material_image')->store('materials', 'public');
        }

        $packageMaterial->update($data);

        return redirect()->route('admin.package-materials.index')->with('success', 'Material updated successfully.');
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
