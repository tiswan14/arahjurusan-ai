'use client'

import { RegisterForm } from '@/components/auth/register/register-form'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

const RegisterPage = () => {
    return (
        <div className='min-h-screen flex bg-background text-foreground'>
            {/* Left Section */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className='hidden lg:flex lg:w-1/2 relative overflow-hidden bg-background'
            >
                {/* Divider */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className='absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-border to-transparent'
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='relative z-10 flex flex-col justify-center items-center w-full p-16 text-center space-y-6'
                >
                    <div className='w-24 h-24 rounded-2xl bg-primary/10 backdrop-blur flex items-center justify-center'>
                        <GraduationCap className='w-12 h-12 text-primary' />
                    </div>

                    <h2 className='text-4xl font-bold text-primary'>
                        ArahJurusan AI
                    </h2>

                    <p className='text-muted-foreground max-w-md'>
                        Platform berbasis AI untuk membantu kamu menemukan jurusan kuliah yang sesuai dengan minat, bakat, dan potensi diri secara terukur dan objektif.
                    </p>
                </motion.div>

            </motion.div>

            {/* Right Section */}
            <div className='flex-1 h-screen lg:min-h-screen flex items-center justify-center px-6 lg:px-16 xl:px-24 bg-background overflow-hidden'>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className='w-full max-w-md lg:max-w-lg xl:max-w-xl'
                >
                    {/* Mobile Branding */}
                    <div className='lg:hidden text-center mb-4'>
                        <div className='w-16 h-16 mx-auto rounded-xl bg-primary/10 backdrop-blur flex items-center justify-center mb-3'>
                            <GraduationCap className='w-8 h-8 text-primary' />
                        </div>

                        <h1 className='text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                            ArahJurusan AI
                        </h1>

                        <p className='text-sm text-muted-foreground mt-2'>
                            Temukan jurusan yang sesuai dengan potensimu
                        </p>
                    </div>

                    {/* Desktop Title */}
                    <div className='hidden lg:block mb-10 text-center'>
                        <h1 className='text-4xl font-bold text-primary'>Daftar</h1>
                        <p className='text-muted-foreground mt-3 text-base'>
                            Silakan daftar untuk membuat akun baru
                        </p>
                    </div>


                    {/* Card */}
                    <RegisterForm />


                </motion.div>
            </div>

        </div>
    )
}

export default RegisterPage