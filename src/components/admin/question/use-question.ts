'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

export type Question = {
  id: string
  text: string
  dimensi: string
  urutan: number
  aktif: boolean
  createdAt: string
  updatedAt: string
}

type Meta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

type ApiSuccessResponse = {
  data: Question[]
  meta: Meta
}

type ApiErrorResponse = {
  message: string
}

export const useQuestion = (
  page: number,
  limit: number,
  search: string,
  sortBy: 'createdAt' | 'urutan' | 'text',
  order: 'asc' | 'desc',
  dimensi?: string,
) => {
  const [data, setData] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] =
    useState<string | null>(null)
  const [totalPages, setTotalPages] =
    useState<number>(1)
  const [total, setTotal] = useState<number>(0)

  const abortRef = useRef<AbortController | null>(
    null,
  )

  const fetchData = useCallback(async () => {
    abortRef.current?.abort()

    const controller = new AbortController()
    abortRef.current = controller

    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        orderBy: sortBy,
        order,
      })

      if (search.trim()) {
        params.set('search', search.trim())
      }

      if (dimensi) {
        params.set('dimensi', dimensi)
      }


      const res = await fetch(
        `/api/questions?${params.toString()}`,
        {
          signal: controller.signal,
        },
      )

      const json:
        | ApiSuccessResponse
        | ApiErrorResponse =
        await res.json()

      if (!res.ok) {
        const message =
          'message' in json
            ? json.message
            : 'Terjadi kesalahan'

        throw new Error(message)
      }

      if (!('data' in json)) {
        throw new Error('Response tidak valid')
      }

      setData(json.data)
      setTotalPages(json.meta.totalPages)
      setTotal(json.meta.total)
    } catch (err) {
      if (err instanceof DOMException) return

      const message =
        err instanceof Error
          ? err.message
          : 'Unknown error'

      setError(message)
    } finally {
      setLoading(false)
    }
  }, [page, limit, search, sortBy, order, dimensi])

  useEffect(() => {
    fetchData()

    return () => {
      abortRef.current?.abort()
    }
  }, [fetchData])

  const removeLocal = (id: string) => {
    setData(prev =>
      prev.filter(item => item.id !== id),
    )
  }

  return {
    data,
    loading,
    error,
    totalPages,
    total,
    refetch: fetchData,
    removeLocal,
  }
}
