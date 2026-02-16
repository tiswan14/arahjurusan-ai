'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { AuthUser } from '@/types/auth'

type AuthContextType = {
    user: AuthUser | null
    loading: boolean
    refetch: () => Promise<void>
    logout: () => Promise<void>
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/me', {
                credentials: 'include',
            })

            if (!res.ok) {
                setUser(null)
                return
            }

            const result = await res.json()
            setUser(result.data)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            })
        } catch (error) {
            console.error('Logout gagal', error)
        } finally {
            setUser(null)
        }
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                refetch: fetchUser,
                logout,
            }}
        >

            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
