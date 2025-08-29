import { baseURL, endpoints } from "@/lib/urls";
import TeachersPage from "./teachers";

export default async function Teachers() {
  const res = await fetch(`${baseURL}/${endpoints.getTeachers}`, {
    next: { tags: ['teachers'] }
  })
  const teachers = await res.json()
  return (
    <TeachersPage teachers={teachers} />
  )
}