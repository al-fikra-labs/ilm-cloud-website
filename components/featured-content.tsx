"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Play, Clock, Users, TrendingUp, Star, ChevronRight } from "lucide-react"
import { useAudio } from "@/contexts/audio-context"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import {
  apiClient,
  convertApiTrackToTrack,
  type ApiTrack,
  type ApiPlaylist,
  type ApiCategory,
  type ApiTeacher,
} from "@/lib/api"

export function FeaturedContent() {
  const { playTrack } = useAudio()
  const { t } = useLanguage()
  const [featuredTracks, setFeaturedTracks] = useState<ApiTrack[]>([])
  const [featuredPlaylists, setFeaturedPlaylists] = useState<ApiPlaylist[]>([])
  const [categories, setCategories] = useState<ApiCategory[]>([])
  const [topTeachers, setTopTeachers] = useState<ApiTeacher[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [tracks, playlists, categoriesData, teachers] = await Promise.all([
          apiClient.getMedia().catch(() => []),
          apiClient.getPlaylists().catch(() => []),
          apiClient.getCategories().catch(() => []),
          apiClient.getTeachers().catch(() => []),
        ])

        setFeaturedTracks(tracks.slice(0, 12)) // Increased from 6 to 12
        setFeaturedPlaylists(playlists.slice(0, 8)) // Increased from 4 to 8
        setCategories(categoriesData) // Show all categories (no slice)
        setTopTeachers(teachers) // Show all teachers (no slice)

        // Debug logging to check if data is being fetched
        console.log("Fetched data:", {
          tracks: tracks.length,
          playlists: playlists.length,
          categories: categoriesData.length,
          teachers: teachers.length,
        })
      } catch (err) {
        setError(t("common.error"))
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [t])

  const handlePlayTrack = (apiTrack: ApiTrack) => {
    const track = convertApiTrackToTrack(apiTrack)
    const playlist = featuredTracks.map(convertApiTrackToTrack)
    playTrack(track, playlist)
  }

  const handlePlayPlaylist = (playlist: ApiPlaylist) => {
    if (playlist.tracks.length > 0) {
      const tracks = playlist.tracks.map(convertApiTrackToTrack)
      playTrack(tracks[0], tracks)
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>{t("common.tryagain")}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative min-h-48 sm:min-h-56 md:min-h-64 lg:min-h-80 xl:min-h-96 rounded-xl overflow-hidden bg-gradient-to-br from-[#1DB954]/30 via-[#1DB954]/20 to-[#1DB954]/10">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        <div className="relative min-h-full flex items-start justify-start p-3 sm:p-4 md:p-6 lg:p-8 py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 w-full sm:max-w-md md:max-w-lg lg:max-w-2xl">
            <div className="space-y-1 sm:space-y-2">
              <Badge variant="secondary" className="bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30 text-xs">
                {t("home.hero.badge")}
              </Badge>
              <h1 className="text-3xl xl:text-4xl font-bold leading-tight">
                {t("home.hero.title")}
                <br />
                <span className="text-[#1DB954]">{t("home.hero.title.accent")}</span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3">
              {t("home.hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <Button
                size="sm"
                className="bg-[#1DB954] hover:bg-[#1DB954]/90 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base"
                onClick={() => featuredTracks.length > 0 && handlePlayTrack(featuredTracks[0])}
                disabled={loading || featuredTracks.length === 0}
              >
                <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                {t("home.hero.cta")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base bg-transparent"
              >
                {t("home.hero.browse")}
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
              </Button>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-1 sm:flex sm:flex-row sm:items-center sm:gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Users className="w-3 h-3 flex-shrink-0" />
                <span className="truncate text-xs">{t("home.hero.stats.students")}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                <span className="truncate text-xs">{t("home.hero.stats.rating")}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Clock className="w-3 h-3 flex-shrink-0" />
                <span className="truncate text-xs">{t("home.hero.stats.content")}</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-80 h-80 relative">
              <img
                src="/placeholder.svg?height=320&width=320"
                alt="Audio learning"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t("player.nowplaying")}</p>
                    <p className="text-xs text-muted-foreground">JavaScript Basics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Playlists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">{t("home.featured.title")}</h2>
          <Button variant="ghost" className="text-[#1DB954] hover:text-[#1DB954]/80">
            {t("home.viewall")}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-3 sm:p-4">
                    <Skeleton className="aspect-square rounded-md mb-4" />
                    <Skeleton className="h-4 mb-2" />
                    <Skeleton className="h-3 mb-2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : featuredPlaylists.map((playlist) => (
                <Card
                  key={playlist.id}
                  className="group cursor-pointer hover:bg-accent/50 transition-all duration-200 hover:shadow-lg"
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="aspect-square bg-muted rounded-md mb-4 relative overflow-hidden">
                      <img
                        src={playlist.thumbnail || `/placeholder.svg?height=200&width=200&query=${playlist.title}`}
                        alt={playlist.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <Button
                        size="sm"
                        className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#1DB954] hover:bg-[#1DB954]/90 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                        onClick={() => handlePlayPlaylist(playlist)}
                      >
                        <Play className="w-3 h-3 sm:w-5 sm:h-5 ml-0.5" />
                      </Button>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2 text-sm sm:text-base">{playlist.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">{playlist.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.floor(playlist.totalDuration / 3600)}h {Math.floor((playlist.totalDuration % 3600) / 60)}m
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {playlist.trackCount} {t("playlists.tracks")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </section>

      {/* Trending Tracks */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-[#1DB954]" />
            {t("home.trending.title")}
          </h2>
          <Button variant="ghost" className="text-[#1DB954] hover:text-[#1DB954]/80">
            {t("home.viewall")}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-16 h-16 rounded-md" />
                      <div className="flex-1">
                        <Skeleton className="h-4 mb-2" />
                        <Skeleton className="h-3 mb-2" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            : featuredTracks.map((track, index) => (
                <Card key={track.id} className="group cursor-pointer hover:bg-accent/50 transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={track.thumbnail || "/placeholder.svg?height=64&width=64"}
                            alt={track.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -top-1 -left-1 w-6 h-6 bg-[#1DB954] rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{track.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{track.teacherName}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {Math.floor(track.duration / 60)} {t("common.min")}
                          </span>
                          <Badge variant="secondary" className="text-xs bg-[#1DB954]/20 text-[#1DB954]">
                            {track.plays > 1000 ? `${Math.floor(track.plays / 1000)}k` : track.plays}{" "}
                            {t("common.plays")}
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
                  </CardContent>
                </Card>
              ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">{t("home.categories.title")}</h2>
          <Button variant="ghost" className="text-[#1DB954] hover:text-[#1DB954]/80">
            {t("home.viewall")}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="aspect-square">
                  <CardContent className="p-4 h-full flex flex-col items-center justify-center">
                    <Skeleton className="w-12 h-12 rounded-full mb-3" />
                    <Skeleton className="h-4 w-20" />
                  </CardContent>
                </Card>
              ))
            : categories.map((category) => (
                <Card
                  key={category.id}
                  className="group cursor-pointer hover:bg-accent/50 transition-all duration-200 aspect-square"
                >
                  <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-[#1DB954]/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#1DB954]/30 transition-colors">
                      <img
                        src={category.thumbnail || "/placeholder.svg?height=24&width=24"}
                        alt={category.name}
                        className="w-6 h-6"
                      />
                    </div>
                    <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.trackCount} {t("categories.courses")}
                    </p>
                  </CardContent>
                </Card>
              ))}
        </div>
      </section>

      {/* Top Teachers */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">{t("home.teachers.title")}</h2>
          <Button variant="ghost" className="text-[#1DB954] hover:text-[#1DB954]/80">
            {t("home.viewall")}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6 text-center">
                    <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
                    <Skeleton className="h-4 mb-2" />
                    <Skeleton className="h-3 mb-4" />
                    <div className="flex justify-center gap-4">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : topTeachers.map((teacher) => (
                <Card key={teacher.id} className="group cursor-pointer hover:bg-accent/50 transition-all duration-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                      <img
                        src={teacher.avatar || "/placeholder.svg?height=80&width=80"}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold mb-2">{teacher.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{teacher.bio}</p>
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {teacher.totalStudents > 1000
                          ? `${Math.floor(teacher.totalStudents / 1000)}k`
                          : teacher.totalStudents}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {teacher.rating ? teacher.rating.toFixed(1) : "0.0"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </section>
    </div>
  )
}
