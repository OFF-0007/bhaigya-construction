<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDistrictRequest;
use App\Http\Requests\UpdateDistrictRequest;
use App\Models\District;
use Inertia\Inertia;

class DistrictController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Districts/Index', [
            'districts' => District::latest()->get(),
        ]);
    }

    public function store(StoreDistrictRequest $request)
    {
        District::create($request->validated());

        return redirect()->back()->with('success', 'District created successfully.');
    }

    public function update(UpdateDistrictRequest $request, District $district)
    {
        $district->update($request->validated());

        return redirect()->back()->with('success', 'District updated successfully.');
    }

    public function destroy(District $district)
    {
        $district->delete();

        return redirect()->back()->with('success', 'District deleted successfully.');
    }
}
