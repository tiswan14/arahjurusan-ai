import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateJurusanSchema } from '@/schemas/jurusan'

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params

    const jurusan = await prisma.jurusan.findUnique({
      where: { id },
      select: {
        id: true,
        nama: true,
        slug: true,
        alias: true,
        deskripsi: true,
        prospekKerja: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!jurusan) {
      return NextResponse.json(
        {
          success: false,
          message: 'Jurusan tidak ditemukan',
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: jurusan,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('GET_JURUSAN_BY_ID_ERROR', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan pada server',
      },
      { status: 500 },
    )
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params

    const existing = await prisma.jurusan.findUnique({
      where: { id },
      select: { id: true },
    })

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: 'Jurusan tidak ditemukan',
        },
        { status: 404 },
      )
    }

    await prisma.jurusan.delete({
      where: { id },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Jurusan berhasil dihapus',
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('DELETE_JURUSAN_ERROR', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan saat menghapus jurusan',
      },
      { status: 500 },
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

    const parsed = updateJurusanSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0].message,
        },
        { status: 400 },
      )
    }

    const existing = await prisma.jurusan.findUnique({
      where: { id },
      select: { id: true },
    })

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: 'Jurusan tidak ditemukan',
        },
        { status: 404 },
      )
    }

    const data = parsed.data

    const updated = await prisma.jurusan.update({
      where: { id },
      data: {
        ...(data.nama !== undefined && {
          nama: data.nama,
        }),
        ...(data.alias !== undefined && {
          alias: data.alias.toUpperCase(),
        }),
        ...(data.deskripsi !== undefined && {
          deskripsi: data.deskripsi,
        }),
        ...(data.prospekKerja !== undefined && {
          prospekKerja: data.prospekKerja,
        }),
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: updated,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('PATCH_JURUSAN_ERROR', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan saat update jurusan',
      },
      { status: 500 },
    )
  }
}
