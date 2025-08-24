"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Play, Clock, Users, ArrowLeft, Filter, Grid, List } from "lucide-react"
import { useAudio } from "@/contexts/audio-context"
import { useEffect, useState } from "react"
import { apiClient, convertApiTrackToTrack, type ApiCategory, type ApiTrack } from "@/lib/api"
import { useParams, useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function CategoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { playTrack } = useAudio()
  const [category, setCategory] = useState<ApiCategory | null>(null)
  const [tracks, setTracks] = useState<ApiTrack[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true)
        const [categoryData, allTracks] = await Promise.all([
          apiClient.getCategoryById(params.id as string),
          apiClient.getMedia(),
        ])
        setCategory(categoryData)
        // Filter tracks by category (in real app, this would be done by API)
        const categoryTracks = allTracks.filter((track) => track.categoryId === params.id)
        setTracks(categoryTracks)
      } catch (error) {
        console.error("Error fetching category data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCategoryData()
    }
  }, [params.id])

  const handlePlayTrack = (track: ApiTrack) => {
    const convertedTrack = convertApiTrackToTrack(track)
    const playlist = tracks.map(convertApiTrackToTrack)
    playTrack(convertedTrack, playlist)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="w-8 h-8" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="aspect-video rounded-md mb-4" />
                <Skeleton className="h-4 mb-2" />
                <Skeleton className="h-3 mb-2" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Category not found</p>
          <Button onClick={() => router.push("/categories")}>Back to Categories</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.back()} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      {/* Category Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#1DB954]/20 rounded-full flex items-center justify-center">
            {category.thumbnail ? (
              <img src={category.thumbnail || "/placeholder.svg"} alt={category.name} className="w-8 h-8" />
            ) : (
              <Users className="w-8 h-8 text-[#1DB954]" />
            )}
          </div>
          <div>
            <Badge variant="secondary" className="bg-[#1DB954]/20 text-[#1DB954] mb-2">
              Category
            </Badge>
            <h1 className="text-4xl font-bold">{category.name}</h1>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">{category.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{tracks.length} courses available</span>
          <span>•</span>
          <span>Updated regularly</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            size="lg"
            className="bg-[#1DB954] hover:bg-[#1DB954]/90"
            onClick={() => tracks.length > 0 && handlePlayTrack(tracks[0])}
            disabled={tracks.length === 0}
          >
            <Play className="w-5 h-5 mr-2" />
            Play All
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Most Popular</DropdownMenuItem>
              <DropdownMenuItem>Newest First</DropdownMenuItem>
              <DropdownMenuItem>Shortest First</DropdownMenuItem>
              <DropdownMenuItem>Longest First</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tracks */}
      {tracks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses available in this category yet.</p>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {tracks.map((track) => (
            <Card key={track.id} className="group cursor-pointer hover:bg-accent/50 transition-all duration-200">
              <CardContent className="p-4">
                {viewMode === "grid" ? (
                  <>
                    <div className="aspect-video bg-muted rounded-md mb-4 relative overflow-hidden">
                      <img
                        src={track.thumbnail || `/placeholder.svg?height=200&width=300&query=${track.title}`}
                        alt={track.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <Button
                        size="sm"
                        className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-[#1DB954] hover:bg-[#1DB954]/90 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                        onClick={() => handlePlayTrack(track)}
                      >
                        <Play className="w-4 h-4 ml-0.5" />
                      </Button>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{track.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{track.teacherName}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.floor(track.duration / 60)} min
                      </span>
                      <Badge variant="secondary" className="bg-[#1DB954]/20 text-[#1DB954]">
                        {track.language.toUpperCase()}
                      </Badge>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={track.thumbnail || `/placeholder.svg?height=80&width=80&query=${track.title}`}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">{track.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{track.teacherName}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {Math.floor(track.duration / 60)} min
                        </span>
                        <Badge variant="secondary" className="bg-[#1DB954]/20 text-[#1DB954]">
                          {track.language.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handlePlayTrack(track)}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
