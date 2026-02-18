'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Trash2, X, BookOpen } from 'lucide-react'

type DeleteJurusanModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  loading: boolean
  onConfirm: () => void
  nama: string // Tambahkan prop untuk nama jurusan
}

export const DeleteJurusanModal = ({
  open,
  onOpenChange,
  loading,
  onConfirm,
  nama,
}: DeleteJurusanModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md rounded-2xl border-0 p-0 overflow-hidden gap-0'>
        {/* Gradient Header */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4'>
          <DialogHeader className='p-0'>
            <DialogTitle className='text-white text-lg font-semibold flex items-center gap-2'>
              <AlertTriangle className='w-5 h-5' />
              Hapus Jurusan
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className='px-6 py-5 bg-white space-y-4'>
          {/* Nama Jurusan yang akan dihapus */}
          <div className='flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl'>
            <div className='flex-shrink-0'>
              <BookOpen className='w-5 h-5 text-amber-600' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-xs font-medium text-amber-700 uppercase tracking-wider'>
                Jurusan yang akan dihapus
              </p>
              <p className='text-base font-semibold text-gray-900 mt-0.5 break-words'>
                {nama}
              </p>
            </div>
          </div>

          {/* Warning Message */}
          <div className='space-y-1'>
            <p className='text-sm text-gray-700 leading-relaxed'>
              Data yang sudah dihapus tidak dapat dikembalikan.
            </p>
            <p className='text-sm font-medium text-gray-900'>
              Yakin ingin menghapus jurusan ini?
            </p>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className='px-6 py-4 bg-gray-50 border-t border-gray-100 sm:space-x-3'>
          <Button
            variant='ghost'
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className='bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium px-6 flex items-center gap-2'
          >
            <X className='w-4 h-4' />
            Batal
          </Button>

          <Button
            variant='destructive'
            onClick={onConfirm}
            disabled={loading}
            className='bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-6 shadow-sm hover:shadow transition-all duration-200'
          >
            {loading ? (
              <span className='flex items-center gap-2'>
                <svg
                  className='animate-spin h-4 w-4 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
                Menghapus...
              </span>
            ) : (
              <span className='flex items-center gap-2'>
                <Trash2 className='w-4 h-4' />
                Hapus
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}