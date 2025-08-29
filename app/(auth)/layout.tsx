import { api } from "@/lib/api";
import { endpoints } from "@/lib/urls";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    let user = null
    try {
        const res = await api.get(endpoints.getUser)
        user = res.data
    } catch (error) {
        console.log(error)
        return children
    }
    if(user) redirect("/")
    return children
}