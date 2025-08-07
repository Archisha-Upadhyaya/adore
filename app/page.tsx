import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Products } from "@/components/products"
import { News } from "@/components/news"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Services />
      <Products />
      <News />
      <Contact />
      <Footer />
    </div>
  )
}
