'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

type RegisterResponse = {
  message?: string
}

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const useRegister = () => {
  const router = useRouter()
  const abortRef = useRef<AbortController | null>(null)

  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    return () => {
      abortRef.current?.abort()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (loading) return

    if (password !== confirmPassword) {
      toast.error('Password dan konfirmasi password tidak cocok')
      return
    }

    setLoading(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const resPromise = fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          nama,
          email,
          password,
        }),
        signal: controller.signal,
      })

      const [res] = await Promise.all([
        resPromise,
        delay(1000),
      ])

      const data = (await res.json()) as RegisterResponse

      if (!res.ok) {
        throw new Error(data?.message ?? 'Registrasi gagal')
      }

      toast.success('Registrasi berhasil')

      await delay(800)

      router.replace('/login')
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return

      const message =
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan saat registrasi'

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    nama,
    email,
    password,
    confirmPassword,
    loading,
    showPassword,
    showConfirmPassword,
    setNama,
    setEmail,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleSubmit,
  }
}
