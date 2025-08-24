"use client"

import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, MoreHorizontal, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAudio } from "@/contexts/audio-context"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

export function AudioPlayer() {
  const {
    state,
    togglePlayPause,
    nextTrack,
    previousTrack,
    setProgress,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    formatTime,
  } = useAudio()
  const { t, language } = useLanguage()

  const { currentTrack, isPlaying, progress, duration, volume, isLoading, isShuffled, repeatMode } = state

  if (!currentTrack) {
    return null
  }

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  return (
    <>
      {/* Mobile Layout */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden">
        {/* Progress Bar - Top */}
        <div className="px-4 pt-2">
          <Slider
            value={[progress]}
            onValueChange={handleProgressChange}
            max={duration || 100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Track Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-muted rounded-md overflow-hidden flex-shrink-0">
              <img
                src={currentTrack.thumbnail || "/placeholder.svg?height=48&width=48"}
                alt={currentTrack.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm truncate">{currentTrack.name}</p>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.teacher}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" onClick={previousTrack}>
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              className="w-9 h-9 rounded-full bg-[#1DB954] hover:bg-[#1DB954]/90"
              onClick={togglePlayPause}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={nextTrack}>
              <SkipForward className="w-4 h-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={toggleShuffle} className={cn(isShuffled && "text-[#1DB954]")}>
                  <Shuffle className="w-4 h-4 mr-2" />
                  {t("player.shuffle")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleRepeat} className={cn(repeatMode !== "none" && "text-[#1DB954]")}>
                  <Repeat className="w-4 h-4 mr-2" />
                  {t("player.repeat")}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Volume2 className="w-4 h-4 mr-2" />
                  {t("player.volume")}
                </DropdownMenuItem>
                <DropdownMenuItem>{t("player.addtoplaylist")}</DropdownMenuItem>
                <DropdownMenuItem>{t("player.download")}</DropdownMenuItem>
                <DropdownMenuItem>{t("player.share")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Time Display */}
        <div className="flex justify-between px-4 pb-2 text-xs text-muted-foreground">
          <span>{formatTime(progress)}</span>
          <span className="bg-[#1DB954] text-white px-2 py-0.5 rounded text-xs">
            {(currentTrack.language || language).toUpperCase()}
          </span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-background border-t border-border items-center justify-between px-6 z-50 hidden md:flex">
        {/* Left - Current Track */}
        <div className="flex items-center gap-4 w-1/4">
          <div className="w-14 h-14 bg-muted rounded-md overflow-hidden">
            <img
              src={currentTrack.thumbnail || "/placeholder.svg?height=56&width=56"}
              alt={currentTrack.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{currentTrack.name}</p>
            <p className="text-xs text-muted-foreground truncate">{currentTrack.teacher}</p>
          </div>
        </div>

        {/* Center - Controls */}
        <div className="flex flex-col items-center gap-2 w-1/2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={toggleShuffle} className={cn(isShuffled && "text-[#1DB954]")}>
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={previousTrack}>
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button
              size="sm"
              className="w-10 h-10 rounded-full bg-[#1DB954] hover:bg-[#1DB954]/90"
              onClick={togglePlayPause}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={nextTrack}>
              <SkipForward className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleRepeat}
              className={cn(repeatMode !== "none" && "text-[#1DB954]")}
            >
              <Repeat className="w-4 h-4" />
              {repeatMode === "one" && <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#1DB954] rounded-full" />}
            </Button>
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-muted-foreground min-w-[35px]">{formatTime(progress)}</span>
            <Slider
              value={[progress]}
              onValueChange={handleProgressChange}
              max={duration || 100}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground min-w-[35px]">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right - Volume & More */}
        <div className="flex items-center gap-4 w-1/4 justify-end">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            <Slider value={[volume]} onValueChange={handleVolumeChange} max={100} step={1} className="w-20" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#1DB954] text-white px-2 py-1 rounded">
              {(currentTrack.language || language).toUpperCase()}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>{t("player.addtoplaylist")}</DropdownMenuItem>
                <DropdownMenuItem>{t("player.download")}</DropdownMenuItem>
                <DropdownMenuItem>{t("player.share")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  )
}
