<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectRoom extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'room_type_id',
        'details',
        'description',
    ];

    protected $casts = [
        'details' => 'array',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function roomType(): BelongsTo
    {
        return $this->belongsTo(RoomType::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectRoomImage::class, 'project_room_id')->orderBy('sort_order');
    }

    public function primaryImage()
    {
        return $this->hasOne(ProjectRoomImage::class, 'project_room_id')->where('is_primary', true);
    }
}
