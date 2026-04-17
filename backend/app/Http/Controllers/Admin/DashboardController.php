<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

use App\Models\User;
use App\Models\ServicePackage;
use App\Models\Project;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'users' => User::count(),
            'packages' => ServicePackage::count(),
            'projects' => Project::count(),
            'categories' => ServiceCategory::count(),
            'activeProjects' => Project::where('is_active', true)->count(),
            'ongoingProjects' => Project::where('status', 'ongoing')->count(),
            'upcomingProjects' => Project::where('status', 'upcoming')->count(),
            'completedProjects' => Project::where('status', 'completed')->count(),
        ];

        $recentProjects = Project::with(['projectType', 'servicePackage'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentActivities' => $recentProjects->map(function($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->project_name,
                    'action' => 'New project added',
                    'time' => $project->created_at->diffForHumans(),
                    'type' => $project->projectType?->name,
                    'category' => $project->servicePackage?->title,
                    'status' => $project->status,
                ];
            })
        ]);
    }
}
