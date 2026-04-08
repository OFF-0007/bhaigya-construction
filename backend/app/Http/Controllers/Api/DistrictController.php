<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DistrictResource;
use App\Models\District;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class DistrictController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = District::query();

        if ($request->filled('state')) {
            $query->where('state', $request->state);
        }
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $districts = $query->orderBy('name')->get();
        return DistrictResource::collection($districts);
    }

    public function show(District $district): DistrictResource
    {
        return new DistrictResource($district);
    }

    public function store(Request $request): DistrictResource
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'state'   => 'required|string|max:255',
            'country' => 'nullable|string|max:255',
        ]);

        $district = District::create($validated);
        return new DistrictResource($district);
    }

    public function update(Request $request, District $district): DistrictResource
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'state'   => 'required|string|max:255',
            'country' => 'nullable|string|max:255',
        ]);

        $district->update($validated);
        return new DistrictResource($district->fresh());
    }

    public function destroy(District $district): \Illuminate\Http\JsonResponse
    {
        $district->delete();
        return response()->json(['message' => 'District deleted successfully.']);
    }
}
