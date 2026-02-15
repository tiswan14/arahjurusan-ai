'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
    GraduationCap,
    Mail,
    Phone,
    MapPin,
    Instagram,
    Twitter,
    Linkedin,
    Sparkles,
    Heart,
    ArrowUpRight,
    ChevronRight,
    BookOpen,
    Target,
    Rocket
} from 'lucide-react'

export default function Footer() {
    const footerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, 0])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])

    return (
        <footer ref={footerRef} className='relative bg-background border-t border-border overflow-hidden'>

            {/* Decorative Background Elements */}
            <div className='absolute inset-0 overflow-hidden'>
                <motion.div
                    style={{ y, opacity }}
                    className='absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl'
                />
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
                    className='absolute -bottom-40 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl'
                />

                {/* Floating Particles */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className='absolute text-primary/5'
                        initial={{
                            // eslint-disable-next-line react-hooks/purity
                            x: Math.random() * 1000,
                            // eslint-disable-next-line react-hooks/purity
                            y: Math.random() * 500,
                            rotate: 0
                        }}
                        animate={{
                            y: [null, -20, 20, -20],
                            rotate: 360
                        }}
                        transition={{
                            duration: 15 + i * 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {i === 0 ? <GraduationCap size={32} /> :
                            i === 1 ? <Target size={28} /> :
                                <Rocket size={30} />}
                    </motion.div>
                ))}
            </div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
                {/* Main Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>

                    {/* Brand - lebih lebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className='lg:col-span-4'
                    >
                        <motion.div
                            whileHover={{ x: 4 }}
                            className='flex items-center gap-3 mb-6'
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className='w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center'
                            >
                                <GraduationCap className='w-6 h-6 text-primary' />
                            </motion.div>
                            <span className='text-xl font-semibold text-foreground'>
                                ArahJurusan AI
                            </span>
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, -10, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <Sparkles className='w-4 h-4 text-primary/50' />
                            </motion.div>
                        </motion.div>

                        <p className='text-muted-foreground leading-relaxed text-sm mb-6'>
                            Platform berbasis AI untuk membantu siswa menemukan jurusan
                            yang sesuai dengan minat, bakat, dan prospek karir masa depan.
                        </p>

                        {/* Social Links with animation */}
                        <div className='flex items-center gap-3'>
                            {[
                                { icon: Instagram, color: 'hover:bg-pink-500/10' },
                                { icon: Twitter, color: 'hover:bg-blue-500/10' },
                                { icon: Linkedin, color: 'hover:bg-blue-700/10' }
                            ].map((social, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                    whileHover={{
                                        y: -4,
                                        scale: 1.1,
                                        transition: { type: "spring", stiffness: 300 }
                                    }}
                                    className={`w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center cursor-pointer group ${social.color}`}
                                >
                                    <social.icon className='w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors' />
                                </motion.div>
                            ))}
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className='mt-6 flex items-center gap-4'
                        >
                            <div>
                                <div className='text-2xl font-bold text-foreground'>10k+</div>
                                <div className='text-xs text-muted-foreground'>Siswa Terbantu</div>
                            </div>
                            <div className='w-px h-8 bg-border' />
                            <div>
                                <div className='text-2xl font-bold text-foreground'>150+</div>
                                <div className='text-xs text-muted-foreground'>Jurusan</div>
                            </div>
                            <div className='w-px h-8 bg-border' />
                            <div>
                                <div className='text-2xl font-bold text-foreground'>95%</div>
                                <div className='text-xs text-muted-foreground'>Akurasi</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Navigation dengan icon */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className='lg:col-span-2'
                    >
                        <h4 className='text-sm font-semibold text-foreground mb-6 flex items-center gap-2'>
                            <span className='w-1 h-4 bg-primary rounded-full' />
                            Navigasi
                        </h4>
                        <div className='space-y-3 text-sm'>
                            {['Beranda', 'Jurusan', 'Tes Minat', 'Tentang Kami', 'Kontak'].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + i * 0.05 }}
                                    whileHover={{ x: 4 }}
                                >
                                    <Link
                                        href={i === 0 ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                        className='group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors'
                                    >
                                        <ChevronRight className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity' />
                                        <span>{item}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Resources dengan icon */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='lg:col-span-2'
                    >
                        <h4 className='text-sm font-semibold text-foreground mb-6 flex items-center gap-2'>
                            <span className='w-1 h-4 bg-accent rounded-full' />
                            Resources
                        </h4>
                        <div className='space-y-3 text-sm'>
                            {[
                                { name: 'Blog', icon: BookOpen },
                                { name: 'Panduan Karir', icon: Target },
                                { name: 'FAQ', icon: Heart },
                                { name: 'Kebijakan Privasi', icon: ChevronRight },
                                { name: 'Syarat & Ketentuan', icon: ChevronRight }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.05 }}
                                    whileHover={{ x: 4 }}
                                >
                                    <Link
                                        href='#'
                                        className='group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors'
                                    >
                                        <item.icon className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity' />
                                        <span>{item.name}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact dengan animasi */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='lg:col-span-4'
                    >
                        <h4 className='text-sm font-semibold text-foreground mb-6 flex items-center gap-2'>
                            <span className='w-1 h-4 bg-primary rounded-full' />
                            Kontak
                        </h4>

                        <div className='space-y-4'>
                            {[
                                { icon: Mail, text: 'support@arahjurusan.ai', link: 'mailto:support@arahjurusan.ai' },
                                { icon: Phone, text: '+62 812 3456 7890', link: 'tel:+6281234567890' },
                                { icon: MapPin, text: 'Jakarta, Indonesia', link: '#' }
                            ].map((item, i) => (
                                <motion.a
                                    key={i}
                                    href={item.link}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    whileHover={{ x: 4 }}
                                    className='flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group'
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                        className='w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors'
                                    >
                                        <item.icon className='w-4 h-4 text-primary' />
                                    </motion.div>
                                    <span>{item.text}</span>
                                    <ArrowUpRight className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity' />
                                </motion.a>
                            ))}
                        </div>

                        {/* Map Preview */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            className='mt-6 p-3 bg-primary/5 rounded-xl border border-border/50'
                        >
                            <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                                <MapPin className='w-3 h-3 text-primary' />
                                <span>Head Office: Jakarta Selatan, DKI Jakarta</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom Bar dengan animasi yang lebih menarik */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className='mt-16 pt-8 border-t border-border'
                >
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                        <motion.p
                            whileHover={{ scale: 1.02 }}
                            className='text-sm text-muted-foreground'
                        >
                            © {new Date().getFullYear()} ArahJurusan AI. All rights reserved.
                        </motion.p>

                        <motion.div
                            className='flex items-center gap-2 text-xs text-muted-foreground/60'
                            whileHover={{ scale: 1.02 }}
                        >
                            <span>Made with</span>
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <Heart className='w-3 h-3 text-red-500 fill-red-500' />
                            </motion.div>
                            <span>for better education</span>
                        </motion.div>

                        {/* Quick links */}
                        <div className='flex gap-4 text-xs text-muted-foreground/60'>
                            <Link href='#' className='hover:text-primary transition-colors'>Privacy</Link>
                            <Link href='#' className='hover:text-primary transition-colors'>Terms</Link>
                            <Link href='#' className='hover:text-primary transition-colors'>Cookies</Link>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <motion.div
                        className='w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mt-4'
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 1 }}
                    />
                </motion.div>
            </div>
        </footer>
    )
}