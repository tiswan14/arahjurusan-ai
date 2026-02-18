import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export const jurusanRepository = {
  findBySlug(slug: string) {
    return prisma.jurusan.findUnique({
      where: { slug },
    })
  },

  findByAlias(alias: string) {
    return prisma.jurusan.findUnique({
      where: { alias },
    })
  },

  findById(id: string) {
    return prisma.jurusan.findUnique({
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
  },

  create(data: Prisma.JurusanCreateInput) {
    return prisma.jurusan.create({
      data,
    })
  },

  update(
    id: string,
    data: Prisma.JurusanUpdateInput,
  ) {
    return prisma.jurusan.update({
      where: { id },
      data,
    })
  },

  delete(id: string) {
    return prisma.jurusan.delete({
      where: { id },
    })
  },

  async findAll(params: {
    page: number
    limit: number
    search: string
    sortBy: 'nama' | 'createdAt'
    order: 'asc' | 'desc'
  }) {
    const { page, limit, search, sortBy, order } = params

    const skip = (page - 1) * limit

    const where: Prisma.JurusanWhereInput | undefined =
      search
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
        orderBy: {
          [sortBy]: order,
        },
        skip,
        take: limit,
      }),
      prisma.jurusan.count({ where }),
    ])

    return {
      data,
      total,
    }
  },
}
