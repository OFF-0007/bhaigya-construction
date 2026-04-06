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
    });
});
