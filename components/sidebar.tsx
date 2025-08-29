"use client"

import { Home, List, Grid3X3, GraduationCap, Library, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useSidebar } from "@/contexts/sidebar-context"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { isOpen, close } = useSidebar()

  const sidebarItems = [
    { icon: Home, label: t("nav.home"), href: "/" },
    { icon: List, label: t("nav.playlists"), href: "/playlists" },
    { icon: Grid3X3, label: t("nav.categories"), href: "/categories" },
    { icon: GraduationCap, label: t("nav.teachers"), href: "/teachers" },
    { icon: Library, label: t("nav.library"), href: "/library" },
    { icon: Settings, label: t("nav.settings"), href: "/settings" },
  ]

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      // Only close on mobile
      close()
    }
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={close} />}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border flex flex-col transition-transform duration-200 ease-out lg:relative lg:translate-x-0 lg:bg-background/95 lg:backdrop-blur-sm",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between p-4 lg:hidden border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">{t("nav.menu")}</h2>
          <Button variant="ghost" size="sm" onClick={close} className="text-foreground hover:bg-accent">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

              return (
                <Link key={item.href} href={item.href} onClick={handleLinkClick}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-12 text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer",
                      isActive && "bg-[#1DB954] text-white hover:bg-[#1DB954]/90 hover:text-white",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </div>
        </nav>
      </aside>
    </>
  )
}
