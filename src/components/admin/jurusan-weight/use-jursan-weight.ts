'use client'

import { useCallback, useEffect, useState } from 'react'

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
    if (!jurusanId) return

    try {
      setLoading(true)

      const [weightRes, dimensiRes] =
        await Promise.all([
          fetch(
            `/api/jurusan-weights?jurusanId=${jurusanId}`,
            { credentials: 'include' },
          ),
          fetch('/api/questions/dimensi'),
        ])

      const weightJson = await weightRes.json()
      const dimensiJson = await dimensiRes.json()

      if (!weightRes.ok) {
        console.error(weightJson)
        return
      }

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

  const grouped: GroupedJurusanWeight[] =
    Object.values(
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

  return {
    data: grouped,
    dimensi,
    loading,
    refetch: fetchData,
  }
}
