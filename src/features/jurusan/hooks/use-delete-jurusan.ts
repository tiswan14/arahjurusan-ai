import { useState } from 'react'
import { toast } from 'react-toastify'

type UseDeleteJurusanProps = {
  onSuccess: (id: string) => Promise<void> | void,
}

export const useDeleteJurusan = ({
  onSuccess,
}: UseDeleteJurusanProps) => {
  const [loading, setLoading] = useState(false)

  const remove = async (id: string) => {
    if (loading) return

    try {
      setLoading(true)

      const res = await fetch(`/api/jurusan/${id}`, {
        method: 'DELETE',
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.message ?? 'Gagal menghapus jurusan')
      }

      toast.success('Jurusan berhasil dihapus')

      await onSuccess(id)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan'

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    remove,
  }
}