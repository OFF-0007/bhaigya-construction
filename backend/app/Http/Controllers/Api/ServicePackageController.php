<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServicePackageRequest;
use App\Http\Requests\UpdateServicePackageRequest;
use App\Http\Resources\ServicePackageResource;
use App\Models\ServicePackage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Str;

class ServicePackageController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $packages = ServicePackage::with('category')->latest()->get();
        return ServicePackageResource::collection($packages);
    }

    public function store(StoreServicePackageRequest $request): ServicePackageResource
    {
        $validated = $request->validated();
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }
        
        $package = ServicePackage::create($validated);
        return new ServicePackageResource($package);
    }

    public function show(ServicePackage $servicePackage): ServicePackageResource
    {
        return new ServicePackageResource($servicePackage->load('category'));
    }

    public function showBySlug(string $slug): ServicePackageResource
    {
        $package = ServicePackage::with('category')
            ->where('slug', $slug)
            ->firstOrFail();
            
        return new ServicePackageResource($package);
    }

    public function update(UpdateServicePackageRequest $request, ServicePackage $servicePackage): ServicePackageResource
    {
        $validated = $request->validated();
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
