<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OfficeBranch;
use Illuminate\Http\Request;

class OfficeBranchController extends Controller
{
    /**
     * Display a listing of active office branches.
     */
    public function index()
    {
        $branches = OfficeBranch::where('is_active', true)->latest()->get();
        return response()->json([
            'success' => true,
            'data' => $branches
        ]);
    }
}
