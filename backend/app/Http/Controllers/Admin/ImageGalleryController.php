<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ImageGallery;
use App\Models\ImageType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImageGalleryController extends Controller
{
    public function index()
    {
        $images = ImageGallery::with('imageType')->latest()->paginate(15);
        return Inertia::render('Admin/Gallery/Index', [
            'images' => $images,
            'imageTypes' => ImageType::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Gallery/Create', [
            'imageTypes' => ImageType::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image_type_id' => 'required|exists:image_types,id',
            'image_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'upload_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
            'is_active' => 'required|boolean',
        ]);

        $path = $request->file('upload_image')->store('gallery', 'public');

        ImageGallery::create([
            'image_type_id' => $request->image_type_id,
            'image_name' => $request->image_name,
            'description' => $request->description,
            'upload_image' => $path,
            'is_active' => $request->is_active,
        ]);

        return redirect()->route('admin.gallery.index')->with('success', 'Image added to gallery successfully.');
    }

    public function edit(ImageGallery $gallery)
    {
        return Inertia::render('Admin/Gallery/Edit', [
            'image' => $gallery,
            'imageTypes' => ImageType::all(),
        ]);
    }

    public function update(Request $request, ImageGallery $gallery)
    {
        $request->validate([
            'image_type_id' => 'required|exists:image_types,id',
            'image_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'upload_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
            'is_active' => 'required|boolean',
        ]);

        $data = [
            'image_type_id' => $request->image_type_id,
            'image_name' => $request->image_name,
            'description' => $request->description,
            'is_active' => $request->is_active,
        ];

        if ($request->hasFile('upload_image')) {
            if ($gallery->upload_image) {
                Storage::disk('public')->delete($gallery->upload_image);
            }
            $data['upload_image'] = $request->file('upload_image')->store('gallery', 'public');
        }

        $gallery->update($data);

        return redirect()->route('admin.gallery.index')->with('success', 'Gallery image updated successfully.');
    }

    public function destroy(ImageGallery $gallery)
    {
        if ($gallery->upload_image) {
            Storage::disk('public')->delete($gallery->upload_image);
        }
        $gallery->delete();

        return redirect()->back()->with('success', 'Image removed from gallery successfully.');
    }
}
