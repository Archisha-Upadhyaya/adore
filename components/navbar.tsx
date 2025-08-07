"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Leaf, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { useTheme } from "@/components/theme-provider"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Leaf className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-xl font-bold gradient-text">ADORE</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="relative text-foreground hover:text-primary transition-colors group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/#services" className="relative text-foreground hover:text-primary transition-colors group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/#products" className="relative text-foreground hover:text-primary transition-colors group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/#contact" className="relative text-foreground hover:text-primary transition-colors group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>

            <Button onClick={toggleTheme} variant="ghost" size="icon" className="hover-glow rounded-full">
              {theme === "dark" ? (
                <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-180" />
              ) : (
                <Moon className="h-5 w-5 transition-transform duration-300 hover:-rotate-12" />
              )}
            </Button>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/book">
                  <Button variant="outline" className="hover-glow border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                    Book Products
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="hover-tilt bg-primary hover:bg-primary/90 text-primary-foreground">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="hover-glow border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="hover-glow border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="hover-tilt bg-primary hover:bg-primary/90 text-primary-foreground">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button onClick={toggleTheme} variant="ghost" size="icon" className="hover-glow rounded-full">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground hover:text-primary transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in-up">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-md border border-border/50 rounded-lg mt-2">
              <Link href="/" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="#services" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Services
              </Link>
              <Link href="#products" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Products
              </Link>
              <Link href="#contact" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Contact
              </Link>

              {user ? (
                <div className="px-3 py-2 space-y-2">
                  <Link href="/book">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                      Book Products
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Dashboard</Button>
                  </Link>
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
