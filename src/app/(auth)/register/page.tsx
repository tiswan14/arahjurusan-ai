'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, GraduationCap, EyeOff, Eye, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

type RegisterResponse = {
    message?: string
}

const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))


const RegisterPage = () => {
    const router = useRouter()
    const abortRef = useRef<AbortController | null>(null)

    const [nama, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null)
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

        // Validasi password match
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

            // Jalankan fetch + delay 1 detik bersamaan
            const [res] = await Promise.all([
                resPromise,
                delay(1000),
            ])

            const data = (await res.json()) as RegisterResponse

            if (!res.ok) {
                throw new Error(data?.message ?? 'Registrasi gagal')
            }

            toast.success('Registrasi berhasil')

            // Kasih sedikit delay supaya toast terlihat
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
            <div className='flex-1 h-screen lg:min-h-screen flex items-center justify-center px-6 lg:px-16 xl:px-24 bg-background overflow-hidden'>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className='w-full max-w-md lg:max-w-lg xl:max-w-xl'
                >
                    {/* Mobile Branding */}
                    <div className='lg:hidden text-center mb-4'>
                        <div className='w-16 h-16 mx-auto rounded-xl bg-primary/10 backdrop-blur flex items-center justify-center mb-3'>
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
                        <h1 className='text-4xl font-bold text-primary'>Daftar</h1>
                        <p className='text-muted-foreground mt-3 text-base'>
                            Silakan daftar untuk membuat akun baru
                        </p>
                    </div>


                    {/* Card */}
                    <Card className='bg-card border-border shadow-xl rounded-[var(--radius)]'>
                        <CardContent className='p-5 lg:p-10 space-y-4 lg:space-y-6'>
                            <form onSubmit={handleSubmit} className='space-y-4 lg:space-y-6'>
                                {/* Nama Lengkap */}
                                <div className='relative'>
                                    <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none' />
                                    <Input
                                        type='text'
                                        required
                                        autoComplete='nama'
                                        value={nama}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Masukan Nama Lengkap'
                                        className='pl-10 bg-background border-border focus-visible:ring-primary focus-visible:ring-2'
                                    />
                                </div>

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
                                        autoComplete='new-password'
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

                                {/* Confirm Password */}
                                <div className='relative'>
                                    <Lock className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none' />

                                    <Input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        autoComplete='new-password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder='Konfirmasi Password'
                                        className='pl-11 pr-12 bg-background border-border focus-visible:ring-primary focus-visible:ring-2'
                                    />

                                    <button
                                        type='button'
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className='absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary transition'
                                    >
                                        {showConfirmPassword ? (
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
                                            Daftar
                                            <ArrowRight className='w-4 h-4 ml-2' />
                                        </>
                                    )}
                                </Button>

                            </form>

                            <p className='text-sm text-center text-muted-foreground'>
                                Sudah punya akun?{' '}
                                <Link
                                    href='/login'
                                    className='text-primary hover:underline font-medium'
                                >
                                    Masuk sekarang
                                </Link>
                            </p>

                        </CardContent>
                    </Card>


                </motion.div>
            </div>

        </div>
    )
}

export default RegisterPage