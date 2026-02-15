import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/jwt'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export async function POST(req: Request) {
    try {
        const headerList = await headers()
        const ip =
            headerList.get('x-forwarded-for') ??
            headerList.get('x-real-ip') ??
            'unknown'

        const limiter = rateLimit(ip, 3, 60 * 1000)

        if (!limiter.allowed) {
            return NextResponse.json(
                { message: 'Terlalu banyak percobaan login. Coba lagi nanti.' },
                { status: 429 },
            )
        }

        const body = await req.json()
        const parsed = loginSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { message: 'Input tidak valid' },
                { status: 400 },
            )
        }

        const { email, password } = parsed.data

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return NextResponse.json(
                { message: 'Email atau password salah' },
                { status: 400 },
            )
        }

        const valid = await bcrypt.compare(password, user.password)

        if (!valid) {
            return NextResponse.json(
                { message: 'Email atau password salah' },
                { status: 400 },
            )
        }

        const token = await signToken({
            id: user.id,
            email: user.email,
            role: user.role,
        })

        const response = NextResponse.json(
            {
                message: 'Login berhasil',
                data: {
                    id: user.id,
                    nama: user.nama,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 200 },
        )

        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        })

        return response
    } catch {
        return NextResponse.json(
            { message: 'Terjadi kesalahan server' },
            { status: 500 },
        )
    }
}
