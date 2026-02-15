/* eslint-disable react-hooks/purity */
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Star, Quote, Users, Award, ChevronRight, MessageCircle, Sparkles, TrendingUp, Heart } from 'lucide-react'

const testimonials = [
    {
        name: 'Rafi Ahmad',
        role: 'Siswa SMK RPL',
        content: 'ArahJurusan AI membantu saya menentukan jurusan sesuai minat dan kemampuan saya. Sekarang saya lebih percaya diri menghadapi masa depan.',
        avatar: 'RA',
        rating: 5,
        date: '2 minggu lalu',
        verified: true
    },
    {
        name: 'Dinda Putri',
        role: 'Siswa SMP',
        content: 'Tesnya cepat dan hasilnya sangat jelas. Saya jadi lebih yakin dengan pilihan saya. Rekomendasi jurusannya sangat sesuai dengan kepribadian saya.',
        avatar: 'DP',
        rating: 5,
        date: '1 bulan lalu',
        verified: true
    },
    {
        name: 'Budi Santoso',
        role: 'Orang Tua',
        content: 'Platform ini sangat membantu anak saya menentukan jurusan berbasis data. Analisisnya komprehensif dan mudah dipahami.',
        avatar: 'BS',
        rating: 5,
        date: '3 minggu lalu',
        verified: true
    },
    {
        name: 'Nabila Sari',
        role: 'Siswa SMK TKJ',
        content: 'Rekomendasinya akurat dan sesuai dengan minat saya di bidang teknologi. Sekarang saya tahu harus fokus belajar apa.',
        avatar: 'NS',
        rating: 5,
        date: '2 minggu lalu',
        verified: true
    },
    {
        name: 'Andi Pratama',
        role: 'Siswa SMP',
        content: 'Tampilan aplikasinya mudah digunakan dan prosesnya tidak membingungkan. Cocok untuk siswa yang baru pertama kali coba tes minat.',
        avatar: 'AP',
        rating: 4,
        date: '1 minggu lalu',
        verified: false
    },
    {
        name: 'Maya Lestari',
        role: 'Orang Tua',
        content: 'Saya merasa lebih tenang karena pilihan jurusan anak saya didukung analisis AI. Terima kasih ArahJurusan!',
        avatar: 'ML',
        rating: 5,
        date: '1 bulan lalu',
        verified: true
    },
]

export default function TestimonialSection() {
    const sectionRef = useRef(null)
    const [] = useState(0)
    const [showAll, setShowAll] = useState(false)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3])

    const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 3)

    return (
        <section ref={sectionRef} className='relative py-28 bg-background border-t border-border overflow-hidden'>

            {/* Animated Decorative Blur */}
            <motion.div
                style={{ y: y1, opacity }}
                className='absolute -top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl'
            />
            <motion.div
                style={{ y: y2, opacity }}
                className='absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl'
            />

            {/* Floating Elements */}
            <div className='absolute inset-0 overflow-hidden'>
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className='absolute text-primary/5'
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            rotate: 0
                        }}
                        animate={{
                            y: [null, -40, 40, -40],
                            rotate: 360
                        }}
                        transition={{
                            duration: 25 + i * 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {i % 2 === 0 ? <Quote size={48} /> : <MessageCircle size={40} />}
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
                            <Quote className='w-4 h-4' />
                        </motion.div>
                        <span className='text-sm font-medium'>Testimonial</span>
                    </motion.div>

                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight'>
                        Dipercaya oleh{' '}
                        <motion.span
                            className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block'
                            animate={{
                                backgroundPosition: ['0%', '100%', '0%']
                            }}
                            transition={{ duration: 10, repeat: Infinity }}
                            style={{ backgroundSize: '200% auto' }}
                        >
                            Banyak Siswa
                        </motion.span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className='mt-6 text-lg text-muted-foreground/80 leading-relaxed'
                    >
                        Ribuan siswa telah menemukan jurusan terbaik mereka bersama ArahJurusan AI.
                    </motion.p>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className='mt-12 grid grid-cols-2 md:grid-cols-4 gap-4'
                >
                    {[
                        { icon: Users, label: 'Pengguna Aktif', value: '10rb+', color: 'from-blue-500/20 to-cyan-500/20' },
                        { icon: Star, label: 'Rating Rata-rata', value: '4.9/5', color: 'from-yellow-500/20 to-amber-500/20' },
                        { icon: Award, label: 'Testimoni', value: '2rb+', color: 'from-purple-500/20 to-pink-500/20' },
                        { icon: TrendingUp, label: 'Rekomendasi Tepat', value: '95%', color: 'from-green-500/20 to-emerald-500/20' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className='relative group'
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`} />
                            <div className='relative p-4 bg-card/50 border border-border rounded-xl text-center backdrop-blur-sm'>
                                <stat.icon className='w-5 h-5 text-primary/70 mx-auto mb-2' />
                                <div className='text-xl font-bold text-foreground'>{stat.value}</div>
                                <div className='text-xs text-muted-foreground/60'>{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Featured Testimonial */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className='mt-16 p-8 bg-gradient-to-r from-primary/10 to-accent/5 rounded-2xl border border-border/50'
                >
                    <div className='flex flex-col md:flex-row items-center gap-8'>
                        <div className='flex-1 text-center md:text-left'>
                            <div className='flex items-center justify-center md:justify-start gap-2 mb-4'>
                                <Sparkles className='w-5 h-5 text-primary' />
                                <span className='text-sm font-medium text-primary'>Testimonial Pilihan</span>
                            </div>
                            <p className='text-xl md:text-2xl text-foreground/90 italic mb-6'>
                                &quot;ArahJurusan AI benar-benar mengubah cara saya memandang masa depan.
                                Tesnya akurat dan rekomendasinya sangat membantu saya memilih jurusan
                                yang tepat. Terima kasih!&quot;
                            </p>
                            <div className='flex items-center justify-center md:justify-start gap-4'>
                                <div className='w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl'>
                                    SN
                                </div>
                                <div>
                                    <h4 className='font-semibold text-foreground'>Siti Nurhaliza</h4>
                                    <p className='text-sm text-muted-foreground/70'>Siswi SMA, diterima di ITB</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex-1 grid grid-cols-3 gap-2'>
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className='aspect-square bg-primary/5 rounded-lg border border-border/50' />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Testimonials Grid dengan efek hover lebih baik */}
                <div className='mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {displayedTestimonials.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8 }}
                            className='group relative'
                        >
                            {/* Hover effect background */}
                            <motion.div
                                className='absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                                style={{ filter: 'blur(12px)' }}
                            />

                            <div className='relative p-8 rounded-3xl bg-gradient-to-br from-card to-card/50 border border-border shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm'>

                                {/* Quote Decorative dengan animasi */}
                                <motion.div
                                    animate={{
                                        rotate: [0, 5, -5, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className='absolute top-6 right-6'
                                >
                                    <Quote className='w-12 h-12 text-primary/20' />
                                </motion.div>

                                {/* Rating dengan animasi */}
                                <div className='flex gap-1 mb-5'>
                                    {[...Array(5)].map((_, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 + index * 0.05 }}
                                            whileHover={{ scale: 1.2, rotate: 10 }}
                                        >
                                            <Star
                                                className='w-4 h-4'
                                                style={{
                                                    fill: index < item.rating ? 'url(#gold-gradient)' : 'none',
                                                    stroke: index < item.rating ? 'none' : 'currentColor',
                                                    color: index < item.rating ? 'none' : 'rgba(255,255,255,0.2)'
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Content dengan efek slide */}
                                <motion.p
                                    className='text-muted-foreground leading-relaxed mb-6 relative z-10'
                                    whileHover={{ x: 2 }}
                                >
                                    “{item.content}”
                                </motion.p>

                                {/* Profile dengan animasi */}
                                <div className='flex items-center gap-4'>
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className='relative'
                                    >
                                        <div className='w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center text-base font-semibold text-primary border-2 border-background'>
                                            {item.avatar}
                                        </div>
                                        {item.verified && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center'
                                            >
                                                <Check className='w-3 h-3 text-white' />
                                            </motion.div>
                                        )}
                                    </motion.div>

                                    <div className='flex-1'>
                                        <h4 className='font-semibold text-foreground group-hover:text-primary transition-colors'>
                                            {item.name}
                                        </h4>
                                        <p className='text-sm text-muted-foreground/70'>
                                            {item.role}
                                        </p>
                                        <div className='flex items-center gap-2 mt-1'>
                                            <span className='text-xs text-muted-foreground/50'>{item.date}</span>
                                            {item.verified && (
                                                <span className='text-xs text-green-500/70 flex items-center gap-1'>
                                                    <CheckCircle className='w-3 h-3' /> Terverifikasi
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative line */}
                                <motion.div
                                    className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500'
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Load More Button */}
                {!showAll && testimonials.length > 3 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                        className='mt-12 text-center'
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowAll(true)}
                            className='px-8 py-3 bg-gradient-to-r from-primary/10 to-accent/10 text-primary rounded-xl border border-border hover:border-primary/30 transition-all duration-300 font-medium inline-flex items-center gap-2 group'
                        >
                            <span>Lihat Lebih Banyak</span>
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <ChevronRight className='w-4 h-4' />
                            </motion.div>
                        </motion.button>
                    </motion.div>
                )}

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className='mt-16 flex flex-wrap items-center justify-center gap-8'
                >
                    {['Siswa Aktif', 'Orang Tua', 'Guru BK', 'Konselor'].map((badge, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.1 }}
                            className='flex items-center gap-2 text-sm text-muted-foreground/60'
                        >
                            <Heart className='w-4 h-4 text-primary/50' />
                            <span>Dipercaya {badge}</span>
                        </motion.div>
                    ))}
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

// Helper component for Check icon
function Check(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}