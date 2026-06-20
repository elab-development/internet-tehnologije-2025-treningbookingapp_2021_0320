<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles; // Ostavljamo Spatie


use App\Models\Product;
use App\Models\Review;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    
    protected $guard_name = 'web';

    protected $fillable = [
        'username',
        'email',
        'password',
        // 'is_admin', // OVO MORA IZAĆI JER JE U BAZE NEMA (SLIKA 9AB7CF)!
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            // 'is_admin' => 'boolean', // OVO MORA IZAĆI!
        ];
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    
    public function purchases()
    {
        return $this->belongsToMany(Product::class, 'purchases', 'user_id', 'product_id')
                    ->withPivot('created_at'); 
    }
}