<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use App\Models\Review;
use App\Models\Category;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'location',
        'category_id',
        'image_url',
        'user_id',
        'published_at',
        'sold_status',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'sold_status'  => 'boolean',
        'price'        => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function purchases()
    {
        return $this->belongsToMany(User::class, 'purchases', 'product_id', 'user_id')
                ->withPivot('purchased_at');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}