import { baseURL, endpoints } from "@/lib/urls";
import TeachersPage from "./teachers";

export default async function Teachers() {
  const res = await fetch(`${baseURL}/${endpoints.getTeachers}`, {
    next: { tags: ['teachers'], revalidate: 60 * 1000 }
  })
  const teachers = await res.json()
  return (
    <TeachersPage teachers={teachers} />
  )
}