"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, Users, SearchIcon, Filter } from "lucide-react"
import { useAudio } from "@/contexts/audio-context"
import { useEffect, useState } from "react"
import { apiClient, convertApiTrackToTrack, type ApiTrack, type ApiPlaylist, type ApiTeacher } from "@/lib/api"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const { playTrack } = useAudio()

  const [tracks, setTracks] = useState<ApiTrack[]>([])
  const [playlists, setPlaylists] = useState<ApiPlaylist[]>([])
  const [teachers, setTeachers] = useState<ApiTeacher[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const searchContent = async () => {
      if (!query) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const [allTracks, allPlaylists, allTeachers] = await Promise.all([
          apiClient.getMedia(),
          apiClient.getPlaylists(),
          apiClient.getTeachers(),
        ])

        // Filter results based on search query (in real app, this would be done by API)
        const searchTerm = query.toLowerCase()

        const filteredTracks = allTracks.filter(
          (track) =>
            track.title.toLowerCase().includes(searchTerm) ||
            track.teacherName.toLowerCase().includes(searchTerm) ||
            track.description?.toLowerCase().includes(searchTerm),
        )

        const filteredPlaylists = allPlaylists.filter(
          (playlist) =>
            playlist.title.toLowerCase().includes(searchTerm) ||
            playlist.description.toLowerCase().includes(searchTerm) ||
            playlist.teacherName.toLowerCase().includes(searchTerm),
        )

        const filteredTeachers = allTeachers.filter(
          (teacher) =>
            teacher.name.toLowerCase().includes(searchTerm) || teacher.bio.toLowerCase().includes(searchTerm),
        )

        setTracks(filteredTracks)
        setPlaylists(filteredPlaylists)
        setTeachers(filteredTeachers)
      } catch (error) {
        console.error("Error searching content:", error)
      } finally {
        setLoading(false)
      }
    }

    searchContent()
  }, [query])

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

  const totalResults = tracks.length + playlists.length + teachers.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Search Results</h1>
          {query ? (
            <p className="text-muted-foreground">
              {loading ? "Searching..." : `${totalResults} results for "${query}"`}
            </p>
          ) : (
            <p className="text-muted-foreground">Enter a search term to find courses, playlists, and teachers</p>
          )}
        </div>
        {query && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Most Relevant</DropdownMenuItem>
              <DropdownMenuItem>Most Recent</DropdownMenuItem>
              <DropdownMenuItem>Most Popular</DropdownMenuItem>
              <DropdownMenuItem>Shortest First</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {!query ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Start typing to search for courses, playlists, and teachers</p>
          </div>
        </div>
      ) : loading ? (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Card key={j}>
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
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : totalResults === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">No results found for "{query}"</p>
            <p className="text-sm text-muted-foreground">Try different keywords or browse our categories</p>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="all">All ({totalResults})</TabsTrigger>
            <TabsTrigger value="tracks">Courses ({tracks.length})</TabsTrigger>
            <TabsTrigger value="playlists">Playlists ({playlists.length})</TabsTrigger>
            <TabsTrigger value="teachers">Teachers ({teachers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* Top Results */}
            {(tracks.length > 0 || playlists.length > 0 || teachers.length > 0) && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Top Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tracks.slice(0, 2).map((track) => (
                    <Card
                      key={track.id}
                      className="group cursor-pointer hover:bg-accent/50 transition-all duration-200"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={track.thumbnail || "/placeholder.svg?height=64&width=64"}
                              alt={track.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Badge variant="secondary" className="mb-1 text-xs">
                              Course
                            </Badge>
                            <h3 className="font-medium truncate">{track.title}</h3>
                            <p className="text-sm text-muted-foreground truncate">{track.teacherName}</p>
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
                  {teachers.slice(0, 1).map((teacher) => (
                    <Link key={teacher.id} href={`/teachers/${teacher.id}`}>
                      <Card className="group cursor-pointer hover:bg-accent/50 transition-all duration-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-muted rounded-full overflow-hidden flex-shrink-0">
                              <img
                                src={teacher.avatar || "/placeholder.svg?height=64&width=64"}
                                alt={teacher.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Badge variant="secondary" className="mb-1 text-xs">
                                Teacher
                              </Badge>
                              <h3 className="font-medium truncate">{teacher.name}</h3>
                              <p className="text-sm text-muted-foreground truncate">{teacher.trackCount} courses</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All Courses */}
            {tracks.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tracks.map((track) => (
                    <Card
                      key={track.id}
                      className="group cursor-pointer hover:bg-accent/50 transition-all duration-200"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={track.thumbnail || "/placeholder.svg?height=64&width=64"}
                              alt={track.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{track.title}</h3>
                            <p className="text-sm text-muted-foreground truncate">{track.teacherName}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {Math.floor(track.duration / 60)} min
                              </span>
                              <Badge variant="secondary" className="text-xs bg-[#1DB954]/20 text-[#1DB954]">
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tracks">
            {tracks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No courses found for "{query}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tracks.map((track) => (
                  <Card key={track.id} className="group cursor-pointer hover:bg-accent/50 transition-all duration-200">
                    <CardContent className="p-4">
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="playlists">
            {playlists.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No playlists found for "{query}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playlists.map((playlist) => (
                  <Link key={playlist.id} href={`/playlists/${playlist.id}`}>
                    <Card className="group cursor-pointer hover:bg-accent/50 transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="aspect-square bg-muted rounded-md mb-4 relative overflow-hidden">
                          <img
                            src={playlist.thumbnail || `/placeholder.svg?height=200&width=200&query=${playlist.title}`}
                            alt={playlist.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <Button
                            size="sm"
                            className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-[#1DB954] hover:bg-[#1DB954]/90 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                            onClick={(e) => {
                              e.preventDefault()
                              handlePlayPlaylist(playlist)
                            }}
                          >
                            <Play className="w-5 h-5 ml-0.5" />
                          </Button>
                        </div>
                        <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-[#1DB954] transition-colors">
                          {playlist.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{playlist.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {Math.floor(playlist.totalDuration / 3600)}h{" "}
                            {Math.floor((playlist.totalDuration % 3600) / 60)}m
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {playlist.trackCount} tracks
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="teachers">
            {teachers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No teachers found for "{query}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {teachers.map((teacher) => (
                  <Link key={teacher.id} href={`/teachers/${teacher.id}`}>
                    <Card className="group cursor-pointer hover:bg-accent/50 transition-all duration-200 hover:shadow-lg">
                      <CardContent className="p-6 text-center">
                        <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                          <img
                            src={teacher.avatar || "/placeholder.svg?height=80&width=80"}
                            alt={teacher.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-[#1DB954] transition-colors">
                          {teacher.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{teacher.bio}</p>
                        <div className="flex items-center justify-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span>
                              {teacher.totalStudents > 1000
                                ? `${Math.floor(teacher.totalStudents / 1000)}k`
                                : teacher.totalStudents}
                            </span>
                          </div>
                          <Badge variant="secondary" className="bg-[#1DB954]/20 text-[#1DB954]">
                            {teacher.trackCount} courses
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
