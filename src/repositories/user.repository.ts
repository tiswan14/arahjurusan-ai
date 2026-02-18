import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

type FindUsersParams = {
  page: number
  limit: number
  search: string
  sortBy: 'createdAt' | 'nama'
  order: Prisma.SortOrder
}

export const findUsers = async ({
  page,
  limit,
  search,
  sortBy,
  order,
}: FindUsersParams) => {
  const skip = (page - 1) * limit

  const where: Prisma.UserWhereInput = {
    role: 'user',
    ...(search
      ? {
        OR: [
          {
            nama: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
        ],
      }
      : {}),
  }

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
      select: {
        id: true,
        nama: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ])

  return {
    data,
    total,
  }
}
