<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Agreement extends Model
{
    use HasFactory;

    protected $fillable = [
        'agreement_type_id',
        'service_package_id',
        'document_uploaded'
    ];

    public function agreementType(): BelongsTo
    {
        return $this->belongsTo(AgreementType::class);
    }

    public function servicePackage(): BelongsTo
    {
        return $this->belongsTo(ServicePackage::class);
    }
}
