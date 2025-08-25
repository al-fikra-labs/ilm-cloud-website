"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Play, Clock, Users, Grid, List } from "lucide-react"
import { useAudio } from "@/contexts/audio-context"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import { api, apiClient, convertApiTrackToTrack, type ApiPlaylist } from "@/lib/api"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getQueryClient } from "@/lib/query-client"
import { endpoints } from "@/lib/urls"

type Playlist = {
    id: string
    name: string
    description: string
    trackCount: number
    teacherName: string
    totalDuration: string
    thumbnail: string
}

type Props = {
    playlists: Playlist[]
}

export function PlaylistsPage({ playlists }: Props) {

    const { t } = useLanguage()
    const [loading, setLoading] = useState(false)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{t("playlists.title")}</h1>
                    <p className="text-sm sm:text-base text-muted-foreground">{t("playlists.description")}</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="px-3 py-2"
                    >
                        <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="px-3 py-2"
                    >
                        <List className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Playlists Grid/List */}

            <div
                className={
                    viewMode === "grid"
                        ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
                        : "space-y-3 sm:space-y-4"
                }
            >
                {playlists.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} viewMode={viewMode} />
                ))}
            </div>
            {/* )} */}
        </div>
    )
}

function PlaylistCard({ playlist, viewMode }: { playlist: Playlist, viewMode: "list" | "grid" }) {

    const { playTrack } = useAudio()
    const { t } = useLanguage()

    const queryClient = getQueryClient()

    const handlePlayPlaylist = async () => {
        const { data } = await queryClient.fetchQuery({
            queryKey: ['playlist', playlist.id],
            queryFn: () => api.get(`${endpoints.getPlaylists}/${playlist.id}`),
        })

        if (data.tracks.length > 0) {
            const tracks = data.tracks.map(convertApiTrackToTrack)
            playTrack(tracks[0], tracks)
        }

    }
    return (
        <Card key={playlist.id} className="group cursor-pointer hover:bg-accent/50 transition-all duration-200 py-2">
            <CardContent className="p-3 sm:p-4">
                {viewMode === "grid" ? (
                    <>
                        <div className="aspect-square bg-muted rounded-md mb-3 sm:mb-4 relative overflow-hidden">
                            <img
                                src={playlist.thumbnail || `/placeholder.svg?height=200&width=200&query=${playlist.name}`}
                                alt={playlist.name}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <Button
                                size="sm"
                                className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#1DB954] hover:bg-[#1DB954]/90 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                                onClick={handlePlayPlaylist}
                            >
                                <Play className="w-3 h-3 sm:w-5 sm:h-5 ml-0.5" />
                            </Button>
                        </div>
                        <Link href={`/playlists/${playlist.id}`}>
                            <h3 className="font-semibold mb-2 line-clamp-2 hover:text-[#1DB954] transition-colors text-sm sm:text-base">
                                {playlist.name}
                            </h3>
                        </Link>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">{playlist.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            {playlist.totalDuration ? <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {playlist.totalDuration}
                                {/* {Math.floor(playlist.totalDuration / 3600)}h {Math.floor((playlist.totalDuration % 3600) / 60)}m */}
                            </span> : ""}
                            <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {playlist.trackCount} {t("playlists.tracks")}
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-md overflow-hidden flex-shrink-0 relative">
                            <img
                                src={playlist.thumbnail || `/placeholder.svg?height=80&width=80&query=${playlist.name}`}
                                alt={playlist.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <Link href={`/playlists/${playlist.id}`}>
                                <h3 className="font-semibold mb-1 hover:text-[#1DB954] transition-colors text-sm sm:text-base">
                                    {playlist.name}
                                </h3>
                            </Link>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
                                {playlist.description}
                            </p>
                            <div className="flex items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {playlist.totalDuration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {playlist.trackCount} {t("playlists.tracks")}
                                </span>
                                <Badge
                                    variant="secondary"
                                    className="bg-[#1DB954]/20 text-[#1DB954] text-xs hidden sm:inline-flex"
                                >
                                    {playlist.teacherName}
                                </Badge>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex"
                            onClick={handlePlayPlaylist}
                        >
                            <Play className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
