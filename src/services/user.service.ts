import type { Prisma } from '@prisma/client'
import { findUsers } from '@/repositories/user.repository'

type SortField = 'createdAt' | 'nama'
type SortOrder = 'asc' | 'desc'

type GetUsersParams = {
  page?: number
  limit?: number
  search?: string
  sortBy?: SortField
  order?: SortOrder
}

export const getUsers = async ({
  page = 1,
  limit = 10,
  search = '',
  sortBy = 'createdAt',
  order = 'desc',
}: GetUsersParams) => {
  const safePage = page > 0 ? page : 1
  const safeLimit =
    limit > 0 && limit <= 50 ? limit : 10

  const safeOrder: Prisma.SortOrder =
    order === 'asc' ? 'asc' : 'desc'

  const { data, total } = await findUsers({
    page: safePage,
    limit: safeLimit,
    search: search.trim(),
    sortBy,
    order: safeOrder,
  })

  return {
    data,
    meta: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
      sortBy,
      order: safeOrder,
    },
  }
}

