<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'username'   => $this->username,
            'email'      => $this->email,
            'is_admin'   => $this->hasRole('admin', 'web'),
            'created_at' => optional($this->created_at)?->toIso8601String(),

            
            'products'   => ProductResource::collection($this->whenLoaded('products')),
            'purchases'  => ProductResource::collection($this->whenLoaded('purchases')),
        ];
    }
}
