'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LogIn,
    Menu,
    X,
    GraduationCap
} from 'lucide-react'
import { Button } from '../../ui/button'
import { useAuth } from '@/context/auth-context'
import DesktopNavigation from './dekstop-navigation'
import ProfileDropdown from './profile-dropdown'
import MobileNavigation from './mobile-navigation'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { user, loading } = useAuth()
    const [, setActiveDropdown] = useState<string | null>(null)
    const pathname = usePathname()
    const [, setOpenProfile] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu when route changes
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOpen(false)
        setActiveDropdown(null)
    }, [pathname])



    const profileRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setOpenProfile(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-[#0a1929] border-b border-[#2563eb]/20 shadow-lg'
                : 'bg-[#0a1929]'
                }`}
        >

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16 md:h-18'>
                    {/* Logo */}
                    <Link href='/' className='flex items-center gap-2 group'>
                        <div className='relative'>
                            {/* Icon dengan desain lebih modern */}
                            <div className='relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-lg shadow-lg shadow-[#2563eb]/25 group-hover:shadow-[#2563eb]/40 transition-all duration-300 group-hover:scale-110'>
                                <GraduationCap className='h-4 w-4 sm:h-5 sm:w-5 text-white' />
                            </div>
                            {/* Efek glow di belakang icon */}
                            <motion.div
                                className='absolute -inset-1 bg-[#2563eb]/20 rounded-lg blur-md -z-10'
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                        <span className='font-semibold text-sm sm:text-base text-white'>
                            Arah<span className='text-[#2563eb]'>Jurusan</span>
                        </span>
                    </Link>
                    {/* Desktop Navigation */}
                    <DesktopNavigation />

                    {/* Right Section - Auth Buttons */}
                    <div className='hidden md:flex items-center gap-3'>
                        {loading ? null : user ? (
                            <ProfileDropdown />
                        ) : (
                            <Button
                                asChild
                                size='default'
                                className='bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm h-10 px-6 shadow-lg shadow-[#2563eb]/25'
                            >
                                <Link href='/login' className='flex items-center gap-2'>
                                    <span>Masuk</span>
                                    <LogIn className='h-4 w-4' />
                                </Link>
                            </Button>
                        )}
                    </div>


                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className='md:hidden relative h-8 w-8 rounded-lg bg-[#2563eb]/10 text-[#2563eb] hover:bg-[#2563eb]/20 transition-all duration-300'
                        aria-label="Toggle menu"
                    >
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <Menu className={`absolute transition-all duration-300 ${open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                                }`} size={20} />
                            <X className={`absolute transition-all duration-300 ${open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                                }`} size={20} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {open && <MobileNavigation open={open} />}
            </AnimatePresence>

        </motion.nav>
    )
}