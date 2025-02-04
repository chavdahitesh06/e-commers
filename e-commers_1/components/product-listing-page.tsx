"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Star, Heart } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export function ProductListingPage({ category, subcategory }: { category: string; subcategory?: string }) {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState("popularity")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products")
        const data: Product[] = await response.json()
        let categoryProducts = data

        if (category !== "all") {
          categoryProducts = data.filter((product) => {
            if (category === "men") return product.category.includes("men's clothing")
            if (category === "women") return product.category.includes("women's clothing")
            // Note: Fake Store API doesn't have a kids category, so we'll simulate it
            if (category === "kids")
              return product.category.includes("men's clothing") || product.category.includes("women's clothing")
            return false
          })
        }

        if (subcategory) {
          categoryProducts = categoryProducts.filter((product) => {
            const productName = product.title.toLowerCase()
            const subcategoryName = subcategory.toLowerCase()
            return productName.includes(subcategoryName)
          })
        }

        setProducts(categoryProducts)
        setFilteredProducts(categoryProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [category, subcategory])

  const handleFilterChange = () => {
    const filtered = products.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
    setFilteredProducts(filtered)
    setCurrentPage(1)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    const sorted = [...filteredProducts]
    if (value === "price-low-high") {
      sorted.sort((a, b) => a.price - b.price)
    } else if (value === "price-high-low") {
      sorted.sort((a, b) => b.price - a.price)
    } else if (value === "rating") {
      sorted.sort((a, b) => b.rating.rate - a.rating.rate)
    }
    setFilteredProducts(sorted)
  }

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {subcategory ? `${category}'s ${subcategory}` : category === "all" ? "All Products" : `${category}'s Clothing`}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <Slider min={0} max={1000} step={10} value={priceRange} onValueChange={setPriceRange} />
                <div className="flex justify-between mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              <Button onClick={handleFilterChange}>Apply Filters</Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <p>{filteredProducts.length} products found</p>
            <Select onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Sort by Popularity</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="rating">Sort by Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer"
                onClick={() => router.push(`/product/${product.id}`)}
              >
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
                  <CardTitle className="text-lg truncate">{product.title}</CardTitle>
                  <CardDescription className="text-sm">${product.price.toFixed(2)}</CardDescription>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < Math.floor(product.rating.rate) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({product.rating.count})</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <Button variant="outline" size="sm">
                    Add to Cart
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Heart className="w-5 h-5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, i) => (
              <Button
                key={i}
                onClick={() => paginate(i + 1)}
                variant={currentPage === i + 1 ? "default" : "outline"}
                className="mx-1"
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

