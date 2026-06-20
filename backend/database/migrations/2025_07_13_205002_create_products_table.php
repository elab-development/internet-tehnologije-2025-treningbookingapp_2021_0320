<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->string('location')->nullable();
            $table->string('image_url')->nullable();
            
            // Kolona za strani ključ koja povezuje proizvode sa korisnicima
            $table->unsignedBigInteger('user_id'); 
            
            // Kolona za strani ključ koja povezuje proizvode sa kategorijama
            $table->unsignedBigInteger('category_id'); 

            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            // Definisanje veza (foreign keys)
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};