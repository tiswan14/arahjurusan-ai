'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import {
    HelpCircle,
    MessageCircle,
    Mail,
    Sparkles,
    Search,
    ArrowRight,
    CheckCircle2,
    Clock,
    Users,
    Zap,
    Star,
    MessageSquare,
    Headphones,
    Send,
    ChevronRight
} from 'lucide-react'

const faqs = [
    {
        question: 'Apakah tes ini benar-benar gratis?',
        answer: 'Ya, tes minat di ArahJurusan AI sepenuhnya gratis dan dapat diakses kapan saja tanpa batasan. Tidak ada biaya tersembunyi atau langganan berbayar untuk mengikuti tes minat.',
        category: 'biaya',
        icon: CheckCircle2
    },
    {
        question: 'Berapa lama waktu yang dibutuhkan?',
        answer: 'Tes hanya membutuhkan sekitar 5-10 menit untuk menyelesaikan seluruh pertanyaan. Hasil rekomendasi akan langsung muncul setelah kamu menyelesaikan tes.',
        category: 'waktu',
        icon: Clock
    },
    {
        question: 'Seberapa akurat hasil rekomendasinya?',
        answer: 'Rekomendasi didasarkan pada analisis AI yang memproses lebih dari 50 parameter kepribadian dan minat, serta data kebutuhan industri terkini dari berbagai sumber terpercaya. Tingkat akurasi mencapai 95% berdasarkan feedback pengguna.',
        category: 'akurasi',
        icon: Zap
    },
    {
        question: 'Apakah data saya aman?',
        answer: 'Kami menjaga privasi dan keamanan data pengguna dengan standar keamanan modern. Semua data terenkripsi dan tidak akan pernah dibagikan kepada pihak ketiga tanpa persetujuan Anda.',
        category: 'privasi',
        icon: CheckCircle2
    },
    {
        question: 'Apakah hasilnya bisa diakses kembali?',
        answer: 'Ya, setelah menyelesaikan tes, kamu akan mendapatkan link khusus untuk mengakses kembali hasil rekomendasi kapan saja. Kamu juga bisa mendownload hasilnya dalam format PDF.',
        category: 'hasil',
        icon: CheckCircle2
    },
    {
        question: 'Untuk usia berapa tes ini cocok?',
        answer: 'Tes ini dirancang untuk siswa SMP, SMA, SMK, dan mahasiswa tahun pertama yang masih bingung menentukan jurusan. Namun, siapapun yang ingin mengeksplorasi minat dan bakatnya bisa mengikuti tes ini.',
        category: 'usia',
        icon: Users
    },
    {
        question: 'Apakah ada konsultasi dengan ahlinya?',
        answer: 'Setelah mendapatkan hasil rekomendasi, kamu bisa berkonsultasi dengan konselor pendidikan kami secara gratis melalui fitur chat atau video call. Tersedia jadwal fleksibel yang bisa kamu pilih.',
        category: 'konsultasi',
        icon: MessageCircle
    },
]

const categories = [
    { id: 'all', label: 'Semua', icon: HelpCircle },
    { id: 'biaya', label: 'Biaya', icon: CheckCircle2 },
    { id: 'waktu', label: 'Waktu', icon: Clock },
    { id: 'akurasi', label: 'Akurasi', icon: Zap },
    { id: 'privasi', label: 'Privasi', icon: CheckCircle2 },
]

export default function FAQSection() {
    const sectionRef = useRef(null)
    const [activeCategory, setActiveCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [openItem, setOpenItem] = useState<string | undefined>(undefined)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, -50])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3])

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <section ref={sectionRef} className='relative py-28 bg-slate-900 border-t border-border overflow-hidden'>

            {/* Animated Background */}
            <motion.div
                style={{ y, opacity }}
                className='absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl'
            />
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
                className='absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl'
            />

            {/* Floating Icons */}
            <div className='absolute inset-0 overflow-hidden'>
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className='absolute text-primary/5'
                        initial={{
                            x: Math.random() * window.innerWidth,
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
                        {i % 3 === 0 ? <HelpCircle size={40} /> :
                            i % 3 === 1 ? <MessageSquare size={35} /> :
                                <Headphones size={45} />}
                    </motion.div>
                ))}
            </div>

            <div className='relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>

                {/* Header Section yang ditingkatkan */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
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
                            <HelpCircle className='w-4 h-4' />
                        </motion.div>
                        <span className='text-sm font-medium'>FAQ</span>
                    </motion.div>

                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight'>
                        Pertanyaan yang{' '}
                        <motion.span
                            className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block'
                            animate={{
                                backgroundPosition: ['0%', '100%', '0%']
                            }}
                            transition={{ duration: 10, repeat: Infinity }}
                            style={{ backgroundSize: '200% auto' }}
                        >
                            Sering Ditanyakan
                        </motion.span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className='mt-6 text-lg text-muted-foreground/80 max-w-2xl mx-auto'
                    >
                        Jawaban atas pertanyaan umum sebelum kamu memulai tes minat.
                        Temukan informasi lengkap tentang cara kerja dan manfaatnya.
                    </motion.p>
                </motion.div>

                {/* Search dan Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className='mt-12'
                >
                    {/* Search Bar */}
                    <div className='relative max-w-md mx-auto mb-6'>
                        <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50' />
                        <input
                            type='text'
                            placeholder='Cari pertanyaan...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='w-full pl-11 pr-4 py-3 bg-card/50 border border-border rounded-xl focus:outline-none focus:border-primary/50 text-foreground placeholder:text-muted-foreground/30'
                        />
                    </div>

                    {/* Category Filter */}
                    <div className='flex flex-wrap justify-center gap-2'>
                        {categories.map((category) => (
                            <motion.button
                                key={category.id}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeCategory === category.id
                                        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                                        : 'bg-card/50 text-muted-foreground hover:text-primary border border-border'
                                    }`}
                            >
                                <category.icon className='w-3 h-3' />
                                {category.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* FAQ Accordion dengan animasi yang lebih baik */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className='mt-12'
                >
                    <Accordion
                        type='single'
                        collapsible
                        value={openItem}
                        onValueChange={setOpenItem}
                        className='space-y-4'
                    >
                        {filteredFaqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                            >
                                <AccordionItem
                                    value={`item-${i}`}
                                    className='group bg-gradient-to-r from-card/50 to-card/30 border border-border rounded-xl px-6 hover:border-primary/30 transition-all duration-300'
                                >
                                    <AccordionTrigger className='text-left font-medium text-foreground hover:no-underline py-4'>
                                        <div className='flex items-center gap-4'>
                                            <motion.div
                                                whileHover={{ rotate: 10, scale: 1.1 }}
                                                className='w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center'
                                            >
                                                <faq.icon className='w-4 h-4 text-primary' />
                                            </motion.div>
                                            <span className='flex-1'>{faq.question}</span>
                                            <motion.div
                                                animate={{ rotate: openItem === `item-${i}` ? 90 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ChevronRight className='w-4 h-4 text-primary/50' />
                                            </motion.div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='text-muted-foreground leading-relaxed pb-4 pl-12'>
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {faq.answer}
                                        </motion.div>

                                        {/* Helpful buttons */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className='flex items-center gap-4 mt-4 pt-4 border-t border-border/50'
                                        >
                                            <span className='text-xs text-muted-foreground/50'>Apakah ini membantu?</span>
                                            <button className='text-xs text-primary hover:text-primary/80 transition-colors'>Ya</button>
                                            <button className='text-xs text-muted-foreground hover:text-primary transition-colors'>Tidak</button>
                                        </motion.div>
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>

                    {/* No results message */}
                    {filteredFaqs.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className='text-center py-12'
                        >
                            <HelpCircle className='w-12 h-12 text-primary/30 mx-auto mb-4' />
                            <p className='text-muted-foreground'>Tidak ada pertanyaan yang cocok</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('')
                                    setActiveCategory('all')
                                }}
                                className='mt-4 text-primary hover:underline text-sm'
                            >
                                Reset filter
                            </button>
                        </motion.div>
                    )}
                </motion.div>

                {/* Enhanced Contact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className='mt-16'
                >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* Contact Card */}
                        <motion.div
                            whileHover={{ y: -4 }}
                            className='p-8 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl border border-border/50 backdrop-blur-sm'
                        >
                            <div className='flex items-start gap-4'>
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 10, -10, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className='w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center'
                                >
                                    <MessageCircle className='w-6 h-6 text-primary' />
                                </motion.div>
                                <div className='flex-1'>
                                    <h3 className='text-lg font-semibold text-foreground mb-2'>
                                        Masih Punya Pertanyaan?
                                    </h3>
                                    <p className='text-sm text-muted-foreground/70 mb-4'>
                                        Tim support kami siap membantu kamu dalam waktu 1x24 jam.
                                    </p>
                                    <div className='flex items-center gap-2 text-primary'>
                                        <Mail className='w-4 h-4' />
                                        <a
                                            href='mailto:support@arahjurusan.ai'
                                            className='text-sm hover:underline group flex items-center gap-1'
                                        >
                                            support@arahjurusan.ai
                                            <ArrowRight className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity' />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Chat Card */}
                        <motion.div
                            whileHover={{ y: -4 }}
                            className='p-8 bg-gradient-to-br from-accent/10 to-primary/5 rounded-2xl border border-border/50 backdrop-blur-sm'
                        >
                            <div className='flex items-start gap-4'>
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className='w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center'
                                >
                                    <Headphones className='w-6 h-6 text-accent' />
                                </motion.div>
                                <div className='flex-1'>
                                    <h3 className='text-lg font-semibold text-foreground mb-2'>
                                        Butuh Bantuan Cepat?
                                    </h3>
                                    <p className='text-sm text-muted-foreground/70 mb-4'>
                                        Chat langsung dengan konselor kami untuk pertanyaan mendesak.
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className='flex items-center gap-2 text-accent hover:text-accent/80 transition-colors group'
                                    >
                                        <Send className='w-4 h-4' />
                                        <span className='text-sm'>Mulai Chat</span>
                                        <ArrowRight className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity' />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                        className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-6'
                    >
                        {[
                            { label: 'Kepuasan Pengguna', value: '98%', icon: Star },
                            { label: 'Layanan Chat', value: '24/7', icon: MessageCircle },
                            { label: 'Respon Cepat', value: '< 1 Jam', icon: Clock },
                            { label: 'Konselor Ahli', value: '15+', icon: Users },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className='p-4 bg-card/30 rounded-xl border border-border/50 text-center'
                            >
                                <stat.icon className='w-4 h-4 text-primary/50 mx-auto mb-2' />
                                <div className='text-lg font-bold text-foreground'>{stat.value}</div>
                                <div className='text-xs text-muted-foreground/60'>{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}