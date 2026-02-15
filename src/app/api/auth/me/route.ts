import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 },
            )
        }

        const payload = await verifyToken(token)

        const user = await prisma.user.findUnique({
            where: { id: payload.id as string },
            select: {
                id: true,
                nama: true,
                email: true,
                role: true,
                createdAt: true,
            },
        })

        if (!user) {
            return NextResponse.json(
                { message: 'User tidak ditemukan' },
                { status: 404 },
            )
        }

        return NextResponse.json(
            { data: user },
            { status: 200 },
        )
    } catch {
        return NextResponse.json(
            { message: 'Unauthorized' },
            { status: 401 },
        )
    }
}
