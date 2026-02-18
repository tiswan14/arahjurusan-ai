'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Trash2, X } from 'lucide-react'

type DeleteJurusanModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  loading: boolean
  onConfirm: () => void
}

export const DeleteJurusanModal = ({
  open,
  onOpenChange,
  loading,
  onConfirm,
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
        <div className='px-6 py-5 bg-white'>
          <p className='text-sm text-gray-700 leading-relaxed'>
            Data yang sudah dihapus tidak dapat dikembalikan.
            <span className='block mt-1 font-medium text-gray-900'>
              Yakin ingin melanjutkan?
            </span>
          </p>
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