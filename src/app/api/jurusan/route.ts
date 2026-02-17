import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl

    const page = Number(searchParams.get('page') ?? '1')
    const limit = Number(searchParams.get('limit') ?? '10')
    const search = searchParams.get('search') ?? ''
    const sortByParam = searchParams.get('sortBy') ?? 'nama'
    const order =
      searchParams.get('order') === 'desc'
        ? 'desc'
        : 'asc'

    const safePage = page > 0 ? page : 1
    const safeLimit =
      limit > 0 && limit <= 50 ? limit : 10

    const allowedSortFields = ['nama', 'createdAt']
    const sortBy = allowedSortFields.includes(sortByParam)
      ? sortByParam
      : 'nama'

    const skip = (safePage - 1) * safeLimit

    const where = search
      ? {
        OR: [
          {
            nama: {
              contains: search,
            },
          },
          {
            alias: {
              contains: search,
            },
          },
        ],
      }
      : undefined

    const [data, total] = await Promise.all([
      prisma.jurusan.findMany({
        where,
        select: {
          id: true,
          nama: true,
          slug: true,
          alias: true,
          deskripsi: true,
          prospekKerja: true,
          createdAt: true,
        },
        orderBy: {
          [sortBy]: order,
        },
        skip,
        take: safeLimit,
      }),
      prisma.jurusan.count({
        where,
      }),
    ])

    const totalPages = Math.ceil(total / safeLimit)

    return NextResponse.json(
      {
        success: true,
        data,
        meta: {
          page: safePage,
          limit: safeLimit,
          total,
          totalPages,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('[GET_JURUSAN_ERROR]', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan saat mengambil data jurusan',
      },
      { status: 500 },
    )
  }
}
