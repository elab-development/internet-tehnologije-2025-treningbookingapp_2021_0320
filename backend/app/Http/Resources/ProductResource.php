<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    

    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'title'         => (string) $this->title,
            'description'   => $this->description,
            'price'         => $this->when(isset($this->price), (float) $this->price),
            'image_url'     => $this->image_url,
            'location'      => $this->location,
            'category_id'   => $this->category_id,

            
            'reviews_avg_rating' => $this->when(
                isset($this->reviews_avg_rating),
                round((float) $this->reviews_avg_rating, 2),
                0.0
            ),
            'reviews_count' => (int) ($this->reviews_count ?? 0),

            
            'sold_status'   => $this->when(isset($this->sold_status), (bool) $this->sold_status),
            'created_at'    => optional($this->created_at)?->toIso8601String(),

           
            'reviews' => $this->whenLoaded('reviews', function () {
                return $this->reviews->map(function ($r) {
                    return [
                        'id'        => $r->id,
                        'rating'    => (int) $r->rating,
                        'comment'   => $r->comment,
                        'user_id'   => $r->user_id,
                        'created_at'=> optional($r->created_at)?->toIso8601String(),
                    ];
                });
            }),

            
            'category' => $this->whenLoaded('category', function () {
                return [
                    'id'   => $this->category->id,
                    'name' => $this->category->name ?? null,
                ];
            }),
        ];
    }
}
