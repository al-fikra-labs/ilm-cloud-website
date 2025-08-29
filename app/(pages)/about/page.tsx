"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { BookOpen, Users, Headphones, Star, Globe, Shield } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const { t } = useLanguage()

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Islamic Education",
      description:
        "Access a vast library of authentic Islamic courses covering Aqeeda, Fiqh, Arabic, Hadees, Tafseer, and Seerah from qualified scholars.",
    },
    {
      icon: Headphones,
      title: "High-Quality Audio Content",
      description:
        "Enjoy crystal-clear audio lectures optimized for learning, with adjustable playback speeds and offline download capabilities.",
    },
    {
      icon: Users,
      title: "Expert Scholars",
      description:
        "Learn from renowned Islamic scholars and teachers who bring years of knowledge and authentic understanding to every lesson.",
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description:
        "Access content in multiple languages including English and Malayalam, making Islamic knowledge accessible to diverse communities.",
    },
    {
      icon: Star,
      title: "Structured Learning Paths",
      description:
        "Follow carefully designed curricula that take you from beginner to advanced levels in various Islamic sciences.",
    },
    {
      icon: Shield,
      title: "Authentic Sources",
      description:
        "All content is based on authentic Islamic sources, ensuring you receive accurate and reliable religious education.",
    },
  ]

  const testimonials = [
    {
      name: "Ahmad Hassan",
      role: "Student",
      content:
        "AudioCourse has transformed my Islamic learning journey. The quality of content and ease of access is unmatched.",
      rating: 5,
    },
    {
      name: "Fatima Al-Zahra",
      role: "Working Professional",
      content:
        "Being able to listen to authentic Islamic lectures during my commute has been a blessing. Highly recommended!",
      rating: 5,
    },
    {
      name: "Muhammad Ibrahim",
      role: "University Student",
      content:
        "The structured approach and expert teachers make complex Islamic concepts easy to understand and apply.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-muted/50 to-background py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            Islamic Audio Learning Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            About <span className="text-[#1DB954]">AudioCourse</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Empowering Muslims worldwide with authentic Islamic knowledge through high-quality audio content and expert
            scholarship.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            To make authentic Islamic education accessible to every Muslim, regardless of their location or schedule. We
            believe that knowledge is the foundation of faith, and through AudioCourse, we strive to connect learners
            with qualified scholars who can guide them on their spiritual and educational journey.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose AudioCourse?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the features that make AudioCourse the premier destination for Islamic audio education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-[#1DB954]/10 mr-4">
                      <feature.icon className="h-6 w-6 text-[#1DB954]" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Learn Anytime, Anywhere</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Whether you're commuting, exercising, or relaxing at home, AudioCourse fits seamlessly into your lifestyle.
            Our mobile-optimized platform ensures you never miss an opportunity to grow in your Islamic knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#1DB954] hover:bg-[#1DB954]/90">
              <Link href="/signup">Start Learning Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/teachers">Meet Our Scholars</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Students Say</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied learners who have transformed their Islamic knowledge with AudioCourse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-[#1DB954] fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#1DB954]/10 via-background to-[#1DB954]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of learners and start your Islamic education journey today. Access hundreds of hours of
            authentic content from qualified scholars.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#1DB954] hover:bg-[#1DB954]/90">
              <Link href="/signup">Create Free Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
