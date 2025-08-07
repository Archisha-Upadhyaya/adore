"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Leaf } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const success = await login(formData.email, formData.password)

    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      })
      router.push("/dashboard")
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
            <Leaf className="h-12 w-12 text-[#1f7a1f]" />
            <span className="text-2xl font-bold text-black">ADORE</span>
          </Link>
          <h2 className="text-3xl font-bold text-black">Sign in to your account</h2>
          <p className="mt-2 text-gray-600">
            Or{" "}
            <Link href="/signup" className="text-[#1f7a1f] hover:underline">
              create a new account
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-[#1f7a1f] focus:ring-[#1f7a1f]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-[#1f7a1f] focus:ring-[#1f7a1f]"
                  placeholder="Enter your password"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1f7a1f] hover:bg-[#1f7a1f]/90 text-white py-3"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Demo credentials: admin@rural.com / password123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
