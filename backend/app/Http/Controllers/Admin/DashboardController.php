<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'users' => \App\Models\User::count(),
                'packages' => \App\Models\ServicePackage::count(),
            ]
        ]);
    }
}
