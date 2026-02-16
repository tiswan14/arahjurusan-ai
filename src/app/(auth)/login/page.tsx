'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/auth-context'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, GraduationCap, EyeOff, Eye } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

type LoginResponse = {
    message?: string
    role: 'admin' | 'user'
}

const LoginPage = () => {
    const router = useRouter()
    const abortRef = useRef<AbortController | null>(null)
    const { refetch } = useAuth()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null)
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

            if (data.role === 'admin') {
                router.replace('/dashboard')
            } else {
                router.replace('/')
            }
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

    return (
        <div className='min-h-screen flex bg-background text-foreground'>
            {/* Left Section */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className='hidden lg:flex lg:w-1/2 relative overflow-hidden bg-background'
            >
                {/* Divider */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className='absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-border to-transparent'
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='relative z-10 flex flex-col justify-center items-center w-full p-16 text-center space-y-6'
                >
                    <div className='w-24 h-24 rounded-2xl bg-primary/10 backdrop-blur flex items-center justify-center'>
                        <GraduationCap className='w-12 h-12 text-primary' />
                    </div>

                    <h2 className='text-4xl font-bold text-primary'>
                        ArahJurusan AI
                    </h2>

                    <p className='text-muted-foreground max-w-md'>
                        Platform berbasis AI untuk membantu kamu menemukan jurusan kuliah yang sesuai dengan minat, bakat, dan potensi diri secara terukur dan objektif.
                    </p>
                </motion.div>

            </motion.div>

            {/* Right Section */}
            <div className='flex-1 flex items-center justify-center px-6 lg:px-16 xl:px-24 bg-background relative overflow-hidden'>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className='w-full max-w-md lg:max-w-lg xl:max-w-xl'
                >
                    {/* Mobile Branding */}
                    <div className='lg:hidden text-center mb-8 mt-12'>
                        <div className='w-16 h-16 mx-auto rounded-xl bg-primary/10 backdrop-blur flex items-center justify-center mb-4'>
                            <GraduationCap className='w-8 h-8 text-primary' />
                        </div>

                        <h1 className='text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                            ArahJurusan AI
                        </h1>

                        <p className='text-sm text-muted-foreground mt-2'>
                            Temukan jurusan yang sesuai dengan potensimu
                        </p>
                    </div>

                    {/* Desktop Title */}
                    <div className='hidden lg:block mb-10 text-center'>
                        <h1 className='text-4xl font-bold text-primary'>Masuk</h1>
                        <p className='text-muted-foreground mt-3 text-base'>
                            Silakan login untuk melanjutkan
                        </p>
                    </div>

                    {/* Card */}
                    <Card className='bg-card border-border shadow-xl rounded-[var(--radius)]'>
                        <CardContent className='px-6 py-10 lg:p-10 space-y-5 lg:space-y-6'>
                            <form onSubmit={handleSubmit} className='space-y-6'>
                                {/* Email */}
                                <div className='relative'>
                                    <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none' />
                                    <Input
                                        type='email'
                                        required
                                        autoComplete='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Masukan Email'
                                        className='pl-10 bg-background border-border focus-visible:ring-primary focus-visible:ring-2'
                                    />
                                </div>

                                {/* Password */}
                                <div className='relative'>
                                    <Lock className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none' />

                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        autoComplete='current-password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Masukan Password'
                                        className='pl-11 pr-12 bg-background border-border focus-visible:ring-primary focus-visible:ring-2'
                                    />

                                    <button
                                        type='button'
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className='absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary transition'
                                    >
                                        {showPassword ? (
                                            <EyeOff className='w-4 h-4' />
                                        ) : (
                                            <Eye className='w-4 h-4' />
                                        )}
                                    </button>
                                </div>



                                {error && (
                                    <div className='text-sm text-error bg-error/10 border border-error/30 rounded-[var(--radius)] p-3'>
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type='submit'
                                    disabled={loading}
                                    className='w-full bg-primary text-primary-foreground hover:opacity-90'
                                >
                                    {loading ? (
                                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                                    ) : (
                                        <>
                                            Masuk
                                            <ArrowRight className='w-4 h-4 ml-2' />
                                        </>
                                    )}
                                </Button>

                            </form>

                            <p className='text-sm text-center text-muted-foreground'>
                                Belum punya akun?{' '}
                                <Link
                                    href='/register'
                                    className='text-primary hover:underline font-medium'
                                >
                                    Daftar sekarang
                                </Link>
                            </p>

                        </CardContent>
                    </Card>

                </motion.div>
            </div>

        </div>
    )
}

export default LoginPage
