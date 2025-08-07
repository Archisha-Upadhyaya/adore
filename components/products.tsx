"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
  image: string
  rating?: number
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }, [products, searchTerm])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      // Add ratings to products
      const productsWithRatings = data.map((product: Product) => ({
        ...product,
        rating: Math.floor(Math.random() * 2) + 4, // Random rating between 4-5
      }))
      setProducts(productsWithRatings)
      setFilteredProducts(productsWithRatings)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="products" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Available <span className="gradient-text">Products</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Essential products delivered directly to your rural community
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 hover-glow bg-card/50 backdrop-blur-sm border-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="hover-tilt group bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50"
            >
              <CardHeader className="pb-4">
                <div className="aspect-square bg-muted/50 rounded-lg mb-4 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={product.image || "/placeholder.svg?height=200&width=200"}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < (product.rating || 0) ? "text-yellow-400 fill-current" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-primary uppercase tracking-wide font-medium">{product.category}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors duration-300">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold gradient-text">${product.price.toFixed(2)}</span>
                  <Link href="/book">
                    <Button className="hover-glow bg-primary hover:bg-primary/90 text-primary-foreground group-hover:scale-105 transition-all duration-300">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </section>
  )
}
