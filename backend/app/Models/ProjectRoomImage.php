<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectRoomImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_room_id',
        'image_name',
        'file_path',
        'alt_text',
        'image_details',
        'is_primary',
        'sort_order',
    ];

    protected $casts = [
        'is_primary'    => 'boolean',
        'image_details' => 'array',
    ];

    public function projectRoom(): BelongsTo
    {
        return $this->belongsTo(ProjectRoom::class);
    }
}
