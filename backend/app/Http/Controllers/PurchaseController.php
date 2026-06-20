<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProductResource;

class PurchaseController extends Controller
{
    
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $product = Product::find($request->product_id);
        $user = Auth::user();

        
        if (!$product) {
            return response()->json(['message' => 'Proizvod nije pronađen.'], 404);
        }

        
        if ($product->sold_status) {
            return response()->json(['message' => 'Proizvod je već prodat.'], 409);
        }

        
        $user->purchases()->attach($product->id, ['purchased_at' => now()]); 

        
        $product->sold_status = true;
        $product->save();

        return response()->json([
            'message' => 'Kupovina je uspešno obavljena.',
        ], 201);
    }

    
    public function getActivities()
    {
        $user = Auth::user();

        $purchases = $user->purchases()->with('category')->get();

        return response()->json([
            'purchases' => ProductResource::collection($purchases),
            'sales' => [], 
        ]);
    }
}