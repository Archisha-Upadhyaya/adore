"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Stethoscope, GraduationCap, Wrench, Wifi } from "lucide-react"
import { useEffect, useState } from "react"

const services = [
  {
    id: 1,
    name: "Transportation Services",
    description: "Reliable transport for people and goods to and from rural areas",
    icon: Truck,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    name: "Healthcare Access",
    description: "Mobile clinics and telemedicine services for remote communities",
    icon: Stethoscope,
    color: "from-red-500 to-red-600",
  },
  {
    id: 3,
    name: "Education Support",
    description: "Online learning resources and educational material delivery",
    icon: GraduationCap,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 4,
    name: "Equipment Repair",
    description: "On-site repair services for farming and household equipment",
    icon: Wrench,
    color: "from-orange-500 to-orange-600",
  },
  {
    id: 5,
    name: "Internet Connectivity",
    description: "Satellite internet installation and technical support",
    icon: Wifi,
    color: "from-green-500 to-green-600",
  },
]

export function Services() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("services-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div id="services-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive services designed to support and empower rural communities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className={`hover-tilt group bg-card/50 backdrop-blur-sm border-l-4 border-l-primary hover:border-l-primary/80 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-4 rounded-xl bg-gradient-to-br ${service.color} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {service.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
