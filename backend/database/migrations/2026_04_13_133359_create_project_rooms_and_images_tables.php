<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_rooms', function (Blueprint $table) {
                $table->id();
                $table->foreignId('project_id')->constrained()->onDelete('cascade');
                $table->foreignId('room_type_id')->constrained()->onDelete('cascade');
                $table->json('details')->nullable(); // Dynamic descriptions (size, colors, materials, etc.)
                $table->text('description')->nullable(); // General summary/description
                $table->timestamps();
            });
            
            Schema::create('project_room_images', function (Blueprint $table) {
                $table->id();
                $table->foreignId('project_room_id')->constrained('project_rooms')->onDelete('cascade');
                $table->string('image_name')->nullable();
                $table->string('file_path');
                $table->string('alt_text')->nullable();
                $table->json('image_details')->nullable();
                $table->boolean('is_primary')->default(false);
                $table->integer('sort_order')->default(0);
                $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_room_images');
        Schema::dropIfExists('project_rooms');
    }
};
