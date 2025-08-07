import { NextResponse } from "next/server"

// Mock product data - in a real app, this would come from your database
const products = [
  {
    id: 1,
    name: "Organic Fertilizer",
    price: 25.99,
    description: "High-quality organic fertilizer for sustainable farming",
    category: "Agriculture",
    image: "/organic-fertilizer-mix.png",
  },
  {
    id: 2,
    name: "Solar Water Pump",
    price: 299.99,
    description: "Efficient solar-powered water pump for irrigation",
    category: "Equipment",
    image: "/solar-water-pump.png",
  },
  {
    id: 3,
    name: "Seed Starter Kit",
    price: 15.5,
    description: "Complete kit for starting vegetable seeds",
    category: "Agriculture",
    image: "/seed-starter-kit.png",
  },
  {
    id: 4,
    name: "First Aid Kit",
    price: 45.0,
    description: "Comprehensive first aid kit for rural communities",
    category: "Healthcare",
    image: "/first-aid-kit.png",
  },
  {
    id: 5,
    name: "Water Purification Tablets",
    price: 12.99,
    description: "Safe water purification tablets for clean drinking water",
    category: "Healthcare",
    image: "/water-purification-tablets.png",
  },
  {
    id: 6,
    name: "Portable Generator",
    price: 450.0,
    description: "Reliable portable generator for backup power",
    category: "Equipment",
    image: "/portable-generator.png",
  },
  {
    id: 7,
    name: "Livestock Feed",
    price: 35.75,
    description: "Nutritious feed for cattle and livestock",
    category: "Agriculture",
    image: "/livestock-feed.png",
  },
  {
    id: 8,
    name: "Solar Panel Kit",
    price: 199.99,
    description: "Basic solar panel kit for rural electrification",
    category: "Equipment",
    image: "/solar-panel-kit.png",
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
