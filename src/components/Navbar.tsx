'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LogIn,
    Menu,
    X,
    ChevronDown,
    GraduationCap
} from 'lucide-react'
import { Button } from './ui/button'

const navigation = [
    { name: 'Beranda', href: '/' },
    {
        name: 'Jurusan',
        href: '/jurusan',
        dropdown: [
            { name: 'Rekayasa Perangkat Lunak', href: '/jurusan/rpl' },
            { name: 'Teknik Komputer Jaringan', href: '/jurusan/tkj' },
            { name: 'Multimedia', href: '/jurusan/multimedia' },
            { name: 'Akuntansi', href: '/jurusan/akuntansi' },
            { name: 'Pemasaran', href: '/jurusan/pemasaran' },
            { name: 'Semua Jurusan', href: '/jurusan' },
        ]
    },
    { name: 'Tes Minat', href: '/tes-minat' },
    { name: 'Mitra Industri', href: '/mitra' },
    { name: 'Tentang', href: '/tentang' },
    { name: 'Kontak', href: '/kontak' },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const pathname = usePathname()

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
                    <div className='hidden md:flex items-center gap-1'>
                        {navigation.map((item) => (
                            <div
                                key={item.name}
                                className='relative'
                                onMouseEnter={() => setActiveDropdown(item.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                {item.dropdown ? (
                                    <>
                                        <button
                                            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${pathname.startsWith(item.href)
                                                ? 'text-[#2563eb] bg-[#2563eb]/10'
                                                : 'text-[#f1f5f9]/80 hover:text-[#2563eb] hover:bg-[#2563eb]/5'
                                                }`}
                                        >
                                            <span>{item.name}</span>
                                            <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''
                                                }`} />
                                        </button>

                                        <AnimatePresence>
                                            {activeDropdown === item.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className='absolute top-full left-0 mt-1 w-48 bg-[#0a1929] border border-[#2563eb]/20 rounded-lg shadow-xl backdrop-blur-md overflow-hidden'
                                                >
                                                    <div className='py-1'>
                                                        {item.dropdown.map((subItem) => (
                                                            <Link
                                                                key={subItem.name}
                                                                href={subItem.href}
                                                                className={`block px-3 py-2 text-xs transition-all duration-200 ${pathname === subItem.href
                                                                    ? 'bg-[#2563eb]/10 text-[#2563eb]'
                                                                    : 'text-[#f1f5f9]/70 hover:bg-[#2563eb]/5 hover:text-[#2563eb]'
                                                                    }`}
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`inline-block px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${pathname === item.href
                                            ? 'text-[#2563eb] bg-[#2563eb]/10'
                                            : 'text-[#f1f5f9]/80 hover:text-[#2563eb] hover:bg-[#2563eb]/5'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Section - Auth Buttons */}
                    <div className='hidden md:flex items-center gap-2'>
                        <Button
                            asChild
                            variant='ghost'
                            size='sm'
                            className='text-[#f1f5f9]/80 hover:text-[#2563eb] hover:bg-[#2563eb]/10 text-xs h-8 px-3'
                        >
                        </Button>
                        <Button
                            asChild
                            size='sm'
                            className='bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs h-8 px-3 shadow-lg shadow-[#2563eb]/25'
                        >
                            <Link href='/login' className='flex items-center gap-1.5'>
                                <LogIn className='h-3.5 w-3.5' />
                                <span>Masuk</span>
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className='md:hidden relative h-8 w-8 rounded-lg bg-[#2563eb]/10 text-[#2563eb] hover:bg-[#2563eb]/20 transition-all duration-300'
                        aria-label="Toggle menu"
                    >
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <Menu className={`absolute transition-all duration-300 ${open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                                }`} size={16} />
                            <X className={`absolute transition-all duration-300 ${open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                                }`} size={16} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {open && (
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
                                                onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                                                className='flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-[#f1f5f9]/80 hover:text-[#2563eb] hover:bg-[#2563eb]/5 transition-all duration-200'
                                            >
                                                <span className='text-xs font-medium'>{item.name}</span>
                                                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''
                                                    }`} />
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
                                                                className={`block px-3 py-2 rounded-lg text-xs transition-all duration-200 ${pathname === subItem.href
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
                                            className={`flex items-center px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${pathname === item.href
                                                ? 'bg-[#2563eb]/10 text-[#2563eb]'
                                                : 'text-[#f1f5f9]/80 hover:text-[#2563eb] hover:bg-[#2563eb]/5'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}

                            {/* Divider */}
                            <div className='h-px bg-[#2563eb]/20 my-3' />

                            {/* Mobile Auth Buttons */}
                            <div className='space-y-2 px-3 pt-1'>
                                <Button
                                    asChild
                                    size='sm'
                                    className='w-full justify-start gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs h-9'
                                >
                                    <Link href='/login'>
                                        <LogIn className='h-3.5 w-3.5' />
                                        <span>Masuk</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}