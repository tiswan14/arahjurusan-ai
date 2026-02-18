'use client'

import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react'

type Props = {
  page: number
  totalPages: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const delta = 2
    const range: number[] = []
    const rangeWithDots: (number | '...')[] = []
    let last: number | undefined

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i)
      }
    }

    for (const num of range) {
      if (last) {
        if (num - last === 2) {
          rangeWithDots.push(last + 1)
        } else if (num - last > 2) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(num)
      last = num
    }

    return rangeWithDots
  }

  const start = (page - 1) * limit + 1
  const end =
    start + limit - 1 > total
      ? total
      : start + limit - 1

  return (
    <div className='flex items-center justify-between px-6 py-4 border-t border-blue-100 bg-gradient-to-r from-blue-50/30 via-white to-blue-50/30'>

      {/* Info */}
      <div className='flex items-center gap-3'>
        <div className='h-8 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full' />
        <div className='space-y-0.5'>
          <p className='text-xs font-medium text-blue-600/70 uppercase tracking-wider'>
            Data
          </p>
          <p className='text-sm text-slate-600'>
            Menampilkan{' '}
            <span className='font-semibold text-blue-600'>
              {start}
            </span>{' '}
            -{' '}
            <span className='font-semibold text-blue-600'>
              {end}
            </span>{' '}
            dari{' '}
            <span className='font-semibold'>
              {total}
            </span>{' '}
            data
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className='flex items-center gap-2'>

        <Button
          size='sm'
          variant='outline'
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className='h-9 w-9 p-0 border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-50 rounded-lg'
        >
          <ChevronLeft className='w-4 h-4' />
        </Button>

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

            const isActive = page === item

            return (
              <Button
                key={item}
                size='sm'
                onClick={() => onPageChange(item)}
                className={`
                  h-9 w-9 p-0 text-sm font-medium rounded-lg transition-all
                  ${isActive
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                    : 'bg-white border border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600'
                  }
                `}
              >
                {item}
              </Button>
            )
          })}
        </div>

        <Button
          size='sm'
          variant='outline'
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className='h-9 w-9 p-0 border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-50 rounded-lg'
        >
          <ChevronRight className='w-4 h-4' />
        </Button>

      </div>
    </div>
  )
}
