import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { userId, productId, quantity } = await request.json()

    if (!userId || !productId || !quantity) {
      return NextResponse.json({ error: "User ID, product ID, and quantity are required" }, { status: 400 })
    }

    // Get product details
    const products = [
      { id: 1, name: "Organic Fertilizer", price: 25.99 },
      { id: 2, name: "Solar Water Pump", price: 299.99 },
      { id: 3, name: "Seed Starter Kit", price: 15.5 },
      { id: 4, name: "First Aid Kit", price: 45.0 },
      { id: 5, name: "Water Purification Tablets", price: 12.99 },
      { id: 6, name: "Portable Generator", price: 450.0 },
      { id: 7, name: "Livestock Feed", price: 35.75 },
      { id: 8, name: "Solar Panel Kit", price: 199.99 },
    ]

    const product = products.find((p) => p.id === productId)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const { error } = await supabase.from("bookings").insert([
      {
        user_id: userId,
        product_id: productId,
        product_name: product.name,
        quantity,
        price: product.price,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
    }

    return NextResponse.json({ message: "Booking created successfully" })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
    }

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
