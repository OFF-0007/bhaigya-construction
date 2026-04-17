<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServicePackageRequest;
use App\Http\Requests\UpdateServicePackageRequest;
use App\Http\Resources\ServicePackageResource;
use App\Models\ServicePackage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ServicePackageController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = ServicePackage::with('category');

        // Only show active packages to public by default
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        } else {
            $query->where('is_active', true);
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('popularity')) {
            $query->where('popularity', $request->popularity);
        }

        if ($request->has('is_featured')) {
            $query->where('is_featured', filter_var($request->is_featured, FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $perPage = min((int) ($request->per_page ?? 12), 50);
        $packages = $query->latest()->paginate($perPage);
        return ServicePackageResource::collection($packages);
    }

    public function store(StoreServicePackageRequest $request): ServicePackageResource
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('service-packages', 'public');
        }

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }
        
        $package = ServicePackage::create($validated);
        return new ServicePackageResource($package->load('category'));
    }

    public function show(ServicePackage $servicePackage): ServicePackageResource
    {
        return new ServicePackageResource($servicePackage->load('category'));
    }

    public function showBySlug(string $slug): ServicePackageResource
    {
        $package = ServicePackage::with('category')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();
            
        return new ServicePackageResource($package);
    }

    public function update(UpdateServicePackageRequest $request, ServicePackage $servicePackage): ServicePackageResource
    {
        $validated = $request->validated();

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
        return new ServicePackageResource($servicePackage->fresh('category'));
    }

    public function destroy(ServicePackage $servicePackage): JsonResponse
    {
        $servicePackage->delete();
        return response()->json(['message' => 'Service package deleted successfully.']);
    }
}
