"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeTest() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[200px]">
      <div className="text-sm font-medium mb-2 text-foreground">Theme Debug Panel</div>
      <div className="text-xs text-muted-foreground mb-2">Current: {theme}</div>

      <div className="mb-3 p-2 rounded border border-border">
        <div className="text-xs mb-1">Background Test:</div>
        <div className="w-full h-8 bg-background border border-border rounded mb-1"></div>
        <div className="w-full h-8 bg-muted border border-border rounded mb-1"></div>
        <div className="w-full h-8 bg-card border border-border rounded"></div>
      </div>

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => {
            console.log("Setting theme to light")
            setTheme("light")
          }}
          className="px-3 py-2 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
        >
          Light
        </button>
        <button
          onClick={() => {
            console.log("Setting theme to dark")
            setTheme("dark")
          }}
          className="px-3 py-2 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
        >
          Dark
        </button>
        <button
          onClick={() => {
            console.log("Setting theme to system")
            setTheme("system")
          }}
          className="px-3 py-2 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
        >
          System
        </button>
      </div>

      <div className="text-xs">
        <div className="mb-1">Color Swatches:</div>
        <div className="flex gap-1 mb-1">
          <div className="w-6 h-6 bg-background border border-border rounded" title="background"></div>
          <div className="w-6 h-6 bg-foreground border border-border rounded" title="foreground"></div>
          <div className="w-6 h-6 bg-primary border border-border rounded" title="primary"></div>
          <div className="w-6 h-6 bg-muted border border-border rounded" title="muted"></div>
        </div>
        <div className="text-foreground">Text: {theme === "light" ? "Should be dark" : "Should be light"}</div>
      </div>
    </div>
  )
}
