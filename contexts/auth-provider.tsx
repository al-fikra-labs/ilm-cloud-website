"use client"

import { createContext, useContext, useState, type ReactNode, Dispatch, SetStateAction } from "react"

interface AuthContextType {
    user: User | null
    setUser: Dispatch<SetStateAction<User>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ userData, children }: { userData: User | null, children: ReactNode }) {
    const [user, setUser] = useState<User>(userData ? {
        ...userData,
        isLogedIn: true
    } : {
        name: "",
        email: "",
        createdAt: "",
        id: "",
        isLogedIn: false
    })

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider")
    }
    return context
}
