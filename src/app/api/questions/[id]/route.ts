import { NextRequest, NextResponse } from 'next/server'
import { questionService } from '@/services/question.service'

export async function GET(
  _req: NextRequest,
  context: {
    params: Promise<{ id: string }>
  },
) {
  try {
    const { id } = await context.params

    const result =
      await questionService.findById(id)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Internal server error',
      },
      { status: 404 },
    )
  }
}


export async function PATCH(
  req: NextRequest,
  context: {
    params: Promise<{ id: string }>
  },
) {
  try {
    const { id } = await context.params
    const body = await req.json()

    const result =
      await questionService.updateById(
        id,
        body,
      )

    return NextResponse.json(result)
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

export async function DELETE(
  _req: NextRequest,
  context: {
    params: Promise<{ id: string }>
  },
) {
  try {
    const { id } = await context.params

    await questionService.deleteById(id)

    return NextResponse.json(
      { message: 'Pertanyaan berhasil dihapus' },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Internal server error',
      },
      { status: 404 },
    )
  }
}
