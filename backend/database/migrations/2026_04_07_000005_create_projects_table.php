<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('project_name');
            $table->string('slug')->unique();

            // Type & Category links
            $table->foreignId('project_type_id')->nullable()->constrained('project_types')->nullOnDelete();            
            $table->foreignId('service_category_id')->nullable()->constrained('service_categories')->nullOnDelete();
            $table->foreignId('service_package_id')->nullable()->constrained('service_packages')->nullOnDelete();

            // Location
            $table->foreignId('district_id')->constrained('districts')->cascadeOnDelete();
            $table->string('project_location');
            $table->text('address');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();

            // Description
            $table->longText('description');

            // Dates
            $table->date('project_start_date')->nullable();
            $table->date('project_completion_date')->nullable();

            // Physical attributes
            $table->integer('number_of_rooms')->nullable();
            $table->integer('number_of_floors')->nullable();
            $table->integer('number_of_washrooms')->nullable();
            $table->decimal('total_area', 10, 2)->nullable();
            $table->decimal('carpet_area', 10, 2)->nullable();
            $table->enum('area_unit', ['sqft', 'sqm'])->default('sqft');

            // Status flags
            $table->enum('status', ['ongoing', 'completed', 'upcoming'])->default('upcoming');
            $table->boolean('is_active')->default(true)->comment('Controls visibility on frontend');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_completed')->default(false)->comment('Marks project as fully completed');
            $table->boolean('is_working')->default(false)->comment('Marks project as currently under construction/working');

            // Indexes for common filter queries
            $table->index('project_type_id');
            $table->index('district_id');
            $table->index('service_category_id');
            $table->index('service_package_id');
            $table->index('status');
            $table->index('is_active');
            $table->index('is_featured');
            $table->index('is_completed');
            $table->index('is_working');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
