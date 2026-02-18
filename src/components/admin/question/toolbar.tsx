'use client'

import { Input } from '@/components/ui/input'
import {
  Search,
  Calendar,
  CalendarClock,
  ArrowUpDown,
  ArrowUpAZ,
  ArrowDownZA,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SortField =
  | 'createdAt'
  | 'urutan'
  | 'text'

type Props = {
  search: string
  onSearchChange: (value: string) => void
  sortBy: SortField
  order: 'asc' | 'desc'
  onSortChange: (
    field: SortField,
    direction: 'asc' | 'desc',
  ) => void
}

export const QuestionToolbar = ({
  search,
  onSearchChange,
  sortBy,
  order,
  onSortChange,
}: Props) => {
  return (
    <div className='mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>

      {/* Search */}
      <div className='relative w-full sm:max-w-md group'>
        <Search
          className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors'
        />

        <Input
          placeholder='Cari soal berdasarkan teks...'
          value={search}
          onChange={e =>
            onSearchChange(e.target.value)
          }
          className='pl-11 pr-4 h-11 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all'
        />
      </div>

      {/* Sort */}
      <Select
        value={`${sortBy}-${order}`}
        onValueChange={value => {
          const [field, direction] =
            value.split('-') as [
              SortField,
              'asc' | 'desc',
            ]

          onSortChange(field, direction)
        }}
      >
        <SelectTrigger className='w-full sm:w-[260px] h-11 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 focus:ring-2 focus:ring-slate-200 transition'>
          <div className='flex items-center gap-2'>
            <ArrowUpDown className='w-4 h-4 text-slate-500' />
            <SelectValue placeholder='Urutkan soal' />
          </div>
        </SelectTrigger>

        <SelectContent className='rounded-xl border border-slate-200 bg-white shadow-lg p-1'>

          {/* Terbaru */}
          <SelectItem
            value='createdAt-desc'
            className='rounded-lg focus:bg-blue-50 data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-700'
          >
            <div className='flex items-center gap-3'>
              <CalendarClock className='w-4 h-4 text-blue-600' />
              <span>Terbaru</span>
            </div>
          </SelectItem>

          {/* Terlama */}
          <SelectItem
            value='createdAt-asc'
            className='rounded-lg focus:bg-amber-50 data-[state=checked]:bg-amber-50 data-[state=checked]:text-amber-700'
          >
            <div className='flex items-center gap-3'>
              <Calendar className='w-4 h-4 text-amber-600' />
              <span>Terlama</span>
            </div>
          </SelectItem>

          {/* Text A-Z */}
          <SelectItem
            value='text-asc'
            className='rounded-lg focus:bg-sky-50 data-[state=checked]:bg-sky-50 data-[state=checked]:text-sky-700'
          >
            <div className='flex items-center gap-3'>
              <ArrowUpAZ className='w-4 h-4 text-sky-600' />
              <span>Teks A-Z</span>
            </div>
          </SelectItem>

          {/* Text Z-A */}
          <SelectItem
            value='text-desc'
            className='rounded-lg focus:bg-rose-50 data-[state=checked]:bg-rose-50 data-[state=checked]:text-rose-700'
          >
            <div className='flex items-center gap-3'>
              <ArrowDownZA className='w-4 h-4 text-rose-600' />
              <span>Teks Z-A</span>
            </div>
          </SelectItem>

        </SelectContent>
      </Select>
    </div>
  )
}
