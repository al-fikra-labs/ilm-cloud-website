"use client"

import { api } from "@/lib/api";
import { endpoints } from "@/lib/urls";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await api.get(endpoints.getUser)
                if (data) {
                    setIsAuth(true)
                }
            } catch (error) {
            } finally {
                setLoading(false)
            }
        }
        checkAuth()
    }, [])

    if (loading) return null;

    if (!isAuth) return children
    else router.push("/")
}