"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, AlertCircle, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

const news = [
  {
    id: 1,
    title: "BREAKING: New Mobile Health Clinic Routes Announced",
    summary:
      "Expanded healthcare services now reaching 15 additional rural communities across the region with 24/7 emergency support.",
    date: "2024-01-15",
    category: "Healthcare",
    priority: "high",
    type: "breaking",
  },
  {
    id: 2,
    title: "URGENT: Agricultural Equipment Sharing Program Launches",
    summary: "Community-based equipment sharing initiative helps reduce costs for small-scale farmers by up to 60%.",
    date: "2024-01-10",
    category: "Agriculture",
    priority: "medium",
    type: "update",
  },
  {
    id: 3,
    title: "ALERT: High-Speed Internet Expansion Project Accelerated",
    summary:
      "Satellite internet infrastructure project to connect 50 remote villages by end of year, ahead of schedule.",
    date: "2024-01-05",
    category: "Technology",
    priority: "high",
    type: "alert",
  },
]

export function News() {
  const [currentIndex, setCurrentIndex] = useState(0)
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

    const element = document.getElementById("news-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "medium":
        return <TrendingUp className="h-4 w-4 text-yellow-500" />
      default:
        return <Calendar className="h-4 w-4 text-blue-500" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "breaking":
        return "BREAKING"
      case "alert":
        return "ALERT"
      default:
        return "UPDATE"
    }
  }

  return (
    <section id="news-section" className="py-20 bg-gradient-to-r from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">News & Updates</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed about the latest developments in rural community services
          </p>
        </div>

        {/* News Ticker */}
        <div className="mb-12">
          <div className="news-ticker rounded-lg p-4 mb-8 overflow-hidden">
            <div className="flex items-center space-x-4">
              <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold animate-pulse">LIVE</span>
              <div className="animate-ticker whitespace-nowrap text-white font-semibold">
                🚨 BREAKING: New Mobile Health Clinic Routes Announced • 📢 Agricultural Equipment Sharing Program
                Launches • ⚡ High-Speed Internet Expansion Project Accelerated • 🏥 24/7 Emergency Support Now
                Available •
              </div>
            </div>
          </div>
        </div>

        {/* Featured News Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <Card
              key={article.id}
              className={`hover-tilt border-l-4 ${
                article.priority === "high"
                  ? "border-l-red-500"
                  : article.priority === "medium"
                    ? "border-l-yellow-500"
                    : "border-l-blue-500"
              } bg-card/50 backdrop-blur-sm transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getPriorityIcon(article.priority)}
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {getTypeLabel(article.type)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-3 leading-tight text-foreground">{article.title}</h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">{article.summary}</p>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      article.category === "Healthcare"
                        ? "bg-red-500/10 text-red-500"
                        : article.category === "Agriculture"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-blue-500/10 text-blue-500"
                    }`}
                  >
                    {article.category}
                  </span>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                    Read More →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* News Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {news.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-primary scale-125" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
