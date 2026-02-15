/* eslint-disable react-hooks/purity */
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import {
    Brain,
    Target,
    BarChart3,
    ShieldCheck,
    Clock,
    Users,
    Sparkles,
    CheckCircle2,
    Award,
    TrendingUp,
    Zap,
    Rocket} from 'lucide-react'

const features = [
    {
        icon: Brain,
        title: 'AI Berbasis Data',
        desc: 'Algoritma cerdas menganalisis minat dan bakat siswa dengan akurasi tinggi.',
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        gradient: 'from-blue-500/20 to-blue-600/5',
        stats: '95% akurasi',
        iconBg: 'bg-blue-500'
    },
    {
        icon: Target,
        title: 'Rekomendasi Tepat Sasaran',
        desc: 'Personalisasi berdasarkan profil dan kebutuhan industri terkini.',
        color: 'text-violet-400',
        bg: 'bg-violet-500/10',
        gradient: 'from-violet-500/20 to-violet-600/5',
        stats: '150+ jurusan',
        iconBg: 'bg-violet-500'
    },
    {
        icon: BarChart3,
        title: 'Analisis Prospek Karir',
        desc: 'Menampilkan peluang kerja, gaji, dan perkembangan karir masa depan.',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        gradient: 'from-emerald-500/20 to-emerald-600/5',
        stats: 'Update real-time',
        iconBg: 'bg-emerald-500'
    },
    {
        icon: ShieldCheck,
        title: 'Data Terverifikasi',
        desc: 'Referensi kurikulum dan kebutuhan industri aktual dari sumber terpercaya.',
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        gradient: 'from-cyan-500/20 to-cyan-600/5',
        stats: '100% terpercaya',
        iconBg: 'bg-cyan-500'
    },
    {
        icon: Clock,
        title: 'Proses Cepat',
        desc: 'Rekomendasi jurusan dalam hitungan menit, hasil langsung ditampilkan.',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        gradient: 'from-amber-500/20 to-amber-600/5',
        stats: '5-10 menit',
        iconBg: 'bg-amber-500'
    },
    {
        icon: Users,
        title: 'Digunakan Ribuan Siswa',
        desc: 'Telah membantu banyak siswa menentukan jurusan dengan percaya diri.',
        color: 'text-rose-400',
        bg: 'bg-rose-500/10',
        gradient: 'from-rose-500/20 to-rose-600/5',
        stats: '10rb+ pengguna',
        iconBg: 'bg-rose-500'
    },
]

const highlights = [
    { icon: Award, label: 'Terpercaya', value: 'Sejak 2023' },
    { icon: TrendingUp, label: 'Tingkat Kepuasan', value: '98%' },
    { icon: Zap, label: 'Kecepatan', value: 'Real-time' },
    { icon: Rocket, label: 'Inovasi', value: 'AI Terkini' },
]

export default function WhySection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [activeFeature, setActiveFeature] = useState<number | null>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -30])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 30])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.4, 0.2])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

    return (
        <section ref={sectionRef} className='relative py-20 sm:py-28 bg-background border-t border-border overflow-hidden'>

            {/* Animated Background Elements */}
            <motion.div
                style={{ y: y1, opacity }}
                className='absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl'
            />
            <motion.div
                style={{ y: y2, opacity }}
                className='absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl'
            />
            <motion.div
                style={{ scale }}
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl'
            />

            {/* Floating Particles */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className='absolute text-primary/5'
                        initial={{
                             
                            x: Math.random() * 1200,
                            y: Math.random() * 800,
                            rotate: 0,
                            scale: 0.3 + Math.random() * 0.4
                        }}
                        animate={{
                            y: [null, -50, 50, -50],
                            rotate: 360,
                            x: [null, 30, -30, 30]
                        }}
                        transition={{
                            duration: 15 + i * 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {i % 2 === 0 ? <Brain size={30} /> : <Target size={25} />}
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
                            <Sparkles className='h-4 w-4' />
                        </motion.div>
                        <span className='text-sm font-medium'>Kenapa Memilih Kami</span>
                    </motion.div>

                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground'>
                        Kenapa Pilih{' '}
                        <motion.span
                            className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block'
                            animate={{
                                backgroundPosition: ['0%', '100%', '0%']
                            }}
                            transition={{ duration: 10, repeat: Infinity }}
                            style={{ backgroundSize: '200% auto' }}
                        >
                            ArahJurusan AI
                        </motion.span>
                        ?
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className='mt-6 text-base sm:text-lg text-muted-foreground'
                    >
                        Sistem berbasis AI yang membantu siswa menentukan jurusan
                        secara objektif, cepat, dan berbasis data.
                    </motion.p>
                </motion.div>

                {/* Highlights Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className='mt-12 flex flex-wrap justify-center gap-6'
                >
                    {highlights.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className='flex items-center gap-3 px-4 py-2 bg-card/50 rounded-xl border border-border'
                        >
                            <item.icon className='w-4 h-4 text-primary' />
                            <div>
                                <span className='text-sm font-semibold text-foreground'>{item.value}</span>
                                <span className='text-xs text-muted-foreground/60 ml-1'>{item.label}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Features Grid */}
                <div className='mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {features.map((feature, i) => {
                        const Icon = feature.icon
                        const isActive = activeFeature === i

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                onHoverStart={() => setActiveFeature(i)}
                                onHoverEnd={() => setActiveFeature(null)}
                                className='group relative'
                            >
                                {/* Card dengan efek lebih premium */}
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className='relative h-full'
                                >
                                    {/* Background dengan efek glassmorphism */}
                                    <div className='absolute inset-0 bg-gradient-to-b from-card to-card/50 rounded-2xl border border-border/50 shadow-lg backdrop-blur-sm' />

                                    {/* Hover Glow Effect */}
                                    <motion.div
                                        animate={{
                                            opacity: isActive ? 0.2 : 0,
                                            scale: isActive ? 1.05 : 1
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className='absolute inset-0 rounded-2xl'
                                        style={{
                                            background: `radial-gradient(circle at 50% 50%, ${feature.color.replace('text-', '')}40, transparent 70%)`
                                        }}
                                    />

                                    {/* Content */}
                                    <div className='relative p-8'>
                                        {/* Icon dengan animasi 3D */}
                                        <motion.div
                                            animate={{
                                                rotateY: isActive ? 180 : 0,
                                                scale: isActive ? 1.1 : 1
                                            }}
                                            transition={{ duration: 0.5 }}
                                            className='relative mb-6'
                                        >
                                            <div className={`w-16 h-16 flex items-center justify-center rounded-xl ${feature.bg} group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className={`h-7 w-7 ${feature.color}`} />
                                            </div>

                                            {/* Stats Badge */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 + 0.3 }}
                                                className='absolute -top-2 -right-2 px-2 py-1 bg-primary text-white text-xs rounded-full shadow-lg'
                                            >
                                                {feature.stats}
                                            </motion.div>
                                        </motion.div>

                                        {/* Title dengan efek hover */}
                                        <h3 className='text-lg font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors'>
                                            {feature.title}
                                        </h3>

                                        {/* Description */}
                                        <p className='text-muted-foreground text-sm leading-relaxed'>
                                            {feature.desc}
                                        </p>

                                        {/* Feature List */}
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: isActive ? 1 : 0,
                                                height: isActive ? 'auto' : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className='mt-4 overflow-hidden'
                                        >
                                            <div className='space-y-2 pt-4 border-t border-border/50'>
                                                <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                                                    <CheckCircle2 className='w-3 h-3 text-primary' />
                                                    <span>Akurasi tinggi</span>
                                                </div>
                                                <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                                                    <CheckCircle2 className='w-3 h-3 text-primary' />
                                                    <span>Update berkala</span>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Decorative Elements */}
                                        <div className='absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700' />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}