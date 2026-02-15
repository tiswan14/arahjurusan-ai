'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, CheckCircle2, Users, Clock, Zap, Star, GraduationCap, Brain, Target, Rocket } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'

export default function FinalCTASection() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3])

    return (
        <section ref={containerRef} className='relative py-32 bg-background border-t border-border overflow-hidden'>

            {/* Animated Decorative Elements */}
            <motion.div
                style={{ y: y1, opacity }}
                className='absolute -top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl'
            />
            <motion.div
                style={{ y: y2, opacity }}
                className='absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl'
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl'
            />

            {/* Floating Icons Background */}
            <div className='absolute inset-0 overflow-hidden'>
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className='absolute'
                        initial={{
                            // eslint-disable-next-line react-hooks/purity
                            x: Math.random() * window.innerWidth,
                            // eslint-disable-next-line react-hooks/purity
                            y: Math.random() * window.innerHeight,
                            rotate: 0
                        }}
                        animate={{
                            y: [null, -30, 30, -30],
                            rotate: 360
                        }}
                        transition={{
                            duration: 20 + i * 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <div className='text-primary/5'>
                            {i % 3 === 0 ? <Brain size={48} /> :
                                i % 3 === 1 ? <Target size={48} /> :
                                    <Rocket size={48} />}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className='relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>

                {/* Header dengan animasi yang lebih dinamis */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className='text-center'
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 cursor-default'
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Sparkles className='w-4 h-4' />
                        </motion.div>
                        <span className='text-sm font-medium'>Siap Menentukan Masa Depan?</span>
                    </motion.div>

                    <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight'>
                        Temukan Jurusan yang{' '}
                        <motion.span
                            className='block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'
                            animate={{
                                backgroundPosition: ['0%', '100%', '0%']
                            }}
                            transition={{ duration: 10, repeat: Infinity }}
                            style={{ backgroundSize: '200% auto' }}
                        >
                            Paling Cocok Untukmu
                        </motion.span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className='mt-6 text-lg text-muted-foreground/80 max-w-2xl mx-auto'
                    >
                        Hanya butuh 5 menit untuk mendapatkan rekomendasi jurusan berbasis AI
                        yang akurat dan personal. Ribuan siswa sudah merasakan manfaatnya.
                    </motion.p>
                </motion.div>

                {/* Feature Cards dengan animasi staggered yang lebih engaging */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className='mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto'
                >
                    {[
                        { icon: Clock, label: 'Hanya 5 Menit', desc: 'Tes cepat & efisien', color: 'from-blue-500/20 to-cyan-500/20' },
                        { icon: Users, label: '10rb+ Pengguna', desc: 'Telah menggunakan', color: 'from-purple-500/20 to-pink-500/20' },
                        { icon: Zap, label: 'Hasil Instan', desc: 'Langsung ditampilkan', color: 'from-amber-500/20 to-orange-500/20' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            whileHover={{
                                y: -8,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                            className='group relative'
                        >
                            {/* Hover effect background */}
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                style={{ filter: 'blur(12px)' }}
                            />

                            <div className='relative flex flex-col items-center p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300 backdrop-blur-sm'>
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className='w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform'
                                >
                                    <item.icon className='w-7 h-7 text-primary' />
                                </motion.div>
                                <motion.div
                                    className='font-semibold text-foreground text-lg'
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {item.label}
                                </motion.div>
                                <div className='text-sm text-muted-foreground/70'>{item.desc}</div>

                                {/* Animated border */}
                                <motion.div
                                    className='absolute inset-0 rounded-2xl border-2 border-primary/0'
                                    whileHover={{ borderColor: 'rgba(var(--primary), 0.3)' }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Button dengan efek yang lebih dinamis */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className='mt-12 text-center'
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='inline-block relative'
                    >
                        {/* Pulse effect */}
                        <motion.div
                            className='absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl'
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.1, 0.3]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        <Button
                            asChild
                            size='lg'
                            className='relative px-12 py-7 text-lg rounded-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden'
                        >
                            <Link href='/tes-minat' className='flex items-center gap-3'>
                                <motion.span
                                    animate={{
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <GraduationCap className='w-5 h-5' />
                                </motion.span>
                                <span className='relative z-10'>Mulai Tes Sekarang</span>
                                <motion.div
                                    animate={{ x: [0, 8, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                >
                                    <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                                </motion.div>

                                {/* Shine effect */}
                                <motion.div
                                    className='absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent'
                                    whileHover={{ translateX: ['100%', '-100%'] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Benefit list dengan animasi interaktif */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className='mt-8 flex flex-wrap items-center justify-center gap-6'
                >
                    {['Gratis', 'Tanpa Daftar', 'Hasil Instan', 'Akurat 95%'].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 + i * 0.1 }}
                            whileHover={{ scale: 1.1, x: 2 }}
                            className='flex items-center gap-2 text-sm text-muted-foreground/60 cursor-default'
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CheckCircle2 className='w-4 h-4 text-primary/50' />
                            </motion.div>
                            <span>{item}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Testimonial mini dengan animasi yang lebih menarik */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    className='mt-16 p-6 bg-gradient-to-r from-card/30 to-card/10 rounded-2xl border border-border max-w-2xl mx-auto backdrop-blur-sm'
                >
                    <div className='flex items-center gap-4'>
                        <div className='flex -space-x-2'>
                            {['RA', 'DP', 'BS', 'NS'].map((initial, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.9 + i * 0.1 }}
                                    whileHover={{ y: -4, scale: 1.1 }}
                                    className='w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 border-2 border-background flex items-center justify-center text-xs font-medium text-primary cursor-default'
                                >
                                    {initial}
                                </motion.div>
                            ))}

                            {/* Additional users indicator */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.3 }}
                                className='w-10 h-10 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-xs font-medium text-primary'
                            >
                                +99
                            </motion.div>
                        </div>

                        <motion.div
                            className='text-left'
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <div className='flex gap-0.5 mb-1'>
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1 + i * 0.05 }}
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                    >
                                        <Star
                                            className='w-4 h-4'
                                            style={{
                                                fill: 'url(#gold-gradient)',
                                                stroke: 'none'
                                            }}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            <motion.p
                                className='text-sm text-muted-foreground/70'
                                animate={{
                                    color: ['rgba(255,255,255,0.7)', 'rgba(255,215,0,0.7)', 'rgba(255,255,255,0.7)']
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <span className='font-semibold text-foreground'>4.9</span> dari 2rb+ ulasan
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* Animated progress bar */}
                    <motion.div
                        className='w-full h-1 bg-primary/10 rounded-full mt-4 overflow-hidden'
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ delay: 1.4, duration: 1 }}
                    >
                        <motion.div
                            className='h-full bg-gradient-to-r from-primary to-accent'
                            animate={{
                                x: ['-100%', '100%']
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* SVG Gradient Definition */}
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FBBF24" />
                        <stop offset="50%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>

                    <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(var(--primary))" />
                        <stop offset="100%" stopColor="rgb(var(--accent))" />
                    </linearGradient>
                </defs>
            </svg>
        </section>
    )
}