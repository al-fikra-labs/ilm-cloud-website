"use client"

import { useState } from "react"
import { Heart, Clock, Download, Play, MoreHorizontal, Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/contexts/language-context"
import { useAudio } from "@/contexts/audio-context"

interface LibraryItem {
  id: string
  title: string
  artist: string
  duration: string
  addedAt: string
  audioUrl: string
  imageUrl: string
  type: "track" | "playlist" | "download"
}

export default function LibraryPage() {
  const { t } = useLanguage()
  const { playTrack } = useAudio()
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [activeTab, setActiveTab] = useState("favorites")

  // Mock library data - in real app this would come from user's saved items
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([
    {
      id: "1",
      title: "Advanced JavaScript Concepts",
      artist: "John Smith",
      duration: "45:30",
      addedAt: "2024-01-15",
      audioUrl: "/audio/sample.mp3",
      imageUrl: "/placeholder.svg?height=200&width=200",
      type: "track",
    },
    {
      id: "2",
      title: "React Fundamentals",
      artist: "Sarah Johnson",
      duration: "38:15",
      addedAt: "2024-01-10",
      audioUrl: "/audio/sample2.mp3",
      imageUrl: "/placeholder.svg?height=200&width=200",
      type: "track",
    },
    {
      id: "3",
      title: "Web Development Playlist",
      artist: "Various Artists",
      duration: "2:15:45",
      addedAt: "2024-01-08",
      audioUrl: "",
      imageUrl: "/placeholder.svg?height=200&width=200",
      type: "playlist",
    },
  ])

  const handlePlay = (item: LibraryItem) => {
    if (item.type === "track") {
      playTrack({
        id: item.id,
        title: item.title,
        artist: item.artist,
        duration: item.duration,
        audioUrl: item.audioUrl,
        imageUrl: item.imageUrl,
      })
    }
  }

  const renderGridView = (items: LibraryItem[]) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((item) => (
        <Card key={item.id} className="bg-card hover:bg-card/80 transition-colors group cursor-pointer">
          <CardContent className="p-4">
            <div className="relative mb-3">
              <img
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.title}
                className="w-full aspect-square object-cover rounded-md"
              />
              <Button
                size="sm"
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1DB954] hover:bg-[#1DB954]/90 text-white rounded-full w-10 h-10 p-0"
                onClick={() => handlePlay(item)}
              >
                <Play className="w-4 h-4 ml-0.5" />
              </Button>
            </div>
            <h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.title}</h3>
            <p className="text-muted-foreground text-xs mb-2">{item.artist}</p>
            <p className="text-muted-foreground text-xs">{item.duration}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderListView = (items: LibraryItem[]) => (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
          <div className="w-8 text-muted-foreground text-sm">{index + 1}</div>
          <div className="relative">
            <img
              src={item.imageUrl || "/placeholder.svg"}
              alt={item.title}
              className="w-12 h-12 object-cover rounded"
            />
            <Button
              size="sm"
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white rounded w-12 h-12 p-0"
              onClick={() => handlePlay(item)}
            >
              <Play className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{item.title}</h3>
            <p className="text-muted-foreground text-sm truncate">{item.artist}</p>
          </div>
          <div className="text-muted-foreground text-sm">{item.duration}</div>
          <div className="text-muted-foreground text-sm">{new Date(item.addedAt).toLocaleDateString()}</div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t("nav.library")}</h1>
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recently Played
          </TabsTrigger>
          <TabsTrigger value="downloads" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Downloads
          </TabsTrigger>
        </TabsList>

        <TabsContent value="favorites">
          {viewMode === "grid" ? renderGridView(libraryItems) : renderListView(libraryItems)}
        </TabsContent>

        <TabsContent value="recent">
          {viewMode === "grid" ? renderGridView(libraryItems.slice(0, 2)) : renderListView(libraryItems.slice(0, 2))}
        </TabsContent>

        <TabsContent value="downloads">
          <div className="text-center py-12">
            <Download className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Downloads Yet</h3>
            <p className="text-muted-foreground">Download courses to listen offline. Downloads will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
