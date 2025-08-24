"use client"
import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AudioProvider } from "@/contexts/audio-context"
import { LanguageProvider } from "@/contexts/language-context"
import { SidebarProvider } from "@/contexts/sidebar-context"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { AudioPlayer } from "@/components/audio-player"
// <CHANGE> Added usePathname to detect landing page route
import { usePathname } from "next/navigation"

// <CHANGE> Moved metadata to a separate component since we're using "use client"
const metadata: Metadata = {
  title: "AudioCourse - Learn Through Audio",
  description: "Discover thousands of audio courses from expert teachers worldwide",
  generator: "v0.app",
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  // <CHANGE> Get current pathname to conditionally render sidebar
  const pathname = usePathname()
  const isLandingPage = pathname === "/landing"

  // <CHANGE> Render different layouts based on route
  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-200 ease-out">
        {children}
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AudioProvider>
        <div className="h-screen flex flex-col bg-background text-foreground transition-colors duration-200 ease-out">
          <Navbar />
          <div className="flex flex-1 overflow-hidden relative">
            <Sidebar />
            <main className="flex-1 overflow-y-auto pb-24 lg:ml-0">
              <div className="p-6">{children}</div>
            </main>
          </div>
          <AudioPlayer />
        </div>
      </AudioProvider>
    </SidebarProvider>
  )
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="audiocourse-theme"
    >
      <LanguageProvider>
        <LayoutContent>{children}</LayoutContent>
      </LanguageProvider>
    </ThemeProvider>
  )
}
