"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { Play, Users, BookOpen, Clock, Star, ArrowRight, Headphones, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function LandingPage() {

  const valueProps = [
    {
      icon: Clock,
      title: "Learn Anytime, Anywhere",
      description:
        "Access authentic Islamic education on your schedule, whether commuting, exercising, or relaxing at home.",
    },
    {
      icon: Users,
      title: "Expert Scholars",
      description: "Learn from qualified Islamic scholars with years of experience in traditional Islamic sciences.",
    },
    {
      icon: Headphones,
      title: "Premium Audio Quality",
      description: "Crystal-clear audio content optimized for learning with adjustable speeds and offline downloads.",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Active Learners" },
    { number: "500+", label: "Audio Courses" },
    { number: "50+", label: "Expert Teachers" },
    { number: "4.9/5", label: "Average Rating" },
  ]

  const testimonials = [
    {
      name: "Ahmad Hassan",
      role: "Software Engineer",
      content:
        "AudioCourse has transformed my daily commute into valuable learning time. The quality of content is exceptional.",
      rating: 5,
      avatar: "/muslim-man-profile.png",
    },
    {
      name: "Fatima Al-Zahra",
      role: "Medical Student",
      content:
        "As a busy student, AudioCourse fits perfectly into my schedule. I can learn authentic Islamic knowledge anywhere.",
      rating: 5,
      avatar: "/muslim-woman-profile.png",
    },
    {
      name: "Muhammad Ibrahim",
      role: "Business Owner",
      content:
        "The structured approach and expert teachers make complex topics easy to understand. Highly recommended!",
      rating: 5,
      avatar: "/muslim-businessman.png",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-muted/30 to-background py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/islamic-geometric-pattern.png')] opacity-5"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-6 text-sm font-medium">
              🎧 Premium Islamic Audio Learning
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Master Islamic Knowledge
              <br />
              <span className="text-[#1DB954]">Through Audio</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Access authentic Islamic education from qualified scholars. Learn Aqeeda, Fiqh, Arabic, and more through
              high-quality audio content designed for modern learners.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-[#1DB954] hover:bg-[#1DB954]/90 text-white px-8 py-6 text-lg">
                <Link href="/signup" className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Start Learning Free
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg bg-transparent">
                <Link href="/" className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Explore Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#1DB954] mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose AudioCourse?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of Islamic education with our innovative audio-first approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1DB954]/10 mb-6">
                    <prop.icon className="h-8 w-8 text-[#1DB954]" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{prop.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{prop.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Loved by Students Worldwide</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied learners who have transformed their Islamic knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-[#1DB954] fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#1DB954]/5 via-background to-[#1DB954]/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Islamic Learning?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community today and access hundreds of hours of authentic Islamic content from qualified scholars.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#1DB954] hover:bg-[#1DB954]/90 text-white px-8 py-6 text-lg">
              <Link href="/signup" className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Start Free Trial
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg bg-transparent">
              <Link href="/about" className="flex items-center gap-2">
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
