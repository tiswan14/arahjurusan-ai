'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) return null

  return (
    <div className='flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-gradient-to-r from-slate-50/80 to-white'>
      <p className='text-sm text-slate-600'>
        <span className='font-medium text-slate-800'>
          Halaman {page}
        </span>
        <span className='mx-1 text-slate-300'>•</span>
        <span>Total {totalPages} halaman</span>
      </p>

      <div className='flex items-center gap-3'>
        <Button
          size='sm'
          variant='outline'
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className='h-9 w-9 p-0'
        >
          <ChevronLeft className='w-4 h-4' />
        </Button>

        {[...Array(Math.min(5, totalPages))].map((_, i) => {
          const pageNumber = i + 1
          const active = page === pageNumber

          return (
            <Button
              key={pageNumber}
              size='sm'
              variant={active ? 'default' : 'outline'}
              onClick={() => onPageChange(pageNumber)}
              className='h-9 w-9 p-0'
            >
              {pageNumber}
            </Button>
          )
        })}

        <Button
          size='sm'
          variant='outline'
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className='h-9 w-9 p-0'
        >
          <ChevronRight className='w-4 h-4' />
        </Button>
      </div>
    </div>
  )
}
