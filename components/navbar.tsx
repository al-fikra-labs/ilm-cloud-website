"use client"

import type React from "react"
import { Search, Globe, User, Menu, Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"
import { useSidebar } from "@/contexts/sidebar-context"

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { toggle } = useSidebar()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const getThemeIcon = () => {
    if (!mounted) return <Monitor className="w-4 h-4" />
    switch (theme) {
      case "light":
        return <Sun className="w-4 h-4" />
      case "dark":
        return <Moon className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
  }

  if (!mounted) {
    return (
      <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">AC</span>
          </div>
          <h1 className="text-xl font-bold hidden sm:block">AudioCourse</h1>
        </div>
        <div className="flex-1 max-w-md mx-4 sm:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search..." className="pl-10 bg-muted/50" />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="sm">
            <Monitor className="w-4 h-4" />
          </Button>
        </div>
      </header>
    )
  }

  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
      {/* Logo and Mobile Menu */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="lg:hidden" onClick={toggle}>
          <Menu className="w-5 h-5" />
        </Button>
        <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">AC</span>
        </div>
        <h1 className="text-xl font-bold hidden sm:block">AudioCourse</h1>
        <h1 className="text-lg font-bold sm:hidden">AC</h1>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-4 sm:mx-8">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={t("nav.search.placeholder")}
            className="pl-10 bg-muted/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              {getThemeIcon()}
              <span className="hidden sm:inline capitalize">{resolvedTheme || theme || "system"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleThemeChange("light")} className="gap-2">
              <Sun className="w-4 h-4" />
              {t("nav.theme.light")}
              {(resolvedTheme === "light" || theme === "light") && " ✓"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange("dark")} className="gap-2">
              <Moon className="w-4 h-4" />
              {t("nav.theme.dark")}
              {(resolvedTheme === "dark" || theme === "dark") && " ✓"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange("system")} className="gap-2">
              <Monitor className="w-4 h-4" />
              {t("nav.theme.system")}
              {theme === "system" && " ✓"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Language Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{language.toUpperCase()}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("ml")}>മലയാളം</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src="/placeholder.svg?height=24&width=24" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <User className="w-4 h-4 hidden sm:inline" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{t("nav.profile")}</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>{t("nav.signout")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
