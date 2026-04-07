<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreImageTypeRequest;
use App\Http\Requests\UpdateImageTypeRequest;
use App\Models\ImageType;
use Inertia\Inertia;

class ImageTypeController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/ImageTypes/Index', [
            'imageTypes' => ImageType::latest()->get(),
        ]);
    }

    public function store(StoreImageTypeRequest $request)
    {
        ImageType::create($request->validated());

        return redirect()->back()->with('success', 'Image type created successfully.');
    }

    public function update(UpdateImageTypeRequest $request, ImageType $imageType)
    {
        $imageType->update($request->validated());

        return redirect()->back()->with('success', 'Image type updated successfully.');
    }

    public function destroy(ImageType $imageType)
    {
        $imageType->delete();

        return redirect()->back()->with('success', 'Image type deleted successfully.');
    }
}
