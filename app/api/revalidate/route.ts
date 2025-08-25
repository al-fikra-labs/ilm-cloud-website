import { revalidateTag } from "next/cache"

export async function POST(request: Request) {
    const { tag }: { tag: string } = await request.json()
    revalidateTag(tag)
    console.log(tag)
    return Response.json({ tag })
}