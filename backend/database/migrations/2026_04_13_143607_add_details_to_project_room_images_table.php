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
        Schema::table('project_room_images', function (Blueprint $table) {
            $table->string('image_name')->nullable()->after('project_room_id');
            $table->json('image_details')->nullable()->after('alt_text');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_room_images', function (Blueprint $table) {
            $table->dropColumn(['image_name', 'image_details']);
        });
    }
};
