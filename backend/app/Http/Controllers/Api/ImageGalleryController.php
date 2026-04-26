<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImageGalleryResource;
use App\Models\ImageGallery;
use Illuminate\Http\Request;

class ImageGalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ImageGallery::with('imageType')->where('is_active', true);

        if ($request->has('image_type_id')) {
            $query->where('image_type_id', $request->image_type_id);
        }

        $images = $query->latest()->get();

        return ImageGalleryResource::collection($images);
    }
}
