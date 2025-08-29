"use client"

import { api } from "@/lib/api"
import { endpoints } from "@/lib/urls"
import { createContext, useContext, useState, type ReactNode, Dispatch, SetStateAction, useEffect } from "react"

interface AuthContextType {
    user: User | null
    setUser: Dispatch<SetStateAction<User>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        createdAt: "",
        id: "",
        isLogedIn: false
    })

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await api.get(endpoints.getUser)
                if (data) {
                    setUser({
                        name: data.name,
                        email: data.email,
                        createdAt: data.createdAt,
                        id: data.id,
                        isLogedIn: true
                    })
                }
            } catch (error) {

            } finally{
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider")
    }
    return context
}
