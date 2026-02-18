import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import createJurusanSchema from '@/schemas/jurusan'

const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()

    const parsed = createJurusanSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0].message,
        },
        { status: 400 },
      )
    }

    const { nama, alias, deskripsi, prospekKerja } = parsed.data

    const slug = generateSlug(nama)
    const normalizedAlias = alias.toUpperCase()

    const existingSlug = await prisma.jurusan.findUnique({
      where: { slug },
    })

    if (existingSlug) {
      return NextResponse.json(
        { success: false, message: 'Slug sudah digunakan' },
        { status: 409 },
      )
    }

    const existingAlias = await prisma.jurusan.findUnique({
      where: { alias: normalizedAlias },
    })

    if (existingAlias) {
      return NextResponse.json(
        { success: false, message: 'Alias sudah digunakan' },
        { status: 409 },
      )
    }

    const jurusan = await prisma.jurusan.create({
      data: {
        nama,
        slug,
        alias: normalizedAlias,
        deskripsi,
        prospekKerja,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: jurusan,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('[POST_JURUSAN_ERROR]', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan saat membuat jurusan',
      },
      { status: 500 },
    )
  }
}


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


