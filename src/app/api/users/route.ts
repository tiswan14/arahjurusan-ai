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

    const page = Math.max(Number(searchParams.get('page') ?? 1), 1)
    const limit = Math.max(Number(searchParams.get('limit') ?? 10), 1)
    const search = searchParams.get('search') ?? ''
    const sortByParam = searchParams.get('sortBy') ?? 'createdAt'
    const orderParam = searchParams.get('order') === 'asc' ? 'asc' : 'desc'

    const allowedSortFields = ['createdAt', 'nama'] as const
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortBy = allowedSortFields.includes(sortByParam as any)
        ? sortByParam
        : 'createdAt'

    const skip = (page - 1) * limit
    const whereCondition = {
        role: 'user',
        ...(search
            ? {
                OR: [
                    { nama: { contains: search } },
                    { email: { contains: search } },
                ],
            }
            : {}),
    }

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where: whereCondition,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: orderParam,
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
            sortBy,
            order: orderParam,
        },
    })
}


