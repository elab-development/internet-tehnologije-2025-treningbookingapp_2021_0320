<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\DB;


class DatabaseSeeder extends Seeder
{
    public function run()
    {
         DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        Product::truncate();
        Category::truncate();
        User::truncate();

        $user = User::factory()->create([
            'username' => 'testuser',
            'email' => 'test@example.com',
            'password' => bcrypt('lozinka'),
        ]);

        $cat1 = Category::create([
            'name' => 'Elektronika',
            'slug' => 'elektronika',
        ]);

        $cat2 = Category::create([
            'name' => 'Sport',
            'slug' => 'sport',
        ]);

        $cat3 = Category::create([
            'name' => 'Nameštaj',
            'slug' => 'namestaj',
        ]);

        Product::create([
            'title' => 'Polovni telefon',
            'description' => 'Samsung Galaxy S9, dobar telefon.',
            'price' => 15000,
            'location' => 'Beograd',
            'image_url' => 'https://example.com/telefon.jpg',
            'user_id' => $user->id,
            'category_id' => $cat1->id,
            'published_at' => now(),
        ]);

        Product::create([
            'title' => 'Sportska oprema',
            'description' => 'Set bučica i prostirka.',
            'price' => 5000,
            'location' => 'Novi Sad',
            'image_url' => 'https://example.com/sport.jpg',
            'user_id' => $user->id,
            'category_id' => $cat2->id,
            'published_at' => now(),
        ]);

        Product::create([
            'title' => 'Sto i stolica',
            'description' => 'Radni sto i ergonomska stolica.',
            'price' => 12000,
            'location' => 'Niš',
            'image_url' => 'https://example.com/namestaj.jpg',
            'user_id' => $user->id,
            'category_id' => $cat3->id,
            'published_at' => now(),
        ]);
         DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
