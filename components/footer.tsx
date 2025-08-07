import Link from "next/link"
import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-[#1f7a1f]" />
              <span className="text-xl font-bold">ADORE</span>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting rural communities with essential products and services. Empowering communities through
              accessible technology and reliable support.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#1f7a1f] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-300 hover:text-[#1f7a1f] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#products" className="text-gray-300 hover:text-[#1f7a1f] transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-[#1f7a1f] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300">24/7 Helpline</span>
              </li>
              <li>
                <span className="text-[#1f7a1f] font-medium">1-800-RURAL-HELP</span>
              </li>
              <li>
                <span className="text-gray-300">Email Support</span>
              </li>
              <li>
                <span className="text-[#1f7a1f] font-medium">support@adore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 ADORE Platform. All rights reserved. Built for rural communities.
          </p>
        </div>
      </div>
    </footer>
  )
}
