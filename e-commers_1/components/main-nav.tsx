"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import routes from "./routes";
///
// routes and list can connect to this
////
const categories = [
  {
    title: "Men",
    href: routes.category.men,
    subcategories: [
      { title: "T-Shirts", href: `${routes.category.men}/t-shirts` },
      { title: "Shirts", href: `${routes.category.men}/shirts` },
      { title: "Jeans", href: `${routes.category.men}/jeans` },
      { title: "Jackets", href: `${routes.category.men}/jackets` },
      { title: "Trousers", href: `${routes.category.men}/trousers` },
      { title: "Accessories", href: `${routes.category.men}/accessories` },
    ],
  },
  {
    title: "Women",
    href: routes.category.women,
    subcategories: [
      { title: "Dresses", href: `${routes.category.women}/dresses` },
      { title: "Tops", href: `${routes.category.women}/tops` },
      { title: "Skirts", href: `${routes.category.women}/skirts` },
      { title: "Jeans", href: `${routes.category.women}/jeans` },
      { title: "Jackets", href: `${routes.category.women}/jackets` },
      { title: "Accessories", href: `${routes.category.women}/accessories` },
    ],
  },
  {
    title: "Kids",
    href: routes.category.kids,
    subcategories: [
      { title: "T-Shirts", href: `${routes.category.kids}/t-shirts` },
      { title: "Jeans", href: `${routes.category.kids}/jeans` },
      { title: "Dresses", href: `${routes.category.kids}/dresses` },
      { title: "Shoes", href: `${routes.category.kids}/shoes` },
      { title: "Accessories", href: `${routes.category.kids}/accessories` },
    ],
  },
]

export function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href={routes.home} legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              )}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {categories.map((category) => (
          <NavigationMenuItem key={category.title}>
            <NavigationMenuTrigger>{category.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.title}>
                    <NavigationMenuLink asChild>
                      <a
                        href={subcategory.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          {subcategory.title}
                        </div>
                      </a>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <Link href={routes.about} legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              )}
            >
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={routes.contact} legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              )}
            >
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
