<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryProductController extends Controller
{
    public function index(Category $category)
    {
        $products = $category->products;

        
        return response()->json([
            'data' => $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'title' => $product->title,
                    'description' => $product->description,
                    'price' => $product->price,
                    'image_url' => $product->image_url,
                ];
            })
        ]);
    }
}