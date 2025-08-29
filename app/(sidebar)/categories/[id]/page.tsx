import { baseURL, endpoints } from "@/lib/urls";
import { CategoryDetailPage } from "./category";

export const dynamicParams = true

export async function generateStaticParams(){
  return []
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await fetch(`${baseURL}/${endpoints.getCategories}/${id}`, {
    next: { tags: [`category-${id}`] },
  })

  const category = await res.json()
  console.log(category)

  return (
    <CategoryDetailPage category={category} />
  )
}