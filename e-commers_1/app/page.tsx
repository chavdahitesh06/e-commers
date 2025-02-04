"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import TopDealsSlider from "@/components/TopDealsSlider";

async function getFeaturedProducts() {
  const response = await fetch("https://fakestoreapi.com/products?limit=8");
  const data = await response.json();
  return data;
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [wishlistMessage, setWishlistMessage] = useState<string | null>(null);

  // Fetch featured products
  useEffect(() => {
    async function fetchData() {
      const data = await getFeaturedProducts();
      setFeaturedProducts(data);
    }
    fetchData();

    const wishlistData = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(wishlistData);
  }, []);

  // Add or Remove item from Wishlist
  const handleWishlist = (product: any) => {
    const updatedWishlist = [...wishlist];
    const productInWishlist = updatedWishlist.find(
      (item) => item.id === product.id
    );

    if (productInWishlist) {
      const filteredWishlist = updatedWishlist.filter(
        (item) => item.id !== product.id
      );
      setWishlist(filteredWishlist);
      localStorage.setItem("wishlist", JSON.stringify(filteredWishlist));
      setWishlistMessage(`Removed ${product.title} from wishlist.`);
    } else {
      updatedWishlist.push(product);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setWishlistMessage(`Added ${product.title} to wishlist.`);
    }

    // Clear the message after 3 seconds
    setTimeout(() => {
      setWishlistMessage(null);
    }, 3000);
  };

  // Check if product is in wishlist
  const isProductInWishlist = (id: number) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[600px] w-full">
        <Image
          src="/web/public/2X_Desktop-HERO-KV-3000x1200._CB551958550_.jpg" // Replace this with the actual image path
          alt="Hero Banner"
          width={1200}
          height={600}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col items-start justify-center text-white px-8 md:px-16">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">
            Summer Collection
          </h1>
          <p className="text-2xl mb-8 animate-fade-in-up animation-delay-200">
            Discover the hottest trends
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="animate-fade-in-up animation-delay-400"
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Top Deals Slider */}
      <section>
        <TopDealsSlider />
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="relative group cursor-pointer overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <Link href={`/product/${product.id}`}>
                <CardHeader className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg truncate">
                    {product.title}
                  </CardTitle>
                  <div className="text-sm">${product.price.toFixed(2)}</div>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < Math.floor(product.rating.rate)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.rating.count})
                    </span>
                  </div>
                </CardContent>
              </Link>
              <CardFooter className="absolute bottom-0 left-0 right-0 bg-white p-4 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center">
                <Link href={`/product/${product.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleWishlist(product)}
                  className={
                    isProductInWishlist(product.id)
                      ? "text-red-500 fill-current"
                      : "text-gray-500"
                  }
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Wishlist Message */}
      {wishlistMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md">
          <p>{wishlistMessage}</p>
        </div>
      )}

      {/* Category Showcase */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Men's Clothing",
              image: "/placeholder.svg",
              href: "/category/men",
            },
            {
              title: "Women's Clothing",
              image: "/placeholder.svg",
              href: "/category/women",
            },
            {
              title: "Kids' Clothing",
              image: "/placeholder.svg",
              href: "/category/kids",
            },
          ].map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                width={300}
                height={400}
                className="object-cover w-full h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-6">
                <h3 className="text-white text-2xl font-bold group-hover:underline">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">
            Subscribe to our newsletter for exclusive offers and the latest
            trends.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-md text-gray-900 w-full sm:w-auto"
            />
            <Button type="submit" variant="secondary">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
