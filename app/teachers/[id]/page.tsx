"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Star, Users, BookOpen, ArrowLeft, MoreHorizontal, Clock } from "lucide-react"
import { useAudio } from "@/contexts/audio-context"
import { useEffect, useState } from "react"
import { apiClient, convertApiTrackToTrack, type ApiTeacher, type ApiTrack, type ApiPlaylist } from "@/lib/api"
import { useParams, useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function TeacherDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { playTrack } = useAudio()
  const [teacher, setTeacher] = useState<ApiTeacher | null>(null)
  const [tracks, setTracks] = useState<ApiTrack[]>([])
  const [playlists, setPlaylists] = useState<ApiPlaylist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        setLoading(true)
        const [teacherData, allTracks, allPlaylists] = await Promise.all([
          apiClient.getTeacherById(params.id as string),
          apiClient.getMedia(),
          apiClient.getPlaylists(),
        ])
        setTeacher(teacherData)
        // Filter by teacher (in real app, this would be done by API)
        const teacherTracks = allTracks.filter((track) => track.teacherId === params.id)
        const teacherPlaylists = allPlaylists.filter((playlist) => playlist.teacherId === params.id)
        setTracks(teacherTracks)
        setPlaylists(teacherPlaylists)
      } catch (error) {
        console.error("Error fetching teacher data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchTeacherData()
    }
  }, [params.id])

  const handlePlayTrack = (track: ApiTrack) => {
    const convertedTrack = convertApiTrackToTrack(track)
    const playlist = tracks.map(convertApiTrackToTrack)
    playTrack(convertedTrack, playlist)
  }

  const handlePlayPlaylist = (playlist: ApiPlaylist) => {
    if (playlist.tracks.length > 0) {
      const tracks = playlist.tracks.map(convertApiTrackToTrack)
      playTrack(tracks[0], tracks)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="w-8 h-8" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="bg-gradient-to-r from-muted/50 to-muted/25 rounded-xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <Skeleton className="w-20 h-20 md:w-32 md:h-32 rounded-lg" />
            <div className="flex-1 space-y-3 md:space-y-4 min-w-0">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 md:h-8 w-48 md:w-64" />
              <Skeleton className="h-4 w-full max-w-md" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-9" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      </div>
    )
  }

  if (!teacher) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Teacher not found</p>
          <Button onClick={() => router.push("/teachers")}>Back to Teachers</Button>
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

      {/* Professional Header Banner */}
      <div className="bg-gradient-to-r from-[#1DB954]/10 to-[#1DB954]/5 rounded-xl p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
          {/* Professional Avatar - smaller and not circular */}
          <div className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-muted rounded-lg overflow-hidden shadow-lg flex-shrink-0">
            <img
              src={teacher.avatar || "/placeholder.svg?height=128&width=128"}
              alt={teacher.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Teacher Info */}
          <div className="flex-1 space-y-3 md:space-y-4 min-w-0">
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-[#1DB954]/20 text-[#1DB954] w-fit text-xs">
                Instructor
              </Badge>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight break-words">
                {teacher.name}
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {teacher.bio}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3">
              <Button
                size="default"
                className="bg-[#1DB954] hover:bg-[#1DB954]/90 w-full sm:w-auto"
                onClick={() => tracks.length > 0 && handlePlayTrack(tracks[0])}
                disabled={tracks.length === 0}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
              <Button variant="outline" size="default" className="w-full sm:w-auto bg-transparent">
                Follow Instructor
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="default" className="w-full sm:w-auto bg-transparent">
                    <MoreHorizontal className="w-4 h-4" />
                    <span className="ml-2 sm:hidden">More Options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Share Profile</DropdownMenuItem>
                  <DropdownMenuItem>Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card className="p-3 sm:p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-xl sm:text-2xl font-bold">{teacher.rating?.toFixed(1) || "0.0"}</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">Instructor Rating</p>
        </Card>

        <Card className="p-3 sm:p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <span className="text-xl sm:text-2xl font-bold">{teacher.totalStudents?.toLocaleString() || "0"}</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">Students Enrolled</p>
        </Card>

        <Card className="p-3 sm:p-4 text-center xs:col-span-2 sm:col-span-1">
          <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <span className="text-xl sm:text-2xl font-bold">{teacher.trackCount || tracks.length}</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">Courses Available</p>
        </Card>
      </div>

      {/* Enhanced Content Tabs */}
      <Tabs defaultValue="courses" className="space-y-4 md:space-y-6">
        <div className="border-b border-border">
          <TabsList className="grid w-full grid-cols-2 max-w-sm bg-transparent h-auto p-0">
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-[#1DB954]/10 data-[state=active]:text-[#1DB954] data-[state=active]:border-b-2 data-[state=active]:border-[#1DB954] data-[state=active]:shadow-sm rounded-t-md rounded-b-none pb-2 sm:pb-3 text-sm sm:text-base font-medium transition-all duration-200 hover:bg-muted/50"
            >
              <span className="hidden xs:inline">Courses</span>
              <span className="xs:hidden">Courses</span>
              <span className="ml-1">({tracks.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="playlists"
              className="data-[state=active]:bg-[#1DB954]/10 data-[state=active]:text-[#1DB954] data-[state=active]:border-b-2 data-[state=active]:border-[#1DB954] data-[state=active]:shadow-sm rounded-t-md rounded-b-none pb-2 sm:pb-3 text-sm sm:text-base font-medium transition-all duration-200 hover:bg-muted/50"
            >
              <span className="hidden xs:inline">Playlists</span>
              <span className="xs:hidden">Lists</span>
              <span className="ml-1">({playlists.length})</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="courses" className="space-y-4 mt-4 md:mt-6">
          {tracks.length === 0 ? (
            <Card className="p-8 md:p-12 text-center">
              <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground mx-auto mb-3 md:mb-4" />
              <h3 className="text-base md:text-lg font-semibold mb-2">No Courses Yet</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                This instructor hasn't published any courses yet.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {tracks.map((track) => (
                <Card
                  key={track.id}
                  className="group cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden"
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img
                      src={track.thumbnail || `/placeholder.svg?height=200&width=300&query=${track.title}`}
                      alt={track.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                    <Button
                      size="sm"
                      className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1DB954] hover:bg-[#1DB954]/90 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                      onClick={() => handlePlayTrack(track)}
                    >
                      <Play className="w-3 h-3 sm:w-4 sm:h-4 ml-0.5" />
                    </Button>
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2 text-sm sm:text-base">{track.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
                      {track.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.floor(track.duration / 60)} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {track.plays > 1000 ? `${Math.floor(track.plays / 1000)}k` : track.plays} plays
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="playlists" className="space-y-4 mt-4 md:mt-6">
          {playlists.length === 0 ? (
            <Card className="p-8 md:p-12 text-center">
              <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground mx-auto mb-3 md:mb-4" />
              <h3 className="text-base md:text-lg font-semibold mb-2">No Playlists Yet</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                This instructor hasn't created any playlists yet.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {playlists.map((playlist) => (
                <Card
                  key={playlist.id}
                  className="group cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden"
                >
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <img
                      src={playlist.thumbnail || `/placeholder.svg?height=200&width=200&query=${playlist.title}`}
                      alt={playlist.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                    <Button
                      size="sm"
                      className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1DB954] hover:bg-[#1DB954]/90 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                      onClick={() => handlePlayPlaylist(playlist)}
                    >
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
                    </Button>
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2 text-sm sm:text-base">{playlist.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
                      {playlist.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.floor(playlist.totalDuration / 3600)}h {Math.floor((playlist.totalDuration % 3600) / 60)}m
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {playlist.trackCount} tracks
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
