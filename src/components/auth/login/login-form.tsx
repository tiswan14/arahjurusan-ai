'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Mail, Lock, ArrowRight, EyeOff, Eye } from 'lucide-react'
import Link from 'next/link'
import { useLogin } from './use-login'

export const LoginForm = () => {
  const {
    email,
    password,
    loading,
    showPassword,
    setEmail,
    setPassword,
    setShowPassword,
    handleSubmit,
  } = useLogin()

  return (
    <Card className='bg-card border-border shadow-xl rounded-[var(--radius)]'>
      <CardContent className='px-6 py-10 lg:p-10 space-y-6'>
        <form onSubmit={handleSubmit} className='space-y-6'>
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
  )
}
