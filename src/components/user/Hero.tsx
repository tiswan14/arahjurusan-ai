'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Users, School, Briefcase, Cpu } from 'lucide-react'

const images = [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80',
]

export default function Hero() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length)
        }, 6000)

        return () => clearInterval(interval)
    }, [])

    const next = () => {
        setIndex((prev) => (prev + 1) % images.length)
    }

    const prev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <section className='relative h-screen w-full overflow-hidden bg-[#0a1929] pt-58 md:pt-52 lg:pt-18'>
            {/* Background Images with Parallax Effect */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={index}
                    className='absolute inset-0'
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                >
                    <div
                        className='absolute inset-0 bg-cover bg-center'
                        style={{ backgroundImage: `url(${images[index]})` }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Modern Gradient Overlay */}
            <div className='absolute inset-0 bg-gradient-to-r from-[#0a1929]/95 via-[#0a1929]/80 to-[#0a1929]/60' />
            <div className='absolute inset-0 bg-gradient-to-t from-[#0a1929] via-[#0a1929]/50 to-transparent' />

            {/* Animated Grid Pattern */}
            <div className='absolute inset-0 opacity-[0.03]'>
                <div
                    className='absolute inset-0'
                    style={{
                        backgroundImage: `
              linear-gradient(to right, #2563eb 1px, transparent 1px),
              linear-gradient(to bottom, #2563eb 1px, transparent 1px)
            `,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Floating Orbs */}
            <div className='absolute top-20 right-20 w-64 h-64 bg-[#2563eb]/10 rounded-full blur-3xl' />
            <div className='absolute bottom-20 left-20 w-96 h-96 bg-[#0284c7]/10 rounded-full blur-3xl' />

            {/* Content */}
            <div className='relative z-10 flex h-full items-center'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='max-w-4xl mx-auto lg:mx-0'>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className='mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full bg-[#f1f5f9]/10 px-3 sm:px-3.5 py-1 sm:py-1.5 backdrop-blur-sm border border-[#e2e8f0]/10'
                        >
                            <Sparkles className='h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#2563eb]' />
                            <span className='text-[10px] sm:text-xs font-medium text-white'>
                                AI-Powered Jurusan SMK
                            </span>
                        </motion.div>

                        {/* Main Heading - Diperkecil ukuran fontnya */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className='text-2xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight'
                        >
                            Pilih Jurusan SMK
                            <span className='block text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#0284c7]'>
                                Sesuai Passionmu
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className='mt-4 sm:mt-5 max-w-3xl text-base sm:text-lg lg:textlg text-[#f1f5f9] leading-relaxed'
                        >
                            Bingung memilih jurusan SMK? Platform AI kami membantu siswa
                            menemukan jurusan yang tepat berdasarkan minat, bakat, dan
                            prospek karir masa depan. Dapatkan rekomendasi personalisasi
                            dalam hitungan menit!
                        </motion.p>


                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className='mt-4 sm:mt-5 flex flex-col sm:flex-row gap-2 sm:gap-3'
                        >
                            <a
                                href='/login'
                                className='group relative inline-flex items-center justify-center sm:justify-start gap-1.5 rounded-lg bg-[#2563eb] px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm text-white font-semibold overflow-hidden transition-all duration-300 hover:bg-[#1d4ed8] hover:shadow-lg hover:shadow-[#2563eb]/25'
                            >
                                <span className='relative z-10'>Cari Jurusan Sekarang</span>
                                <ArrowRight className='relative z-10 h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-x-1' />
                                <div className='absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 bg-gradient-to-r from-transparent via-white/20 to-transparent' />
                            </a>

                            <a
                                href='/tentang'
                                className='inline-flex items-center justify-center sm:justify-start rounded-lg bg-[#f1f5f9]/10 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm text-white font-semibold backdrop-blur-sm border border-[#e2e8f0]/10 hover:bg-[#f1f5f9]/20 transition-all duration-300'
                            >
                                Lihat Daftar Jurusan
                            </a>
                        </motion.div>

                        {/* Stats - Modern Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.7 }}
                            className='mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5'
                        >
                            {/* Card 1 */}
                            <div className='bg-[#f1f5f9]/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-5 border border-[#e2e8f0]/10'>
                                <div className='flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2 lg:gap-2.5'>
                                    <div className='p-2 lg:p-2.5 bg-[#2563eb]/20 rounded-lg'>
                                        <School className='h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5 text-[#2563eb]' />
                                    </div>
                                    <div>
                                        <div className='text-sm sm:text-base lg:text-base font-bold text-white'>
                                            12+
                                        </div>
                                        <div className='text-[10px] sm:text-xs lg:text-xs text-[#f1f5f9]/70'>
                                            Jurusan Populer
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className='bg-[#f1f5f9]/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-5 border border-[#e2e8f0]/10'>
                                <div className='flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2 lg:gap-2.5'>
                                    <div className='p-2 lg:p-2.5 bg-[#0284c7]/20 rounded-lg'>
                                        <Users className='h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5 text-[#0284c7]' />
                                    </div>
                                    <div>
                                        <div className='text-sm sm:text-base lg:text-base font-bold text-white'>
                                            5K+
                                        </div>
                                        <div className='text-[10px] sm:text-xs lg:text-xs text-[#f1f5f9]/70'>
                                            Siswa Terbantu
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div className='bg-[#f1f5f9]/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-5 border border-[#e2e8f0]/10'>
                                <div className='flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2 lg:gap-2.5'>
                                    <div className='p-2 lg:p-2.5 bg-[#059669]/20 rounded-lg'>
                                        <Briefcase className='h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5 text-[#059669]' />
                                    </div>
                                    <div>
                                        <div className='text-sm sm:text-base lg:text-base font-bold text-white'>
                                            95%
                                        </div>
                                        <div className='text-[10px] sm:text-xs lg:text-xs text-[#f1f5f9]/70'>
                                            Terserap Kerja
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Card 4 */}
                            <div className='bg-[#f1f5f9]/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-5 border border-[#e2e8f0]/10'>
                                <div className='flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2 lg:gap-2.5'>
                                    <div className='p-2 lg:p-2.5 bg-[#d97706]/20 rounded-lg'>
                                        <Cpu className='h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5 text-[#d97706]' />
                                    </div>
                                    <div>
                                        <div className='text-sm sm:text-base lg:text-base font-bold text-white'>
                                            30+
                                        </div>
                                        <div className='text-[10px] sm:text-xs lg:text-xs text-[#f1f5f9]/70'>
                                            Mitra Industri
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons - Hidden on mobile, shown on larger screens */}
            <div className='absolute bottom-8 right-8 gap-4 z-20 hidden lg:flex'>
                <button
                    onClick={prev}
                    className='group h-12 w-12 rounded-full bg-[#f1f5f9]/10 backdrop-blur-md border border-[#e2e8f0]/10 flex items-center justify-center text-white hover:bg-[#2563eb] transition-all duration-300 hover:scale-110'
                    aria-label='Previous image'
                >
                    <ChevronLeft className='h-6 w-6 transition-transform group-hover:scale-110' />
                </button>

                <button
                    onClick={next}
                    className='group h-12 w-12 rounded-full bg-[#f1f5f9]/10 backdrop-blur-md border border-[#e2e8f0]/10 flex items-center justify-center text-white hover:bg-[#2563eb] transition-all duration-300 hover:scale-110'
                    aria-label='Next image'
                >
                    <ChevronRight className='h-6 w-6 transition-transform group-hover:scale-110' />
                </button>
            </div>



            {/* Slide Indicators */}
            <div className='absolute bottom-5 left-1/2 -translate-x-1/2 hidden lg:flex gap-2 z-20'>
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === index
                            ? 'w-6 bg-[#2563eb]'
                            : 'w-2 bg-[#f1f5f9]/40 hover:bg-[#f1f5f9]/60'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>



        </section>
    )
}