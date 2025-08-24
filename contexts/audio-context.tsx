"use client"

import type React from "react"
import { createContext, useContext, useReducer, useRef, useEffect } from "react"

export interface Track {
  id: string
  name: string
  teacher: string
  fileUrl: string
  thumbnail: string
  duration: number
  language?: string
}

interface AudioState {
  currentTrack: Track | null
  isPlaying: boolean
  progress: number
  duration: number
  volume: number
  isLoading: boolean
  playlist: Track[]
  currentIndex: number
  isShuffled: boolean
  repeatMode: "none" | "one" | "all"
}

type AudioAction =
  | { type: "SET_TRACK"; payload: Track }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "SET_PROGRESS"; payload: number }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_PLAYLIST"; payload: Track[] }
  | { type: "NEXT_TRACK" }
  | { type: "PREVIOUS_TRACK" }
  | { type: "TOGGLE_SHUFFLE" }
  | { type: "TOGGLE_REPEAT" }

const initialState: AudioState = {
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  duration: 0,
  volume: 70,
  isLoading: false,
  playlist: [],
  currentIndex: -1,
  isShuffled: false,
  repeatMode: "none",
}

function audioReducer(state: AudioState, action: AudioAction): AudioState {
  switch (action.type) {
    case "SET_TRACK":
      const trackIndex = state.playlist.findIndex((track) => track.id === action.payload.id)
      return {
        ...state,
        currentTrack: action.payload,
        currentIndex: trackIndex !== -1 ? trackIndex : state.currentIndex,
        progress: 0,
      }
    case "PLAY":
      return { ...state, isPlaying: true }
    case "PAUSE":
      return { ...state, isPlaying: false }
    case "SET_PROGRESS":
      return { ...state, progress: action.payload }
    case "SET_DURATION":
      return { ...state, duration: action.payload }
    case "SET_VOLUME":
      return { ...state, volume: action.payload }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_PLAYLIST":
      return { ...state, playlist: action.payload }
    case "NEXT_TRACK":
      if (state.playlist.length === 0) return state
      let nextIndex = state.currentIndex + 1
      if (nextIndex >= state.playlist.length) {
        nextIndex = state.repeatMode === "all" ? 0 : state.currentIndex
      }
      return {
        ...state,
        currentTrack: state.playlist[nextIndex] || state.currentTrack,
        currentIndex: nextIndex,
        progress: 0,
      }
    case "PREVIOUS_TRACK":
      if (state.playlist.length === 0) return state
      let prevIndex = state.currentIndex - 1
      if (prevIndex < 0) {
        prevIndex = state.repeatMode === "all" ? state.playlist.length - 1 : 0
      }
      return {
        ...state,
        currentTrack: state.playlist[prevIndex] || state.currentTrack,
        currentIndex: prevIndex,
        progress: 0,
      }
    case "TOGGLE_SHUFFLE":
      return { ...state, isShuffled: !state.isShuffled }
    case "TOGGLE_REPEAT":
      const modes: ("none" | "one" | "all")[] = ["none", "one", "all"]
      const currentModeIndex = modes.indexOf(state.repeatMode)
      const nextMode = modes[(currentModeIndex + 1) % modes.length]
      return { ...state, repeatMode: nextMode }
    default:
      return state
  }
}

interface AudioContextType {
  state: AudioState
  playTrack: (track: Track, playlist?: Track[]) => void
  togglePlayPause: () => void
  nextTrack: () => void
  previousTrack: () => void
  setProgress: (progress: number) => void
  setVolume: (volume: number) => void
  toggleShuffle: () => void
  toggleRepeat: () => void
  formatTime: (seconds: number) => string
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(audioReducer, initialState)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio

    const handleLoadedMetadata = () => {
      dispatch({ type: "SET_DURATION", payload: audio.duration })
      dispatch({ type: "SET_LOADING", payload: false })
    }

    const handleTimeUpdate = () => {
      dispatch({ type: "SET_PROGRESS", payload: audio.currentTime })
    }

    const handleEnded = () => {
      if (state.repeatMode === "one") {
        audio.currentTime = 0
        audio.play()
      } else {
        nextTrack()
      }
    }

    const handleLoadStart = () => {
      dispatch({ type: "SET_LOADING", payload: true })
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("loadstart", handleLoadStart)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.pause()
    }
  }, [state.repeatMode])

  // Handle track changes
  useEffect(() => {
    if (state.currentTrack && audioRef.current) {
      audioRef.current.src = state.currentTrack.fileUrl
      audioRef.current.volume = state.volume / 100
    }
  }, [state.currentTrack])

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (state.isPlaying) {
        audioRef.current.play().catch(console.error)
      } else {
        audioRef.current.pause()
      }
    }
  }, [state.currentTrack, state.isPlaying]) // added

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume / 100
    }
  }, [state.volume])

  const playTrack = (track: Track, playlist?: Track[]) => {
    if (playlist) {
      dispatch({ type: "SET_PLAYLIST", payload: playlist })
    }
    dispatch({ type: "SET_TRACK", payload: track })
    dispatch({ type: "PLAY" })
  }

  const togglePlayPause = () => {
    if (state.isPlaying) {
      dispatch({ type: "PAUSE" })
    } else {
      dispatch({ type: "PLAY" })
    }
  }

  const nextTrack = () => {
    dispatch({ type: "NEXT_TRACK" })
  }

  const previousTrack = () => {
    dispatch({ type: "PREVIOUS_TRACK" })
  }

  const setProgress = (progress: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = progress
    }
    dispatch({ type: "SET_PROGRESS", payload: progress })
  }

  const setVolume = (volume: number) => {
    dispatch({ type: "SET_VOLUME", payload: volume })
  }

  const toggleShuffle = () => {
    dispatch({ type: "TOGGLE_SHUFFLE" })
  }

  const toggleRepeat = () => {
    dispatch({ type: "TOGGLE_REPEAT" })
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <AudioContext.Provider
      value={{
        state,
        playTrack,
        togglePlayPause,
        nextTrack,
        previousTrack,
        setProgress,
        setVolume,
        toggleShuffle,
        toggleRepeat,
        formatTime,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
