<?php

use App\Http\Controllers\Api\AmenityController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DistrictController;
use App\Http\Controllers\Api\ImageTypeController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ProjectProgressController;
use App\Http\Controllers\Api\ProjectTypeController;
use App\Http\Controllers\Api\ProjectVideoController;
use App\Http\Controllers\Api\ServiceCategoryController;
use App\Http\Controllers\Api\ServicePackageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ─── Public Auth ──────────────────────────────────────────────────────────────
Route::post('/login', [AuthController::class, 'login']);
Route::post('/admin/login', [AuthController::class, 'adminLogin']);

// ─── Public Read-Only Endpoints ───────────────────────────────────────────────
Route::prefix('v1')->group(function () {

    // Lookup / reference data
    Route::get('/project-types', [ProjectTypeController::class, 'index']);
    Route::get('/project-types/{projectType}', [ProjectTypeController::class, 'show']);

    Route::get('/districts', [DistrictController::class, 'index']);
    Route::get('/districts/{district}', [DistrictController::class, 'show']);

    Route::get('/image-types', [ImageTypeController::class, 'index']);

    Route::get('/amenities', [AmenityController::class, 'index']);

    // Services
    Route::get('/service-categories', [ServiceCategoryController::class, 'index']);
    Route::get('/service-categories/{serviceCategory}', [ServiceCategoryController::class, 'show']);

    Route::get('/service-packages', [ServicePackageController::class, 'index']);
    Route::get('/service-packages/slug/{slug}', [ServicePackageController::class, 'showBySlug']);
    Route::get('/service-packages/{servicePackage}', [ServicePackageController::class, 'show']);

    // Projects — public listing (only is_active=true returned by default)
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/slug/{slug}', [ProjectController::class, 'showBySlug']);
    Route::get('/projects/{project}', [ProjectController::class, 'show']);

    // Progress & videos (public read)
    Route::get('/project-progress', [ProjectProgressController::class, 'index']);
    Route::get('/project-videos', [ProjectVideoController::class, 'index']);

    // Project Rooms (public read)
    Route::get('/projects/{project}/rooms', [\App\Http\Controllers\Api\ProjectRoomController::class, 'index']);
});

// ─── Protected Routes (Sanctum) ───────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // ─── Admin Only ───────────────────────────────────────────────────────────
    Route::middleware('admin')->prefix('v1/admin')->group(function () {

        Route::get('/dashboard-stats', function () {
            return response()->json(['message' => 'Admin dashboard data']);
        });

        // Projects — full CRUD + extras
        Route::apiResource('projects', ProjectController::class);
        Route::get('/projects-all', [ProjectController::class, 'adminIndex']);
        Route::patch('/projects/{project}/toggle-active', [ProjectController::class, 'toggleActive']);

        // Project Rooms
        Route::post('/projects/{project}/rooms', [\App\Http\Controllers\Api\ProjectRoomController::class, 'store']);
        Route::apiResource('project-rooms', \App\Http\Controllers\Api\ProjectRoomController::class)->except(['index', 'store']);

        // Supporting lookups — writable from admin
        Route::apiResource('project-types', ProjectTypeController::class);
        Route::apiResource('amenities', AmenityController::class);
        Route::apiResource('image-types', ImageTypeController::class);
        Route::apiResource('districts', DistrictController::class);
        Route::apiResource('service-categories', ServiceCategoryController::class);
        Route::apiResource('service-packages', ServicePackageController::class);

        // Nested project resources
        Route::apiResource('project-progress', ProjectProgressController::class);
        Route::apiResource('project-videos', ProjectVideoController::class);
    });
});
