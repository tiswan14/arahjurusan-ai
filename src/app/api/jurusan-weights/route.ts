import { NextRequest, NextResponse } from 'next/server'
import { jurusanWeightService } from '@/services/jurusan-weight.service'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const result =
      await jurusanWeightService.setWeights(
        body,
      )

    return NextResponse.json(
      {
        data: result,
        message: 'Bobot berhasil disimpan',
      },
      { status: 201 },
    )
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

export async function GET(req: NextRequest) {
  try {
    const jurusanId =
      req.nextUrl.searchParams.get('jurusanId')

    const data = jurusanId
      ? await jurusanWeightService.getByJurusan(jurusanId)
      : await jurusanWeightService.getAll()

    return NextResponse.json(
      { data },
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
      { status: 500 },
    )
  }
}
