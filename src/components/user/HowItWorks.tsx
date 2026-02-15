'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import {
    ClipboardList,
    BrainCircuit,
    Sparkles,
    TrendingUp,
    ArrowRight,
    CheckCircle2,
    Clock,
    Zap,
    Target,
    Rocket
} from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const steps = [
    {
        icon: ClipboardList,
        title: 'Isi Tes Minat',
        desc: 'Jawab beberapa pertanyaan sederhana tentang minat dan kemampuan kamu.',
        gradient: 'from-blue-500/20 to-blue-600/10',
        iconColor: 'text-blue-500',
        duration: '5-7 menit',
        tips: 'Jawab dengan jujur sesuai dirimu'
    },
    {
        icon: BrainCircuit,
        title: 'Analisis AI',
        desc: 'Sistem AI menganalisis jawaban berdasarkan data dan kebutuhan industri.',
        gradient: 'from-purple-500/20 to-purple-600/10',
        iconColor: 'text-purple-500',
        duration: 'Real-time',
        tips: 'AI memproses 50+ parameter'
    },
    {
        icon: Sparkles,
        title: 'Dapatkan Rekomendasi',
        desc: 'Kamu akan menerima jurusan yang paling sesuai dengan profilmu.',
        gradient: 'from-amber-500/20 to-amber-600/10',
        iconColor: 'text-amber-500',
        duration: 'Instan',
        tips: 'Top 3 jurusan terbaik'
    },
    {
        icon: TrendingUp,
        title: 'Lihat Prospek Karir',
        desc: 'Pelajari peluang kerja dan perkembangan karir dari jurusan tersebut.',
        gradient: 'from-emerald-500/20 to-emerald-600/10',
        iconColor: 'text-emerald-500',
        duration: 'Lengkap',
        tips: 'Data industri terkini'
    },
]

const stats = [
    { icon: Clock, label: 'Proses Cepat', value: '5-10 menit' },
    { icon: Zap, label: 'Akurasi AI', value: '95%' },
    { icon: Target, label: 'Jurusan', value: '150+' },
    { icon: Rocket, label: 'Pengguna', value: '10rb+' },
]

const MotionButton = motion(Button)

export default function HowItWorksSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeStep, setActiveStep] = useState<number | null>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -30])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 30])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.4, 0.2])

    return (
        <section ref={containerRef} className='relative py-24 sm:py-32 bg-background overflow-hidden border-t border-border'>

            {/* Animated Background Elements */}
            <motion.div
                style={{ y: y1, opacity }}
                className='absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl'
            />
            <motion.div
                style={{ y: y2, opacity }}
                className='absolute bottom-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl'
            />

            {/* Floating Particles */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className='absolute text-primary/5'
                        initial={{
                            x: Math.random() * 1000,
                            y: Math.random() * 800,
                            rotate: 0,
                            scale: 0.5 + Math.random() * 0.5
                        }}
                        animate={{
                            y: [null, -40, 40, -40],
                            rotate: 360,
                            x: [null, 20, -20, 20]
                        }}
                        transition={{
                            duration: 20 + i * 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {i % 2 === 0 ? <BrainCircuit size={40} /> : <Sparkles size={35} />}
                    </motion.div>
                ))}
            </div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

                {/* Header dengan animasi lebih dinamis */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className='text-center max-w-3xl mx-auto'
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
                        <span className='text-sm font-medium'>Cara Kerja</span>
                    </motion.div>

                    <h2 className='text-4xl sm:text-5xl font-bold text-foreground tracking-tight'>
                        Mulai Perjalananmu dalam{' '}
                        <motion.span
                            className='relative inline-block'
                            animate={{
                                backgroundPosition: ['0%', '100%', '0%']
                            }}
                            transition={{ duration: 10, repeat: Infinity }}
                            style={{ backgroundSize: '200% auto' }}
                        >
                            <span className='relative z-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                                4 Langkah Sederhana
                            </span>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className='absolute bottom-2 left-0 h-3 bg-primary/10 -z-10 rounded-lg'
                            />
                        </motion.span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className='mt-6 text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed'
                    >
                        Proses yang dirancang untuk membantumu menemukan jurusan impian
                        dengan cepat, akurat, dan menyenangkan.
                    </motion.p>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className='mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto'
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className='relative group'
                        >
                            <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm' />
                            <div className='relative p-4 bg-card/30 border border-border rounded-xl text-center backdrop-blur-sm'>
                                <stat.icon className='w-5 h-5 text-primary/70 mx-auto mb-2' />
                                <div className='text-lg font-bold text-foreground'>{stat.value}</div>
                                <div className='text-xs text-muted-foreground/60'>{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Steps dengan desain lebih interaktif */}
                <div className='relative mt-20'>
                    {/* Connecting Line dengan animasi */}
                    <div className='hidden lg:block absolute top-32 left-[12%] right-[12%] h-[2px]'>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className='w-full h-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 origin-left'
                            style={{ transformOrigin: 'left' }}
                        />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {steps.map((step, i) => {
                            const Icon = step.icon
                            const isActive = activeStep === i

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: i * 0.15 + 0.3 }}
                                    onHoverStart={() => setActiveStep(i)}
                                    onHoverEnd={() => setActiveStep(null)}
                                    className='group relative'
                                >
                                    {/* Card Utama dengan efek lebih premium */}
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className='relative h-full'
                                    >
                                        {/* Background dengan efek glassmorphism */}
                                        <div className='absolute inset-0 bg-gradient-to-b from-card to-card/50 rounded-3xl border border-border/50 shadow-lg backdrop-blur-sm' />

                                        {/* Hover Glow Effect */}
                                        <motion.div
                                            animate={{
                                                opacity: isActive ? 0.15 : 0,
                                                scale: isActive ? 1.05 : 1
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className='absolute inset-0 rounded-3xl'
                                            style={{
                                                background: `radial-gradient(circle at 50% 50%, ${step.iconColor.replace('text-', '')}40, transparent 70%)`
                                            }}
                                        />

                                        {/* Step Number dengan animasi */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.15 + 0.6, type: "spring" }}
                                            className='absolute -top-4 left-1/2 -translate-x-1/2 z-10'
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                className='relative'
                                            >
                                                <div className='w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-xl'>
                                                    <span className='text-white text-base font-bold'>
                                                        {i + 1}
                                                    </span>
                                                </div>
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.5, 1],
                                                        opacity: [0.5, 0, 0.5]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        delay: i * 0.2
                                                    }}
                                                    className='absolute inset-0 rounded-full bg-primary/20'
                                                />
                                            </motion.div>
                                        </motion.div>

                                        {/* Content */}
                                        <div className='relative p-8 pt-12 text-center'>
                                            {/* Icon dengan efek 3D */}
                                            <motion.div
                                                animate={{
                                                    rotateY: isActive ? 180 : 0,
                                                    scale: isActive ? 1.1 : 1
                                                }}
                                                transition={{ duration: 0.5 }}
                                                className='mb-6'
                                            >
                                                <div
                                                    className='w-24 h-24 mx-auto flex items-center justify-center rounded-2xl transition-all duration-500'
                                                    style={{
                                                        background: `linear-gradient(135deg, ${step.iconColor.replace('text-', '')}15, ${step.iconColor.replace('text-', '')}30)`,
                                                        boxShadow: isActive ? `0 20px 30px -10px ${step.iconColor.replace('text-', '')}40` : 'none'
                                                    }}
                                                >
                                                    <Icon className={`h-10 w-10 ${step.iconColor}`} />
                                                </div>
                                            </motion.div>

                                            {/* Title */}
                                            <h3 className='text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors'>
                                                {step.title}
                                            </h3>

                                            {/* Description */}
                                            <p className='text-sm text-muted-foreground/70 leading-relaxed mb-4'>
                                                {step.desc}
                                            </p>

                                            {/* Duration Badge */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.15 + 0.8 }}
                                                className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs text-primary/80'
                                            >
                                                <Clock className='w-3 h-3' />
                                                {step.duration}
                                            </motion.div>

                                            {/* Tips Tooltip */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                whileHover={{ opacity: 1, y: 0 }}
                                                className='absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card border border-border rounded-lg px-3 py-1.5 text-xs text-muted-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'
                                            >
                                                💡 {step.tips}
                                            </motion.div>

                                            {/* Decorative Elements */}
                                            <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700' />
                                        </div>
                                    </motion.div>

                                    {/* Mobile Connector */}
                                    {i < steps.length - 1 && (
                                        <div className='flex justify-center lg:hidden mt-4'>
                                            <motion.div
                                                animate={{ y: [0, 5, 0] }}
                                                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                                            >
                                                <ArrowRight className='w-5 h-5 text-muted-foreground/30 rotate-90' />
                                            </motion.div>
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Interactive Demo Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                    className='mt-20 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl border border-border/50'
                >
                    <div className='flex flex-col md:flex-row items-center gap-8'>
                        <div className='flex-1'>
                            <h3 className='text-2xl font-semibold text-foreground mb-3'>
                                Lihat Demo Langsung
                            </h3>
                            <p className='text-muted-foreground/70 mb-6'>
                                Tonton video singkat bagaimana proses tes bekerja dan lihat sendiri kemudahannya.
                            </p>
                            <div className='flex items-center gap-4'>
                                <div className='flex -space-x-2'>
                                    {['RA', 'DP', 'BS'].map((initial, i) => (
                                        <div
                                            key={i}
                                            className='w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 border-2 border-background flex items-center justify-center text-xs font-medium text-primary'
                                        >
                                            {initial}
                                        </div>
                                    ))}
                                </div>
                                <span className='text-sm text-muted-foreground/60'>
                                    +500 siswa telah mencoba
                                </span>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <div className='relative aspect-video bg-card rounded-xl border border-border overflow-hidden group cursor-pointer'>
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className='w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-xl'
                                    >
                                        <div className='w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1' />
                                    </motion.div>
                                </div>
                                <div className='absolute bottom-2 left-2 text-xs text-muted-foreground/60 bg-background/80 px-2 py-1 rounded'>
                                    👆 Klik untuk preview
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Enhanced CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, type: "spring", stiffness: 200 }}
                    className='mt-16 text-center'
                >
                    <div className='relative inline-block'>
                        {/* Pulse effect */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.1, 0.3]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className='absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-xl'
                        />

                        <MotionButton
                            asChild
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='relative px-10 py-7 rounded-2xl bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group'
                        >
                            <Link
                                href='/tes-minat'
                                className='inline-flex items-center gap-3 text-lg'
                            >
                                <span>Mulai Tes Sekarang</span>
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                                </motion.div>

                                {/* Shine effect */}
                                <motion.div
                                    className='absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent'
                                    animate={{
                                        translateX: ['100%', '-100%']
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />
                            </Link>
                        </MotionButton>
                    </div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2 }}
                        className='mt-6 flex flex-wrap items-center justify-center gap-6'
                    >
                        {['Gratis', 'Tanpa Daftar', 'Hasil Instan', 'Data Terupdate'].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.1 }}
                                className='flex items-center gap-2 text-sm text-muted-foreground/60'
                            >
                                <CheckCircle2 className='w-4 h-4 text-primary/50' />
                                <span>{item}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}