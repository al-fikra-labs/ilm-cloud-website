import type React from "react"
import { AudioProvider } from "@/contexts/audio-context"
import { SidebarProvider } from "@/contexts/sidebar-context"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { AudioPlayer } from "@/components/audio-player"
import { AuthProvider } from "@/contexts/auth-provider"
import { api } from "@/lib/api"
import { endpoints } from "@/lib/urls"

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let user = null;
  try {
    user = await api.get(endpoints.getUser)
  } catch (error) {

  }

  return (
    <AuthProvider userData={user ? user.data as User : null}>
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
    </AuthProvider>
  )
}
