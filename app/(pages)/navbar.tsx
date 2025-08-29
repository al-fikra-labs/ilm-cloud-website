"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Headphones, Menu } from "lucide-react"

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/landing" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-[#1DB954] rounded-lg flex items-center justify-center">
                                <Headphones className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-foreground">AudioCourse</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                            About
                        </Link>
                        <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                            Courses
                        </Link>
                        <Link href="/teachers" className="text-muted-foreground hover:text-foreground transition-colors">
                            Teachers
                        </Link>
                        <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                            Login
                        </Link>
                        <Button asChild className="bg-[#1DB954] hover:bg-[#1DB954]/90">
                            <Link href="/signup">Get Started</Link>
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-border bg-background">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link
                                href="/about"
                                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                href="/categories"
                                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Courses
                            </Link>
                            <Link
                                href="/teachers"
                                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Teachers
                            </Link>
                            <Link
                                href="/login"
                                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Login
                            </Link>
                            <div className="px-3 py-2">
                                <Button asChild className="w-full bg-[#1DB954] hover:bg-[#1DB954]/90">
                                    <Link href="/signup">Get Started</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}