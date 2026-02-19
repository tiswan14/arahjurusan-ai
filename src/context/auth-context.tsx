'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { AuthUser } from '@/types/auth'
import { toast } from 'react-toastify'

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
    type LogoutResponse = {
        message: string
    }

    const sleep = (ms: number): Promise<void> =>
        new Promise((resolve) => setTimeout(resolve, ms))

    const logout = async (): Promise<void> => {
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            })

            if (!res.ok) {
                throw new Error('Logout request failed')
            }

            const data: LogoutResponse = await res.json()

            setUser(null)
            toast.success(data.message ?? 'Berhasil logout')

            await sleep(1000)

            window.location.href = '/login'
        } catch {
            toast.error('Gagal logout')
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
