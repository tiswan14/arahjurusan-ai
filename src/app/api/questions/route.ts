import { NextRequest, NextResponse } from 'next/server'
import { questionService } from '@/services/question.service'
import { Dimensi } from '@prisma/client'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const page = Number(searchParams.get('page') ?? 1)
    const limit = Number(searchParams.get('limit') ?? 10)
    const search = searchParams.get('search') ?? undefined

    const dimensiParam = searchParams.get('dimensi')
    const aktifParam = searchParams.get('aktif')

    const orderBy = searchParams.get('orderBy') as
      | 'createdAt'
      | 'urutan'
      | 'text'
      | null

    const order = searchParams.get('order') as
      | 'asc'
      | 'desc'
      | null

    const dimensi = dimensiParam
      ? (dimensiParam as Dimensi)
      : undefined

    const aktif =
      aktifParam !== null
        ? aktifParam === 'true'
        : undefined

    const result =
      await questionService.findAll({
        page,
        limit,
        search,
        dimensi,
        aktif,
        orderBy: orderBy ?? undefined,
        order: order ?? undefined,
      })

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Internal server error',
      },
      { status: 500 },
    )
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const result =
      await questionService.create(body)

    return NextResponse.json(result, {
      status: 201,
    })
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Internal server error',
      },
      { status: 400 },
    )
  }
}
