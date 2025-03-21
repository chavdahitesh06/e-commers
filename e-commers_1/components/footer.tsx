import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import routes from "@/components/routes";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Shop</h3>
                <ul className="mt-4 space-y-4">
                  {[
                    { name: "Men", path: routes.category.men },
                    { name: "Women", path: routes.category.women},
                    { name: "Kids", path: routes.category.kids },
                    
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.path} className="text-base hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  {[
                    { name: "FAQ", path: routes.faq },
                    { name: "Shipping", path: routes.shipping },
                    { name: "Returns", path: routes.returns },
                    { name: "Contact", path: routes.contact },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.path} className="text-base hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  {[
                    { name: "About", path: routes.about },
                    { name: "Blog", path: routes.blog },
                    { name: "Careers", path: routes.careers },
                    { name: "Press", path: routes.press },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.path} className="text-base hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  {[
                    { name: "Privacy", path: routes.privacy },
                    { name: "Terms", path: routes.terms },
                    { name: "Cookies", path: routes.cookies },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.path} className="text-base hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Subscribe to our newsletter</h3>
            <p className="mt-4 text-base text-gray-300">Get the latest updates, sales & offers.</p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <Input
                type="email"
                id="email-address"
                autoComplete="email"
                required
                className="w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {[
              { name: "Facebook", icon: Facebook, href: "#" },
              { name: "Instagram", icon: Instagram, href: "#" },
              { name: "Twitter", icon: Twitter, href: "#" },
            ].map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">&copy; 2023 Your Store Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
