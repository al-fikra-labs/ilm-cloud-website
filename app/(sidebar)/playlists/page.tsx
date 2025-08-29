import { baseURL, endpoints } from "@/lib/urls";
import { PlaylistsPage } from "./playlists";

export default async function Playlists() {
  const res = await fetch(`${baseURL}/${endpoints.getPlaylists}`, {
    next: { tags: ['playlists'] },
    cache: "force-cache"
  })
  const playlists = await res.json()
  return (
    <PlaylistsPage playlists={playlists} />
  )
}