<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LoginController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

// Redirect root login to admin login
Route::get('/login', function () {
    return redirect()->route('admin.login');
})->name('login');

// Admin Panel Routes
Route::prefix('admin')->name('admin.')->group(function () {
    // Guest Admin Routes
    Route::get('/login', [LoginController::class, 'index'])->name('login');
    
    Route::middleware('guest')->group(function () {
        Route::post('/login', [LoginController::class, 'store'])->name('login');
    });

    // Authenticated Admin Routes
    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

        // Master Routes
        Route::resource('service-categories', \App\Http\Controllers\Admin\ServiceCategoryController::class)->names('service-categories');
        Route::resource('service-packages', \App\Http\Controllers\Admin\ServicePackageController::class)->names('service-packages');
        Route::resource('amenities', \App\Http\Controllers\Admin\AmenityController::class)->names('amenities');
        Route::resource('districts', \App\Http\Controllers\Admin\DistrictController::class)->names('districts');
        Route::resource('image-types', \App\Http\Controllers\Admin\ImageTypeController::class)->names('image-types');
        Route::resource('room-types', \App\Http\Controllers\Admin\RoomTypeController::class)->names('room-types');
        Route::resource('agreements', \App\Http\Controllers\Admin\AgreementController::class)->names('agreements');
        Route::resource('package-materials', \App\Http\Controllers\Admin\PackageMaterialController::class)->names('package-materials');
        Route::resource('gallery', \App\Http\Controllers\Admin\ImageGalleryController::class)->names('gallery');

        // Projects Routes
        Route::resource('projects', \App\Http\Controllers\Admin\ProjectController::class)->names('projects');
        Route::patch('projects/{project}/toggle-active', [\App\Http\Controllers\Admin\ProjectController::class, 'toggleActive'])->name('projects.toggle-active');

        // Project Rooms
        Route::post('projects/{project}/rooms', [\App\Http\Controllers\Admin\ProjectRoomController::class, 'store'])->name('projects.rooms.store');
        Route::patch('project-rooms/{room}', [\App\Http\Controllers\Admin\ProjectRoomController::class, 'update'])->name('project-rooms.update');
        Route::delete('project-rooms/{room}', [\App\Http\Controllers\Admin\ProjectRoomController::class, 'destroy'])->name('project-rooms.destroy');
    });
});
