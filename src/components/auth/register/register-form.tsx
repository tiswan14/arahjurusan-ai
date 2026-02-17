'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Mail, Lock, ArrowRight, EyeOff, Eye, User } from 'lucide-react'
import Link from 'next/link'
import { useRegister } from './use-register'

export const RegisterForm = () => {
  const {
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
  } = useRegister()

  return (
    <Card className='bg-card border-border shadow-xl rounded-[var(--radius)]'>
      <CardContent className='p-5 lg:p-10 space-y-6'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='relative'>
            <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none' />
            <Input
              type='text'
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder='Masukan Nama Lengkap'
              className='pl-10 bg-background border-border focus-visible:ring-primary focus-visible:ring-2'
            />
          </div>

          <div className='relative'>
            <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none' />
            <Input
              type='email'
              required
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

          <div className='relative'>
            <Lock className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none' />
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Konfirmasi Password'
              className='pl-11 pr-12 bg-background border-border focus-visible:ring-primary focus-visible:ring-2'
            />

            <button
              type='button'
              onClick={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              className='absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary transition'
            >
              {showConfirmPassword ? (
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
  )
}
