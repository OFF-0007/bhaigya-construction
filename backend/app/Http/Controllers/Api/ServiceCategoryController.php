<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceCategoryRequest;
use App\Http\Requests\UpdateServiceCategoryRequest;
use App\Http\Resources\ServiceCategoryResource;
use App\Models\ServiceCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;

class ServiceCategoryController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = ServiceCategory::query();

        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        } else {
            $query->where('is_active', true);
        }

        if ($request->filled('type')) {
            $query->where(function ($q) use ($request) {
                $q->where('type', $request->type)
                  ->orWhere('type', 'common');
            });
        }

        $categories = $query->latest()->get();
        return ServiceCategoryResource::collection($categories);
    }

    public function store(StoreServiceCategoryRequest $request): ServiceCategoryResource
    {
        $validated = $request->validated();
        if ($request->hasFile('category_image')) {
            $validated['category_image'] = $request->file('category_image')->store('service_categories', 'public');
        }
        $category = ServiceCategory::create($validated);
        return new ServiceCategoryResource($category);
    }

    public function show(ServiceCategory $serviceCategory): ServiceCategoryResource
    {
        return new ServiceCategoryResource($serviceCategory);
    }

    public function update(UpdateServiceCategoryRequest $request, ServiceCategory $serviceCategory): ServiceCategoryResource
    {
        $validated = $request->validated();
        if ($request->hasFile('category_image')) {
            if ($serviceCategory->category_image) {
                Storage::disk('public')->delete($serviceCategory->category_image);
            }
            $validated['category_image'] = $request->file('category_image')->store('service_categories', 'public');
        }
        $serviceCategory->update($validated);
        return new ServiceCategoryResource($serviceCategory->fresh());
    }

    public function destroy(ServiceCategory $serviceCategory): JsonResponse
    {
        if ($serviceCategory->category_image) {
            Storage::disk('public')->delete($serviceCategory->category_image);
        }
        $serviceCategory->delete();
        return response()->json(['message' => 'Service category deleted successfully.']);
    }
}
