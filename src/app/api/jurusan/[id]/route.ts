import { NextRequest, NextResponse } from 'next/server'
import { jurusanService } from '@/services/jurusan.service'

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params

    const data = await jurusanService.findById(id)

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 },
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
      {
        status:
          error instanceof Error &&
            error.message ===
            'Jurusan tidak ditemukan'
            ? 404
            : 500,
      },
    )
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params

    await jurusanService.deleteById(id)

    return NextResponse.json(
      {
        success: true,
        message: 'Jurusan berhasil dihapus',
      },
      { status: 200 },
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
      {
        status:
          error instanceof Error &&
            error.message ===
            'Jurusan tidak ditemukan'
            ? 404
            : 500,
      },
    )
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params
    const body = await req.json()

    const data = await jurusanService.updateById(
      id,
      body,
    )

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 },
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
      {
        status:
          error instanceof Error &&
            error.message ===
            'Jurusan tidak ditemukan'
            ? 404
            : 400,
      },
    )
  }
}
