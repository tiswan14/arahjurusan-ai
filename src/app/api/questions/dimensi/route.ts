import { NextResponse } from 'next/server'
import type { Dimensi } from '@prisma/client'
import { questionRepository } from '@/repositories/question.repository'

type GetDimensiSuccess = {
  data: Dimensi[]
}

type GetDimensiError = {
  message: string
}

export async function GET(): Promise<
  NextResponse<GetDimensiSuccess | GetDimensiError>
> {
  try {
    const dimensi =
      await questionRepository.findDistinctDimensi()

    return NextResponse.json<GetDimensiSuccess>(
      {
        data: dimensi,
      },
      { status: 200 },
    )
  } catch {
    return NextResponse.json<GetDimensiError>(
      {
        message: 'Gagal mengambil dimensi',
      },
      { status: 500 },
    )
  }
}
