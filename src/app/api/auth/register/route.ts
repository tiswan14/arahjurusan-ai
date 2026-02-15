import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/schemas/user'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const parsed = registerSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                {
                    message: 'Validasi gagal',
                    errors: parsed.error.flatten().fieldErrors,
                },
                { status: 400 },
            )
        }

        const { nama, email, password } = parsed.data

        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { message: 'Email sudah terdaftar' },
                { status: 400 },
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                nama,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                nama: true,
                email: true,
                createdAt: true,
            },
        })

        return NextResponse.json(
            {
                message: 'Register berhasil',
                data: user,
            },
            { status: 201 },
        )
    } catch {
        return NextResponse.json(
            { message: 'Terjadi kesalahan pada server' },
            { status: 500 },
        )
    }
}
