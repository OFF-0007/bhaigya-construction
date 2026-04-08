<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreImageTypeRequest;
use App\Http\Requests\UpdateImageTypeRequest;
use App\Http\Resources\ImageTypeResource;
use App\Models\ImageType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ImageTypeController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $types = ImageType::latest()->get();
        return ImageTypeResource::collection($types);
    }

    public function store(StoreImageTypeRequest $request): ImageTypeResource
    {
        $type = ImageType::create($request->validated());
        return new ImageTypeResource($type);
    }

    public function show(ImageType $imageType): ImageTypeResource
    {
        return new ImageTypeResource($imageType);
    }

    public function update(UpdateImageTypeRequest $request, ImageType $imageType): ImageTypeResource
    {
        $imageType->update($request->validated());
        return new ImageTypeResource($imageType->fresh());
    }

    public function destroy(ImageType $imageType): JsonResponse
    {
        $imageType->delete();
        return response()->json(['message' => 'Image type deleted successfully.']);
    }
}
