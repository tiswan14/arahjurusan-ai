import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'

export async function GET(req: Request) {
    const admin = await requireRole('admin')

    if (!admin) {
        return NextResponse.json(
            { message: 'Akses ditolak' },
            { status: 403 },
        )
    }

    const { searchParams } = new URL(req.url)

    const page = Number(searchParams.get('page') ?? 1)
    const limit = Number(searchParams.get('limit') ?? 10)
    const search = searchParams.get('search') ?? ''
    const sort = searchParams.get('sort') === 'asc' ? 'asc' : 'desc'

    const skip = (page - 1) * limit

    const whereCondition = {
        role: 'user',
        ...(search && {
            OR: [
                { nama: { contains: search } },
                { email: { contains: search } },
            ],
        }),
    }

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where: whereCondition,
            skip,
            take: limit,
            orderBy: {
                createdAt: sort,
            },
            select: {
                id: true,
                nama: true,
                email: true,
                role: true,
                createdAt: true,
            },
        }),
        prisma.user.count({
            where: whereCondition,
        }),
    ])

    return NextResponse.json({
        data: users,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            sort,
        },
    })
}

