'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

type LoginResponse = {
  message?: string
  role: 'admin' | 'user'
}

export const useLogin = () => {
  const router = useRouter()
  const { refetch } = useAuth()
  const abortRef = useRef<AbortController | null>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    return () => {
      abortRef.current?.abort()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (loading) return

    setLoading(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
        signal: controller.signal,
      })

      const data = (await res.json()) as LoginResponse

      if (!res.ok) {
        throw new Error(data?.message ?? 'Login gagal')
      }

      toast.success('Login berhasil')

      await refetch()

      router.replace(data.role === 'admin' ? '/dashboard' : '/')
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return

      const message =
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan saat login'

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    password,
    loading,
    showPassword,
    setEmail,
    setPassword,
    setShowPassword,
    handleSubmit,
  }
}
