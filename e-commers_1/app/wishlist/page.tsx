"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  // Fetch wishlist items from localStorage
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistItems(items);
  }, []);

  // Remove item from the wishlist
  const removeFromWishlist = (id: number) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Move item to the cart
  const moveToCart = (item: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...cart, { ...item, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    removeFromWishlist(item.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <div>Your wishlist is empty!</div>
      ) : (
        <div className="grid gap-4">
          {wishlistItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-contain rounded"
                    />
                  </div>
                  <div>
                    <CardTitle>{item.title}</CardTitle>
                    <div>Size: {item.size}</div>
                    <div>Color: {item.color}</div>
                    <div className="text-sm text-gray-500">
                      Price: ${item.price.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {/* Remove from wishlist button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  {/* Move to Cart button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveToCart(item)}
                  >
                    <ShoppingCart className="w-4 h-4" /> Move to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <div className="mt-6 text-center">
        {/* Link to continue shopping */}
        <Link href="/shop">
          <Button variant="secondary">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
