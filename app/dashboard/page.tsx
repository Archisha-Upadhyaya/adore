"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart, User, Package } from "lucide-react"

interface Booking {
  id: number
  product_name: string
  quantity: number
  price: number
  created_at: string
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loadingBookings, setLoadingBookings] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
  })

  const fetchBookings = useCallback(async () => {
    try {
      const response = await fetch(`/api/bookings?userId=${user?.id}`)
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoadingBookings(false)
    }
  }, [user?.id])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      setProfileData({
        name: user.name,
        phone: user.phone || "",
      })
      fetchBookings()
    }
  }, [user, loading, router, fetchBookings])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/user/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      })

      if (response.ok) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully",
        })
        setEditMode(false)
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      console.error("Profile update error:", error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
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
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground mt-2">Manage your account and view your bookings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-[#1f7a1f]" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="border-input focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="border-input focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Save
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setEditMode(false)}
                        className="border-input"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-foreground">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground">Name</label>
                      <p className="text-foreground">{user.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="text-foreground">{user.phone || "Not provided"}</p>
                    </div>
                    <Button onClick={() => setEditMode(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Edit Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Bookings Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5 text-[#1f7a1f]" />
                  <span>Your Bookings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingBookings ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-muted-foreground">Loading bookings...</p>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No bookings yet</p>
                    <p className="text-sm text-muted-foreground mt-2">Start browsing products to make your first booking</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-foreground">{booking.product_name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {booking.quantity} | Price: ${booking.price.toFixed(2)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Booked on: {new Date(booking.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary">
                              ${(booking.quantity * booking.price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="border-t border-border pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground">Total Bookings:</span>
                        <span className="font-bold text-primary text-lg">
                          ${bookings.reduce((total, booking) => total + booking.quantity * booking.price, 0).toFixed(2)}
                        </span>
                      </div>
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
