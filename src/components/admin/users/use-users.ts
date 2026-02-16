import { useEffect, useState } from 'react'

export type User = {
  id: string
  nama: string
  email: string
  role: string
  createdAt: string
}

type UsersResponse = {
  data: User[]
  meta: {
    page: number
    limit: number
    totalPages: number
  }
}

export const useUsers = (
  page: number,
  limit: number,
  search: string,
  sortBy: 'createdAt' | 'nama',
  order: 'asc' | 'desc',
) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)

        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          search,
          sortBy,
          order,
        })

        const res = await fetch(`/api/users?${params.toString()}`, {
          credentials: 'include',
        })

        if (!res.ok) throw new Error()

        const result: UsersResponse = await res.json()

        setUsers(result.data)
        setTotalPages(result.meta.totalPages ?? 1)
      } catch {
        setUsers([])
        setTotalPages(1)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [page, limit, search, sortBy, order])

  return { users, loading, totalPages }
}
