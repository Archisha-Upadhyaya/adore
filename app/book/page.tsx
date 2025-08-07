"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Search, ShoppingCart, Star, Plus, Minus } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
  image: string
  rating?: number
}

interface CartItem extends Product {
  quantity: number
}

export default function BookPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      fetchProducts()
    }
  }, [user, loading, router])

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
      const productsWithRatings = data.map((product: Product) => ({
        ...product,
        rating: Math.floor(Math.random() * 2) + 4,
      }))
      setProducts(productsWithRatings)
      setFilteredProducts(productsWithRatings)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoadingProducts(false)
    }
  }

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleBookAll = async () => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add some products to your cart first",
        variant: "destructive",
      })
      return
    }

    setBookingLoading(true)

    try {
      // Book all items in cart
      const bookingPromises = cart.map((item) =>
        fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.id,
            productId: item.id,
            quantity: item.quantity,
          }),
        })
      )

      const responses = await Promise.all(bookingPromises)
      const allSuccessful = responses.every((response) => response.ok)

      if (allSuccessful) {
        toast({
          title: "Booking Successful",
          description: `Successfully booked ${cart.length} product(s)`,
        })
        setCart([])
        router.push("/dashboard")
      } else {
        throw new Error("Some bookings failed")
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Failed to complete your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center h-96 pt-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Book Products</h1>
          <p className="text-muted-foreground mt-2">Browse and book essential products for your rural community</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {loadingProducts ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading products...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="aspect-square bg-muted/50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg?height=200&width=200"}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-xl">{product.name}</CardTitle>
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
                      <p className="text-muted-foreground mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                        <Button
                          onClick={() => addToCart(product)}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found matching "{searchTerm}"</p>
              </div>
            )}
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  <span>Your Cart</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="border border-border rounded-lg p-3">
                        <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
                        <p className="text-primary font-semibold">${item.price.toFixed(2)}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-medium">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <span className="font-semibold text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-foreground">Total:</span>
                        <span className="font-bold text-primary text-lg">${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <Button
                        onClick={handleBookAll}
                        disabled={bookingLoading}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        {bookingLoading ? "Booking..." : "Book All Items"}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
