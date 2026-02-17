'use client'

import { useEffect, useState } from 'react'

type Jurusan = {
  id: string
  nama: string
  slug: string
  alias: string
  deskripsi: string
  prospekKerja: string
  createdAt: string
}

type JurusanResponse = {
  success: boolean
  data: Jurusan[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const useJurusan = (
  page: number,
  limit: number,
  search: string,
  sortBy: 'createdAt' | 'nama',
  order: 'asc' | 'desc',
) => {
  const [data, setData] = useState<Jurusan[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const res = await fetch(
          `/api/jurusan?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&order=${order}`,
        )

        const json =
          (await res.json()) as JurusanResponse

        if (!json.success)
          throw new Error('Gagal ambil data')

        setData(json.data)
        setTotalPages(json.meta.totalPages)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page, limit, search, sortBy, order])

  return {
    data,
    loading,
    totalPages,
  }
}
