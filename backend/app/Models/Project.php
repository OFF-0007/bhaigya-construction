<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'project_name',
        'slug',
        'project_type_id',
        'service_category_id',
        'service_package_id',
        'description',
        'project_location',
        'district_id',
        'address',
        'latitude',
        'longitude',
        'project_start_date',
        'project_completion_date',
        'number_of_rooms',
        'number_of_floors',
        'number_of_washrooms',
        'total_area',
        'carpet_area',
        'area_unit',
        'status',
        'is_active',
        'is_featured',
        'is_completed',
        'is_working',
    ];

    protected $casts = [
        'is_active'               => 'boolean',
        'is_featured'             => 'boolean',
        'is_completed'            => 'boolean',
        'is_working'              => 'boolean',
        'latitude'                => 'decimal:8',
        'longitude'               => 'decimal:8',
        'total_area'              => 'decimal:2',
        'carpet_area'             => 'decimal:2',
        'project_start_date'      => 'date',
        'project_completion_date' => 'date',
    ];

    protected static function boot(): void
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->project_name);
            }
        });
        static::updating(function ($model) {
            if ($model->isDirty('project_name') && !$model->isDirty('slug')) {
                $model->slug = Str::slug($model->project_name);
            }
        });
    }

    // ─── Scopes ──────────────────────────────────────────────────────────────

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeCompleted($query)
    {
        return $query->where('is_completed', true);
    }

    public function scopeWorking($query)
    {
        return $query->where('is_working', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // ─── Relationships ────────────────────────────────────────────────────────

    public function projectType(): BelongsTo
    {
        return $this->belongsTo(ProjectType::class, 'project_type_id');
    }

    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class, 'district_id');
    }

    public function serviceCategory(): BelongsTo
    {
        return $this->belongsTo(ServiceCategory::class, 'service_category_id');
    }

    public function servicePackage(): BelongsTo
    {
        return $this->belongsTo(ServicePackage::class, 'service_package_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class, 'project_id')->orderBy('sort_order');
    }

    public function primaryImage()
    {
        return $this->hasOne(ProjectImage::class, 'project_id')->where('is_primary', true);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(ProjectDocument::class, 'project_id');
    }

    public function owners(): HasMany
    {
        return $this->hasMany(ProjectOwner::class, 'project_id');
    }

    public function amenities(): BelongsToMany
    {
        return $this->belongsToMany(Amenity::class, 'project_amenities', 'project_id', 'amenity_id');
    }

    public function progress(): HasMany
    {
        return $this->hasMany(ProjectProgress::class, 'project_id')->orderBy('progress_date', 'desc');
    }

    public function videos(): HasMany
    {
        return $this->hasMany(ProjectVideo::class, 'project_id');
    }

    public function rooms(): HasMany
    {
        return $this->hasMany(ProjectRoom::class, 'project_id');
    }
}
