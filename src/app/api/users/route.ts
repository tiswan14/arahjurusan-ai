import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth'
import { getUsers } from '@/services/user.service'

export async function GET(req: Request) {
    try {
        const admin = await requireRole('admin')

        if (!admin) {
            return NextResponse.json(
                { message: 'Akses ditolak' },
                { status: 403 },
            )
        }

        const { searchParams } = new URL(req.url)

        const result = await getUsers({
            page: Number(searchParams.get('page')) || undefined,
            limit: Number(searchParams.get('limit')) || undefined,
            search: searchParams.get('search') ?? '',
            sortBy:
                searchParams.get('sortBy') === 'nama'
                    ? 'nama'
                    : 'createdAt',
            order:
                searchParams.get('order') === 'asc'
                    ? 'asc'
                    : 'desc',
        })

        return NextResponse.json(result)
    } catch (error) {
        console.error('GET_USERS_ROUTE_ERROR', error)

        return NextResponse.json(
            { message: 'Terjadi kesalahan pada server' },
            { status: 500 },
        )
    }
}
