import { NextResponse } from "next/server"

const services = [
  {
    id: 1,
    name: "Transportation Services",
    description: "Reliable transport for people and goods to and from rural areas",
    category: "Transport",
  },
  {
    id: 2,
    name: "Healthcare Access",
    description: "Mobile clinics and telemedicine services for remote communities",
    category: "Healthcare",
  },
  {
    id: 3,
    name: "Education Support",
    description: "Online learning resources and educational material delivery",
    category: "Education",
  },
  {
    id: 4,
    name: "Equipment Repair",
    description: "On-site repair services for farming and household equipment",
    category: "Maintenance",
  },
  {
    id: 5,
    name: "Internet Connectivity",
    description: "Satellite internet installation and technical support",
    category: "Technology",
  },
]

export async function GET() {
  try {
    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}
