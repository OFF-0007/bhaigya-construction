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
    public function index()
    {
        $agreements = Agreement::with(['agreementType', 'servicePackage'])->latest()->paginate(15);
        
        return Inertia::render('Admin/Agreements/Index', [
            'agreements' => $agreements,
            'agreementTypes' => AgreementType::all(),
            'servicePackages' => ServicePackage::all(),
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

        return redirect()->back()->with('success', 'Agreement uploaded successfully.');
    }

    public function destroy(Agreement $agreement)
    {
        Storage::disk('public')->delete($agreement->document_uploaded);
        $agreement->delete();

        return redirect()->back()->with('success', 'Agreement deleted successfully.');
    }
}
