<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAmenityRequest;
use App\Http\Requests\UpdateAmenityRequest;
use App\Http\Resources\AmenityResource;
use App\Models\Amenity;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AmenityController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $amenities = Amenity::orderBy('name')->get();
        return AmenityResource::collection($amenities);
    }

    public function store(StoreAmenityRequest $request): AmenityResource
    {
        $amenity = Amenity::create($request->validated());
        return new AmenityResource($amenity);
    }

    public function show(Amenity $amenity): AmenityResource
    {
        return new AmenityResource($amenity);
    }

    public function update(UpdateAmenityRequest $request, Amenity $amenity): AmenityResource
    {
        $amenity->update($request->validated());
        return new AmenityResource($amenity->fresh());
    }

    public function destroy(Amenity $amenity): JsonResponse
    {
        $amenity->delete();
        return response()->json(['message' => 'Amenity deleted successfully.']);
    }
}
