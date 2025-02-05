"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MainNav } from "@/components/main-nav";
import { useState, useEffect } from "react";
import routes from "./routes";

export function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cartItems.length);
  }, []);

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={routes.home} className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-primary text-primary-foreground px-2 py-1 rounded">
              STORE
            </span>
          </Link>
          <div className="hidden md:flex flex-1 items-center justify-center px-2">
            <MainNav />
          </div>
          <div className="flex items-center space-x-4">
            <form className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8 w-[200px]" />
              </div>
            </form>
            <Link href={routes.wishlist}>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorites</span>
                
              </Button>
            </Link>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User account</span>
            </Button>
            <Link href={routes.cart}>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Shopping cart</span>
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
