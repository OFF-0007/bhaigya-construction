<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agreement;
use App\Models\AgreementType;
use App\Models\ServicePackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AgreementController extends Controller
{
    public function index(Request $request)
    {
        $query = Agreement::with(['agreementType', 'servicePackage']);

        if ($request->has('package_id')) {
            $query->where('service_package_id', $request->package_id);
        }

        $agreements = $query->latest()->paginate(15);
        
        return Inertia::render('Admin/Agreements/Index', [
            'agreements' => $agreements,
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Admin/Agreements/Create', [
            'agreementTypes' => AgreementType::all(),
            'servicePackages' => ServicePackage::all(),
            'selectedPackageId' => $request->service_package_id,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'agreement_type_id' => 'required|exists:agreement_types,id',
            'service_package_id' => 'required|exists:service_packages,id',
            'document' => 'required|file|mimes:pdf,doc,docx,jpg,png|max:10240',
        ]);

        $path = $request->file('document')->store('agreements', 'public');

        Agreement::create([
            'agreement_type_id' => $request->agreement_type_id,
            'service_package_id' => $request->service_package_id,
            'document_uploaded' => $path,
        ]);

        return redirect()->route('admin.agreements.index')->with('success', 'Agreement uploaded successfully.');
    }

    public function edit(Agreement $agreement)
    {
        return Inertia::render('Admin/Agreements/Edit', [
            'agreement' => $agreement,
            'agreementTypes' => AgreementType::all(),
            'servicePackages' => ServicePackage::all(),
        ]);
    }

    public function update(Request $request, Agreement $agreement)
    {
        $request->validate([
            'agreement_type_id' => 'required|exists:agreement_types,id',
            'service_package_id' => 'required|exists:service_packages,id',
            'document' => 'nullable|file|mimes:pdf,doc,docx,jpg,png|max:10240',
        ]);

        $data = [
            'agreement_type_id' => $request->agreement_type_id,
            'service_package_id' => $request->service_package_id,
        ];

        if ($request->hasFile('document')) {
            if ($agreement->document_uploaded) {
                Storage::disk('public')->delete($agreement->document_uploaded);
            }
            $data['document_uploaded'] = $request->file('document')->store('agreements', 'public');
        }

        $agreement->update($data);

        return redirect()->route('admin.agreements.index')->with('success', 'Agreement updated successfully.');
    }

    public function destroy(Agreement $agreement)
    {
        Storage::disk('public')->delete($agreement->document_uploaded);
        $agreement->delete();

        return redirect()->back()->with('success', 'Agreement deleted successfully.');
    }
}
