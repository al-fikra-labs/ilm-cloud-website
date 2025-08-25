"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Play, Pause, Clock, Users, Calendar, ArrowLeft, MoreHorizontal } from "lucide-react"
import { useAudio } from "@/contexts/audio-context"
import { useEffect, useState } from "react"
import { api, apiClient, convertApiTrackToTrack, type ApiPlaylist } from "@/lib/api"
import { useParams, useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useQuery } from "@tanstack/react-query"
import { endpoints } from "@/lib/urls"

export function PlaylistDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { playTrack, state } = useAudio()

    const {
        data: playlist,
        isFetching: loading
    } = useQuery({
        queryKey: ['playlist',params.id],
        queryFn: async (): Promise<ApiPlaylist> => {
            const res = await api.get(`${endpoints.getPlaylists}/${params.id}`)
            return res.data
        },
    })

    const handlePlayPlaylist = () => {
        if (playlist && playlist.tracks && playlist.tracks.length > 0) {
            const tracks = playlist.tracks.map(convertApiTrackToTrack)
            playTrack(tracks[0], tracks)
        }
    }

    const handlePlayTrack = (trackIndex: number) => {
        if (playlist && playlist.tracks) {
            const tracks = playlist.tracks.map(convertApiTrackToTrack)
            playTrack(tracks[trackIndex], tracks)
        }
    }

    const isCurrentTrackPlaying = (trackId: string) => {
        return state.currentTrack?.id === trackId && state.isPlaying
    }

    if (loading) {
        return (
            <div className="space-y-6 p-4 md:p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Skeleton className="w-8 h-8" />
                    <Skeleton className="h-6 w-32" />
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    <Skeleton className="w-full max-w-64 h-64 rounded-lg mx-auto md:mx-0" />
                    <div className="flex-1 space-y-4">
                        <Skeleton className="h-6 md:h-8 w-full max-w-64" />
                        <Skeleton className="h-4 w-full max-w-96" />
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Skeleton className="h-10 w-full sm:w-32" />
                            <Skeleton className="h-10 w-10" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!playlist) {
        return (
            <div className="flex items-center justify-center h-64 p-4">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">Playlist not found</p>
                    <Button onClick={() => router.push("/playlists")}>Back to Playlists</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 md:space-y-8 p-4 md:p-6">
            {/* Back Button */}
            <Button variant="ghost" onClick={() => router.back()} className="gap-2 -ml-2">
                <ArrowLeft className="w-4 h-4" />
                Back
            </Button>

            {/* Playlist Header */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-end">
                <div className="w-full max-w-64 h-64 bg-muted rounded-lg overflow-hidden shadow-2xl mx-auto md:mx-0 md:w-64 md:flex-shrink-0">
                    <img
                        src={playlist.thumbnail || `/placeholder.svg?height=256&width=256&query=${playlist.name}`}
                        alt={playlist.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 space-y-3 md:space-y-4 text-center md:text-left">
                    <Badge variant="secondary" className="bg-[#1DB954]/20 text-[#1DB954] mx-auto md:mx-0 w-fit">
                        Playlist
                    </Badge>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{playlist.name}</h1>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                        {playlist.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-6 text-xs sm:text-sm text-muted-foreground">
                        <span className="flex items-center gap-1 md:gap-2">
                            <Users className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="truncate max-w-24 sm:max-w-none">{playlist.teacherName}</span>
                        </span>
                        <span className="flex items-center gap-1 md:gap-2">
                            <Clock className="w-3 h-3 md:w-4 md:h-4" />
                            {/* {Math.floor(playlist.totalDuration / 3600)}h {Math.floor((playlist.totalDuration % 3600) / 60)}m */}
                            {playlist.totalDuration}
                        </span>
                        <span className="flex items-center gap-1 md:gap-2">
                            <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                            {new Date(playlist.createdAt).getFullYear()}
                        </span>
                        <span>{playlist.trackCount} tracks</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                        <Button
                            size="lg"
                            className="bg-[#1DB954] hover:bg-[#1DB954]/90 px-6 md:px-8 w-full sm:w-auto"
                            onClick={handlePlayPlaylist}
                        >
                            <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                            Play All
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                                    <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                                    <span className="ml-2 sm:hidden">More</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Add to Library</DropdownMenuItem>
                                <DropdownMenuItem>Share Playlist</DropdownMenuItem>
                                <DropdownMenuItem>Download</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Track List */}
            <div className="space-y-2">
                {/* Desktop Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-sm text-muted-foreground border-b border-border">
                    <div className="col-span-1">#</div>
                    <div className="col-span-6">Title</div>
                    <div className="col-span-3">Teacher</div>
                    <div className="col-span-2 text-right">Duration</div>
                </div>
                {playlist.tracks && playlist.tracks.map((track, index) => (
                    <Card
                        key={track.id}
                        className="group cursor-pointer hover:bg-accent/50 transition-all duration-200 border-none shadow-none"
                    >
                        <CardContent className="p-3 md:p-4">
                            {/* Mobile Layout */}
                            <div className="md:hidden">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 flex items-center justify-center w-8">
                                        {isCurrentTrackPlaying(track.id) ? (
                                            <div className="w-4 h-4 flex items-center justify-center">
                                                <div className="w-1 h-4 bg-[#1DB954] animate-pulse mr-0.5"></div>
                                                <div className="w-1 h-2 bg-[#1DB954] animate-pulse mr-0.5"></div>
                                                <div className="w-1 h-3 bg-[#1DB954] animate-pulse"></div>
                                            </div>
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-8 h-8 flex items-center justify-center"
                                                onClick={() => handlePlayTrack(index)}
                                            >
                                                <Play className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                    <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                                        <img
                                            src={track.thumbnail || "/placeholder.svg?height=48&width=48"}
                                            alt={track.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3
                                            className={`font-medium text-sm truncate ${isCurrentTrackPlaying(track.id) ? "text-[#1DB954]" : ""}`}
                                        >
                                            {track.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground truncate">{track.teacherName}</p>
                                    </div>
                                    <div className="flex-shrink-0 text-xs text-muted-foreground">
                                        {/* {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")} */}
                                        {track.duration}
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Layout */}
                            <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-1 flex items-center justify-center">
                                    {isCurrentTrackPlaying(track.id) ? (
                                        <div className="w-4 h-4 flex items-center justify-center">
                                            <div className="w-1 h-4 bg-[#1DB954] animate-pulse mr-0.5"></div>
                                            <div className="w-1 h-2 bg-[#1DB954] animate-pulse mr-0.5"></div>
                                            <div className="w-1 h-3 bg-[#1DB954] animate-pulse"></div>
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground group-hover:hidden">{index + 1}</span>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-8 h-8 hidden group-hover:flex items-center justify-center"
                                        onClick={() => handlePlayTrack(index)}
                                    >
                                        {isCurrentTrackPlaying(track.id) ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    </Button>
                                </div>
                                <div className="col-span-6 flex items-center gap-3">
                                    <div className="w-12 h-12 bg-muted rounded overflow-hidden">
                                        <img
                                            src={track.thumbnail || "/placeholder.svg?height=48&width=48"}
                                            alt={track.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className={`font-medium ${isCurrentTrackPlaying(track.id) ? "text-[#1DB954]" : ""}`}>
                                            {track.name}
                                        </h3>
                                        {track.description && (
                                            <p className="text-sm text-muted-foreground line-clamp-1">{track.description}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <span className="text-sm text-muted-foreground">{track.teacherName}</span>
                                </div>
                                <div className="col-span-2 text-right">
                                    <span className="text-sm text-muted-foreground">
                                        {/* {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")} */}
                                        {track.duration}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
