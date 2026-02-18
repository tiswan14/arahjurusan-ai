import { NextRequest, NextResponse } from 'next/server'
import { jurusanService } from '@/services/jurusan.service'

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()

    const jurusan =
      await jurusanService.create(body)

    return NextResponse.json(
      {
        success: true,
        data: jurusan,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Terjadi kesalahan',
      },
      { status: 400 },
    )
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl

    const result =
      await jurusanService.findAll({
        page: Number(searchParams.get('page')),
        limit: Number(searchParams.get('limit')),
        search: searchParams.get('search') ?? '',
        sortBy: searchParams.get('sortBy') ?? 'nama',
        order: searchParams.get('order') ?? 'asc',
      })

    return NextResponse.json(
      {
        success: true,
        data: result.data,
        meta: result.meta,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('[GET_JURUSAN_ERROR]', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan saat mengambil data',
      },
      { status: 500 },
    )
  }
}
