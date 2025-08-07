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

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    const success = await signup(formData.name, formData.email, formData.password, formData.phone)

    if (success) {
      toast({
        title: "Account Created",
        description: "Welcome to ADORE!",
      })
      router.push("/dashboard")
    } else {
      toast({
        title: "Signup Failed",
        description: "Failed to create account. Please try again.",
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
          <h2 className="text-3xl font-bold text-black">Create your account</h2>
          <p className="mt-2 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1f7a1f] hover:underline">
              Sign in here
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-[#1f7a1f] focus:ring-[#1f7a1f]"
                  placeholder="Enter your full name"
                />
              </div>

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
                <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                  Phone Number (Optional)
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-[#1f7a1f] focus:ring-[#1f7a1f]"
                  placeholder="Enter your phone number"
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
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-2">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-[#1f7a1f] focus:ring-[#1f7a1f]"
                  placeholder="Confirm your password"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1f7a1f] hover:bg-[#1f7a1f]/90 text-white py-3"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
