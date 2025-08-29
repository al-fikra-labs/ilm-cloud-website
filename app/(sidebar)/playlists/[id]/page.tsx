import { baseURL, endpoints } from "@/lib/urls";
import { PlaylistDetailPage } from "./playlist";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

export default async function Playlist({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['playlist', id],
    queryFn: async () => {
      const res = await fetch(`${baseURL}/${endpoints.getPlaylists}/${id}`, {
        next: { tags: [`playlist-${id}`] },
      })
      const data = await res.json()
      return data
    },
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlaylistDetailPage />
    </HydrationBoundary>
  )
}