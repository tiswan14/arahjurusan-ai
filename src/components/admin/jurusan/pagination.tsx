'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

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

  const getPageNumbers = () => {
    const delta = 2
    const range = []
    const rangeWithDots: (string | number)[] = []
    let l: number

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        range.push(i)
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(i)
      l = i
    })

    return rangeWithDots
  }

  return (
    <div className='flex items-center justify-between px-6 py-4 border-t border-blue-100 bg-gradient-to-r from-blue-50/30 via-white to-blue-50/30'>
      {/* Informasi Halaman dengan desain lebih menarik */}
      <div className='flex items-center gap-3'>
        <div className='h-8 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full' />
        <div className='space-y-0.5'>
          <p className='text-xs font-medium text-blue-600/70 uppercase tracking-wider'>
            Pagination
          </p>
          <p className='text-sm text-slate-600'>
            <span className='font-semibold text-blue-600'>{page}</span>
            <span className='mx-1.5 text-slate-300'>/</span>
            <span className='text-slate-500'>{totalPages} halaman</span>
          </p>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        {/* Tombol Previous */}
        <Button
          size='sm'
          variant='outline'
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className='h-9 w-9 p-0 border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:border-blue-200 disabled:hover:text-slate-400 transition-all duration-200 rounded-lg'
        >
          <ChevronLeft className='w-4 h-4' />
        </Button>

        {/* Nomor Halaman */}
        <div className='flex items-center gap-1'>
          {getPageNumbers().map((item, index) => {
            if (item === '...') {
              return (
                <div
                  key={`dots-${index}`}
                  className='w-9 h-9 flex items-center justify-center'
                >
                  <MoreHorizontal className='w-4 h-4 text-slate-400' />
                </div>
              )
            }

            const pageNumber = item as number
            const isActive = page === pageNumber

            return (
              <Button
                key={pageNumber}
                size='sm'
                onClick={() => onPageChange(pageNumber)}
                className={`
                  h-9 w-9 p-0 text-sm font-medium transition-all duration-200 rounded-lg
                  ${isActive
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 scale-110'
                    : 'bg-white border border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600 hover:text-blue-600'
                  }
                `}
              >
                {pageNumber}
              </Button>
            )
          })}
        </div>

        {/* Tombol Next */}
        <Button
          size='sm'
          variant='outline'
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className='h-9 w-9 p-0 border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:border-blue-200 disabled:hover:text-slate-400 transition-all duration-200 rounded-lg'
        >
          <ChevronRight className='w-4 h-4' />
        </Button>
      </div>
    </div>
  )
}