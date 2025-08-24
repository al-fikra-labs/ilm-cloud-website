import { baseURL, endpoints } from "@/lib/urls";
import { PlaylistDetailPage } from "./playlist";
import { getQueryClient } from "@/lib/query-client";
import { api } from "@/lib/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Playlist({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['playlist', id],
    queryFn: async () => {
      const res = await api.get(`${endpoints.getPlaylists}/${id}`)
      return res.data
    },
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlaylistDetailPage />
    </HydrationBoundary>
  )
}