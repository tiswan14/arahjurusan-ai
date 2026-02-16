'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, LogIn, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { navigation } from './navigation'
import { useAuth } from '@/context/auth-context'

type Props = {
  open: boolean
}

export default function MobileNavigation({ open }: Props) {
  const pathname = usePathname()
  const { user, loading, logout } = useAuth()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  if (!open) return null

  const getInitials = (nama?: string) =>
    nama
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? ''

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className='md:hidden overflow-hidden bg-[#0a1929] border-t border-[#2563eb]/20'
    >
      <div className='px-4 py-3 space-y-1'>
        {navigation.map((item) => (
          <div key={item.name}>
            {item.dropdown ? (
              <div className='space-y-1'>
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === item.name ? null : item.name
                    )
                  }
                  className='flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-[#f1f5f9]/80 hover:text-[#2563eb] hover:bg-[#2563eb]/5 transition-all duration-200'
                >
                  <span className='text-xs font-medium'>
                    {item.name}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className='pl-4 pr-3 space-y-1 overflow-hidden'
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-3 py-2 rounded-lg text-xs ${pathname === subItem.href
                            ? 'bg-[#2563eb]/10 text-[#2563eb]'
                            : 'text-[#f1f5f9]/60 hover:text-[#2563eb] hover:bg-[#2563eb]/5'
                            }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg text-xs font-medium ${pathname === item.href
                  ? 'bg-[#2563eb]/10 text-[#2563eb]'
                  : 'text-[#f1f5f9]/80 hover:text-[#2563eb] hover:bg-[#2563eb]/5'
                  }`}
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}

        <div className='h-px bg-[#2563eb]/20 my-3' />

        <div className='space-y-3 px-3 pt-2'>
          {loading ? null : user ? (
            <div className='bg-[#2563eb]/5 border border-[#2563eb]/20 rounded-xl p-4 space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='flex items-center justify-center h-11 w-11 rounded-full bg-[#2563eb] text-white text-sm font-semibold'>
                  {getInitials(user.nama)}
                </div>

                <div className='flex flex-col'>
                  <span className='text-sm font-medium text-white'>
                    {user.nama}
                  </span>
                  <span className='text-xs text-[#f1f5f9]/60 capitalize'>
                    {user.role}
                  </span>
                </div>
              </div>

              <div className='h-px bg-[#2563eb]/10' />

              <div className='space-y-2'>
                <Button
                  asChild
                  variant='ghost'
                  className='w-full justify-start text-sm text-white hover:text-[#2563eb] hover:bg-[#2563eb]/10'
                >
                  <Link href='/profile'>Profil Saya</Link>
                </Button>

                <Button
                  asChild
                  variant='ghost'
                  className='w-full justify-start text-sm text-white hover:text-[#2563eb] hover:bg-[#2563eb]/10'
                >
                  <Link href='/tes-minat/riwayat'>
                    Riwayat Tes
                  </Link>
                </Button>

                <Button
                  variant='ghost'
                  onClick={logout}
                  className='w-full justify-start text-sm text-red-400 hover:text-red-500 hover:bg-red-500/10'
                >
                  <LogOut className='h-4 w-4 mr-2' />
                  Logout
                </Button>
              </div>

            </div>
          ) : (
            <Button
              asChild
              size='sm'
              className='w-full bg-[#2563eb] text-white text-sm h-10'
            >
              <Link
                href='/login'
                className='flex items-center justify-center gap-2 w-full'
              >
                <LogIn className='h-4 w-4' />
                Masuk
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
