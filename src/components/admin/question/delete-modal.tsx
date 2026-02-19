'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Trash2,
  AlertCircle,
  Loader2,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  id: string | null
  onSuccess: () => void
}

export const DeleteQuestionModal = ({
  open,
  onOpenChange,
  id,
  onSuccess,
}: Props) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!id) return

    try {
      setLoading(true)

      const res = await fetch(`/api/questions/${id}`, {
        method: 'DELETE',
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.message || 'Gagal menghapus soal')
      }

      toast.success('Soal berhasil dihapus')

      onSuccess()
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


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md p-0 gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl'>
        {/* Header with gradient line */}
        <div className='relative'>
          <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600' />

          <DialogHeader className='px-6 pt-6 pb-4'>
            <DialogTitle className='flex items-center gap-3 text-xl font-semibold text-slate-800'>
              <div className='p-2 rounded-full bg-blue-50'>
                <Trash2 className='w-5 h-5 text-red-600' />
              </div>
              Hapus Soal
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className='px-6 py-4'>
          <div className='flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200'>
            <div className='flex-shrink-0'>
              <div className='p-1.5 rounded-full bg-amber-100'>
                <AlertCircle className='w-5 h-5 text-amber-600' />
              </div>
            </div>
            <div className='space-y-1.5'>
              <p className='text-sm font-medium text-slate-800'>
                Apakah Anda yakin ingin menghapus soal ini?
              </p>
              <p className='text-sm text-slate-600'>
                Tindakan ini tidak dapat dibatalkan. Soal yang dihapus akan hilang secara permanen dari sistem.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className='px-6 py-4 bg-slate-50/80 border-t border-slate-200'>
          <div className='flex items-center justify-end gap-3 w-full'>
            <Button
              variant='ghost'
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className='h-11 px-5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            >
              <X className='w-4 h-4 mr-2' />
              Batal
            </Button>

            <Button
              onClick={handleDelete}
              disabled={loading}
              className='h-11 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-sm transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100'
            >
              {loading ? (
                <>
                  <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                  Menghapus...
                </>
              ) : (
                <>
                  <Trash2 className='w-4 h-4 mr-2' />
                  Hapus Soal
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}