import { z } from 'zod'

export const registerSchema = z.object({
    nama: z
        .string()
        .min(1, { message: 'Nama wajib diisi' }),

    email: z
        .string()
        .min(1, { message: 'Email wajib diisi' })
        .email({ message: 'Format email tidak valid' }),

    password: z
        .string()
        .min(6, { message: 'Password minimal 6 karakter' }),
})
