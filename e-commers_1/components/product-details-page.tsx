"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Heart, HeartOff } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  sizes?: string[];
  colors?: string[];
}

const mockSizes = {
  "women's clothing": ["XS", "S", "M", "L", "XL"],
  "men's clothing": ["S", "M", "L", "XL", "XXL"],
  "kids' clothing": ["2T", "3T", "4T", "5T", "6T"],
};

const mockColors = ["Red", "Blue", "Green", "Black", "White"];

export function ProductDetailsPage({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [showCartMessage, setShowCartMessage] = useState<boolean>(false);  // State for cart message visibility
  const [showWishlistMessage, setShowWishlistMessage] = useState<boolean>(false);  // State for wishlist message visibility
  const [cartCount, setCartCount] = useState<number>(0);  // State to track cart count
  const [addedToWishlist, setAddedToWishlist] = useState<boolean>(false);  // Track if product is added to wishlist

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        const category = data.category.toLowerCase();
        data.sizes = category.includes("clothing") ? mockSizes[category as keyof typeof mockSizes] || [] : [];
        data.colors = category.includes("clothing") ? mockColors : [];
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Add product to cart
  const addToCart = () => {
    if (!product) return;

    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      image: product.image,
    };

    const existingItemIndex = cartItems.findIndex((item: any) => item.id === newCartItem.id);
    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push(newCartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Update cart count in state
    setCartCount(cartItems.length);

    // Show success message
    setShowCartMessage(true);
    setTimeout(() => {
      setShowCartMessage(false);
    }, 3000); // Hide after 3 seconds
  };

  // Add product to wishlist
  const addToWishlist = () => {
    if (!product) return;

    const wishlistItems = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const newWishlistItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      image: product.image,
    };

    const existingItemIndex = wishlistItems.findIndex((item: any) => item.id === newWishlistItem.id);
    if (existingItemIndex < 0) {
      wishlistItems.push(newWishlistItem);
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));

      // Show success message
      setShowWishlistMessage(true);
      setAddedToWishlist(true); // Mark as added to wishlist
      setTimeout(() => {
        setShowWishlistMessage(false);
      }, 3000); // Hide after 3 seconds
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = () => {
    if (!product) return;

    const wishlistItems = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const updatedWishlist = wishlistItems.filter((item: any) => item.id !== product.id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // Show success message
    setShowWishlistMessage(true);
    setAddedToWishlist(false); // Mark as removed from wishlist
    setTimeout(() => {
      setShowWishlistMessage(false);
    }, 3000); // Hide after 3 seconds
  };

  useEffect(() => {
    // Update cart count when the component is mounted
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cartItems.length);
    
    // Check if product is already in the wishlist
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isProductInWishlist = wishlistItems.some((item: any) => item.id === productId);
    setAddedToWishlist(isProductInWishlist);
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {showCartMessage && (
        <div className="mb-4 p-4 bg-green-500 text-white rounded-md">
          Your product has been added to the cart!
        </div>
      )}
      {showWishlistMessage && (
        <div className="mb-4 p-4 bg-blue-500 text-white rounded-md">
          Your product has been {addedToWishlist ? "added to" : "removed from"} the wishlist!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="relative aspect-square w-full">
            <Image
              src={product?.image || "/placeholder.svg"}
              alt={product?.title || "Product"}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className={`w-5 h-5 ${index < Math.floor(product.rating.rate) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({product.rating.count} reviews)</span>
          </div>
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-6">{product.description}</p>

          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Size</h3>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Color</h3>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <div key={color}>
                      <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                      <Label
                        htmlFor={`color-${color}`}
                        className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="flex space-x-4">
            <Button onClick={addToCart} className="w-full flex items-center justify-center">
              <ShoppingCart className="mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={addedToWishlist ? removeFromWishlist : addToWishlist}
              className="w-full flex items-center justify-center"
            >
              {addedToWishlist ? <HeartOff className="mr-2" /> : <Heart className="mr-2" />}
              {addedToWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
