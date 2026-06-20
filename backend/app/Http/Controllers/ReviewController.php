<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\Product;

class ReviewController extends Controller
{
    public function store(Request $request, $productId)
    {
             if (!auth()->check()) {
    return response()->json(['message' => 'Not authenticated'], 401);
}

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review = Review::create([
            'product_id' => $productId,
            'user_id' => auth()->id(),
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);
        

        return response()->json($review, 201);
    }

    public function index($productId)
{
    $summary = \App\Models\Review::where('product_id', $productId)
        ->selectRaw('AVG(rating) as avg_rating, COUNT(*) as reviews_count')
        ->first();
 
    $histogram = \App\Models\Review::where('product_id', $productId)
        ->selectRaw('rating, COUNT(*) as count')
        ->groupBy('rating')
        ->orderByDesc('rating')
        ->pluck('count', 'rating');
 
    return response()->json([
        'average_rating' => round((float)($summary->avg_rating ?? 0), 2),
        'reviews_count'  => (int)($summary->reviews_count ?? 0),
        'histogram'      => $histogram, 
    ]);
}
}
