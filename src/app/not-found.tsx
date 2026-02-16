'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function NotFound() {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-background text-center px-6 relative overflow-hidden'>

            {/* Background Glow */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                className='absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl'
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='relative z-10'
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className='flex justify-center mb-6'
                >
                    <Sparkles className='w-10 h-10 text-primary' />
                </motion.div>

                <h1 className='text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                    404
                </h1>

                <p className='mt-4 text-lg text-muted-foreground'>
                    Halaman tidak ditemukan
                </p>

                <Link
                    href='/'
                    className='mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:scale-105 transition'
                >
                    <ArrowLeft className='w-4 h-4' />
                    Kembali ke Beranda
                </Link>
            </motion.div>
        </div>
    )
}
