'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

export type JurusanWeight = {
  id: string
  jurusan: {
    id: string
    nama: string
  }
  dimensi: string
  bobot: number
}

export type GroupedJurusanWeight = {
  jurusanId: string
  jurusanNama: string
  weights: Record<string, number>
}

export const useJurusanWeight = (jurusanId?: string) => {
  const [raw, setRaw] = useState<JurusanWeight[]>([])
  const [dimensi, setDimensi] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)

      const url = jurusanId
        ? `/api/jurusan-weights?jurusanId=${jurusanId}`
        : '/api/jurusan-weights'

      const [weightRes, dimensiRes] =
        await Promise.all([
          fetch(url, {
            credentials: 'include',
          }),
          fetch('/api/questions/dimensi'),
        ])

      if (!weightRes.ok) {
        const error = await weightRes.json()
        console.error(error)
        return
      }

      const weightJson = await weightRes.json()
      const dimensiJson = await dimensiRes.json()

      if (dimensiRes.ok) {
        setDimensi(dimensiJson.data ?? [])
      }

      setRaw(weightJson.data ?? [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [jurusanId])


  useEffect(() => {
    fetchData()
  }, [fetchData])

  const grouped = useMemo(() => {
    return Object.values(
      raw.reduce((acc, item) => {
        const id = item.jurusan.id

        if (!acc[id]) {
          acc[id] = {
            jurusanId: id,
            jurusanNama: item.jurusan.nama,
            weights: {},
          }
        }

        acc[id].weights[item.dimensi] =
          item.bobot

        return acc
      }, {} as Record<string, GroupedJurusanWeight>),
    )
  }, [raw])

  return {
    data: grouped,
    dimensi,
    loading,
    refetch: fetchData,
  }
}
