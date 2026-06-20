<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
   
    public function index(Request $request, ?Category $category = null)
    {
        $query = Product::query()
            ->where('sold_status', false)
            
            ->withAvg('reviews', 'rating')
            ->withCount('reviews');

        
        if ($category) {
            $query->where('category_id', $category->id);
        }

        
        if ($s = $request->string('search')->toString()) {
            $query->where('title', 'like', "%{$s}%");
        }

        if ($loc = $request->string('location')->toString()) {
            $query->where('location', 'like', "%{$loc}%");
        }

        
        $sort = $request->string('sort')->toString();
        if (in_array($sort, ['asc', 'desc'], true)) {
            $query->orderBy('price', $sort);
        } else {
            $query->latest('id');
        }

        
        $query->with(['reviews' => function ($q) {
            $q->latest()->limit(3); 
        }]);

        $perPage  = (int) $request->input('per_page', 12);
        $products = $query->paginate($perPage)->appends($request->query());

        
        return ProductResource::collection($products)
            ->additional([
                'meta' => [
                    'current_page' => $products->currentPage(),
                    'last_page'    => $products->lastPage(),
                    'per_page'     => $products->perPage(),
                    'total'        => $products->total(),
                ],
                'links' => [
                    'first' => $products->url(1),
                    'last'  => $products->url($products->lastPage()),
                    'prev'  => $products->previousPageUrl(),
                    'next'  => $products->nextPageUrl(),
                ],
            ]);
    }

    public function show($id)
    {
        $product = Product::query()
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->with('reviews') 
            ->find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return new ProductResource($product);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'image_url'   => 'required|url',
            'location'    => 'nullable|string|max:255',
        ]);

        $validated['user_id']     = Auth::id();
        $validated['sold_status'] = false;

        $product = Product::create($validated);
        $product->loadAvg('reviews', 'rating')->loadCount('reviews');

        return (new ProductResource($product))
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validated = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'price'       => 'sometimes|required|numeric',
            'location'    => 'sometimes|nullable|string|max:255',
            'category_id' => 'sometimes|required|exists:categories,id',
            'image_url'   => 'sometimes|nullable|url',
            'sold_status' => 'sometimes|boolean',
        ]);

        $product->update($validated);
        $product->loadAvg('reviews', 'rating')->loadCount('reviews');

        return new ProductResource($product);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }
}
