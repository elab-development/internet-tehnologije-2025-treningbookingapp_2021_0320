<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    public function purchaseHistory(Request $request)
    {
        $user = $request->user();

        $purchases = $user->purchases()->with('category')->get();

        return response()->json([
            'user' => $user,
            'purchased_products' => $purchases
        ]);
    }
}
