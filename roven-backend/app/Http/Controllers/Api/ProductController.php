<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of products
     */
    public function index()
    {
        $products = Product::with('category')->paginate(10);

        return response()->json([
            'status' => 'success',
            'data' => $products,
        ]);
    }

    /**
     * Store a newly created product
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,category_id',
            'name' => 'required|max:255',
            'brand' => 'required|max:255',
            'description' => 'required',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10000',
        ]);

        if ($request->hasFile('image_url')) {
            // Simpan file dengan nama asli ke folder 'products'
            $originalFileName = $request->file('image_url')->getClientOriginalName();
            $imagePath = $request->file('image_url')->storeAs('products', $originalFileName, 'public');

            // Buat URL dengan basis 127.0.0.1
            $imageUrl = 'http://127.0.0.1:8000/storage/' . $imagePath;
        } else {
            $imageUrl = null;
        }

        $product = Product::create([
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'brand' => $validated['brand'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'image_url' => $imageUrl,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Product created successfully',
            'data' => $product
        ], 201);
    }

    /**
     * Display the specified product
     */
    public function show(Product $product)
    {
        $product->load('category');

        return response()->json([
            'status' => 'success',
            'data' => $product
        ]);
    }

    /**
     * Update the specified product
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,category_id',
            'name' => 'required|max:255',
            'brand' => 'required|max:255',
            'description' => 'required',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10000',
        ]);

        if ($request->hasFile('image_url')) {
            // Simpan file dengan nama asli ke folder 'products'
            $originalFileName = $request->file('image_url')->getClientOriginalName();
            $imagePath = $request->file('image_url')->storeAs('products', $originalFileName, 'public');

            // Buat URL dengan basis 127.0.0.1
            $imageUrl = 'http://localhost:8000/storage/' . $imagePath;
        } else {
            $imageUrl = $product->image_url; // Gunakan URL lama jika tidak ada file baru
        }

        $product->update([
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'brand' => $validated['brand'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'image_url' => $imageUrl,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Product updated successfully',
            'data' => $product
        ], 200);
    }

    /**
     * Remove the specified product
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Product deleted successfully'
        ]);
    }
}