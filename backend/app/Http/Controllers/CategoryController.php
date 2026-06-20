<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\ProductCollection;

class CategoryController extends Controller
{
   public function index()
{
    $categories = Category::all();

    return response()->json([
        'data' => $categories
    ]);
}

    public function show($id)
    {
        $category = Category::find($id);
        if (is_null($category)) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json($category);
    }

    public function store(Request $request)
    {
        $category = Category::create($request->all());
        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if (is_null($category)) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        $category->update($request->all());
        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        if (is_null($category)) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        $category->delete();
        return response()->json(['message' => 'Category deleted']);
    }

   public function getProductsByCategory($id)
{
    $category = Category::find($id);
 
    if (!$category) {
        return response()->json(['message' => 'Category not found'], 404);
    }
 
   
    $products = $category->products()
        ->withAvg('reviews', 'rating')
        ->withCount('reviews')
        ->get();
 
    return new ProductCollection($products);
}

}
