import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

const baseSelect = {
  id: true,
  jurusanId: true,
  dimensi: true,
  bobot: true,
} satisfies Prisma.JurusanWeightSelect

export const jurusanWeightRepository = {
  create(data: Prisma.JurusanWeightCreateInput) {
    return prisma.jurusanWeight.create({
      data,
      select: baseSelect,
    })
  },

  async bulkUpsert(
    jurusanId: string,
    weights: {
      dimensi: Prisma.JurusanWeightUncheckedCreateInput['dimensi']
      bobot: number
    }[],
  ) {
    return prisma.$transaction(
      weights.map(weight =>
        prisma.jurusanWeight.upsert({
          where: {
            jurusanId_dimensi: {
              jurusanId,
              dimensi: weight.dimensi,
            },
          },
          update: {
            bobot: weight.bobot,
          },
          create: {
            jurusanId,
            dimensi: weight.dimensi,
            bobot: weight.bobot,
          },
          select: baseSelect,
        }),
      ),
    )
  },

  findByJurusan(jurusanId: string) {
    return prisma.jurusanWeight.findMany({
      where: { jurusanId },
      orderBy: { dimensi: 'asc' },
      include: {
        jurusan: {
          select: {
            id: true,
            nama: true,
          },
        },
      },
    })
  },

  findById(id: string) {
    return prisma.jurusanWeight.findUnique({
      where: { id },
      select: baseSelect,
    })
  },

  updateById(
    id: string,
    data: Prisma.JurusanWeightUpdateInput,
  ) {
    return prisma.jurusanWeight.update({
      where: { id },
      data,
      select: baseSelect,
    })
  },

  deleteById(id: string) {
    return prisma.jurusanWeight.delete({
      where: { id },
    })
  },

  deleteByJurusan(jurusanId: string) {
    return prisma.jurusanWeight.deleteMany({
      where: { jurusanId },
    })
  },

  findAll() {
    return prisma.jurusanWeight.findMany({
      orderBy: [
        {
          jurusan: {
            nama: 'asc',
          },
        },
        {
          dimensi: 'asc',
        },
      ],
      include: {
        jurusan: {
          select: {
            id: true,
            nama: true,
          },
        },
      },
    })
  },

}
