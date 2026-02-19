import { prisma } from '@/lib/prisma'
import type { Prisma, Dimensi } from '@prisma/client'

const baseSelect = {
  id: true,
  text: true,
  dimensi: true,
  urutan: true,
  aktif: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.QuestionSelect

export const questionRepository = {
  create(data: Prisma.QuestionCreateInput) {
    return prisma.question.create({
      data,
      select: baseSelect,
    })
  },

  findById(id: string) {
    return prisma.question.findUnique({
      where: { id },
      select: baseSelect,
    })
  },


  findByUrutan(urutan: number) {
    return prisma.question.findUnique({
      where: { urutan },
      select: { id: true },
    })
  },

  async findAll(params: {
    page: number
    limit: number
    search?: string
    dimensi?: Dimensi
    aktif?: boolean
    orderBy?: 'createdAt' | 'urutan' | 'text'
    order?: 'asc' | 'desc'
  }) {
    const {
      page,
      limit,
      search,
      dimensi,
      aktif,
      orderBy = 'createdAt',
      order = 'desc',
    } = params

    const skip = (page - 1) * limit

    const where: Prisma.QuestionWhereInput = {
      ...(aktif !== undefined && { aktif }),
      ...(dimensi && { dimensi }),
      ...(search?.trim() && {
        text: {
          contains: search.trim(),
        },
      }),
    }

    const [data, total] = await Promise.all([
      prisma.question.findMany({
        where,
        orderBy: {
          [orderBy]: order,
        },
        skip,
        take: limit,
        select: baseSelect,
      }),
      prisma.question.count({ where }),
    ])

    return {
      data,
      total,
    }
  },



  updateById(
    id: string,
    data: Prisma.QuestionUpdateInput,
  ) {
    return prisma.question.update({
      where: { id },
      data,
      select: baseSelect,
    })
  },

  deleteById(id: string) {
    return prisma.question.delete({
      where: { id },
      select: { id: true },
    })
  },

  async findDistinctDimensi() {
    const result =
      await prisma.question.findMany({
        distinct: ['dimensi'],
        select: {
          dimensi: true,
        },
        where: {
          aktif: true,
        },
      })

    return result.map(item => item.dimensi)
  }

}
