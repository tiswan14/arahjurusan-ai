'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { toast } from 'react-toastify'

export default function ProfileDropdown() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!user) return null

  const getInitials = (nama?: string) =>
    nama
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? ''

  const handleLogout = async () => {
    try {
      toast.success('Logout berhasil')
      await logout()
      router.replace('/login')
    } catch {
      toast.error('Logout gagal')
    }
  }

  return (
    <div ref={ref} className='relative'>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className='cursor-pointer flex items-center gap-2 h-10 px-4 rounded-full bg-[#2563eb] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition shadow-lg shadow-[#2563eb]/25'
      >
        {getInitials(user.nama)}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''
            }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className='absolute -right-1 mt-2 w-56 bg-[#0a1929] border border-[#2563eb]/20 rounded-xl shadow-2xl overflow-hidden z-50'
          >
            <div className='py-2'>
              <Button
                asChild
                variant='ghost'
                className='cursor-pointer w-full justify-start text-sm text-[#f1f5f9]/80 hover:text-[#2563eb] hover:bg-[#2563eb]/10'
              >
                <Link href='/profile'>
                  Profil Saya
                </Link>
              </Button>

              <Button
                asChild
                variant='ghost'
                className='w-full justify-start text-sm text-[#f1f5f9]/80 hover:text-[#2563eb] hover:bg-[#2563eb]/10'
              >
                <Link href='/tes-minat/riwayat'>
                  Riwayat Tes
                </Link>
              </Button>

              <div className='my-2 h-px bg-[#2563eb]/10' />

              <Button
                variant='ghost'
                onClick={handleLogout}
                className='w-full justify-start text-sm text-red-400 hover:text-red-500 hover:bg-red-500/10'
              >
                <LogOut className='h-4 w-4 mr-2' />
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
