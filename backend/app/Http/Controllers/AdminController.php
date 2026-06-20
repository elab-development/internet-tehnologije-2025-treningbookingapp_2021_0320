<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
    
    private function authorizeAdmin()
    {
        $user = auth()->user();
        if (!$user || !$user->hasRole('admin')) { 
            return response()->json(['message' => 'Niste autorizovani kao administrator.'], 403);
        }
        return null;
    }

    public function getAllUsers()
    {
        if ($resp = $this->authorizeAdmin()) return $resp;

        try {
            $users = User::with('products')->get();
            
            return UserResource::collection($users);
        } catch (\Exception $e) {
            Log::error("Greška u AdminController@getAllUsers: " . $e->getMessage());
            return response()->json(['message' => 'Greška na serveru (SQL problem).'], 500);
        }
    }

    public function getUserDetails($id)
    {
        if ($resp = $this->authorizeAdmin()) return $resp;

        $user = User::with('products')->find($id); 
        if (!$user) {
            return response()->json(['message' => 'Korisnik nije pronađen.'], 404);
        }

        
        return new UserResource($user);
    }

    public function destroyProduct($id)
    {
        if ($resp = $this->authorizeAdmin()) return $resp;

        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Proizvod nije pronađen.'], 404);
        }

        $product->delete();
        return response()->json(['message' => 'Proizvod je uspešno obrisan.']);
    }
}