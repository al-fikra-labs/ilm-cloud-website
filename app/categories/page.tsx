import { baseURL, endpoints } from "@/lib/urls";
import { CategoriesPage } from "./categories";

export default async function Categories() {
  const res = await fetch(`${baseURL}/${endpoints.getCategories}`, {
    next: { tags: ["categories"] }
  })
  const categories = await res.json()
  return (
    <CategoriesPage categories={categories} />
  )
}