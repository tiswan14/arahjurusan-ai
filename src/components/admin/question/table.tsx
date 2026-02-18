'use client'

import { motion } from 'framer-motion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  Sparkles,
  Hash,
  ListOrdered,
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react'
import { Pagination } from './pagination'

export type Question = {
  id: string
  text: string
  dimensi: string
  urutan: number
  aktif: boolean
  createdAt?: string
}

type Props = {
  data: Question[]
  loading: boolean
  page: number
  limit: number
  totalPages: number
  total: number
  onPageChange: (page: number) => void
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}


export const QuestionTable = ({
  data,
  loading,
  page,
  limit,
  totalPages,
  total,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}: Props) => {


  return (
    <div className='bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/20 overflow-hidden backdrop-blur-sm'>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow className='bg-gradient-to-r from-slate-50/80 to-white border-b border-slate-200'>

              <TableHead className='w-16 py-4'>
                <div className='flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                  <Hash className='w-3.5 h-3.5' />
                  <span>No</span>
                </div>
              </TableHead>

              <TableHead className='py-4'>
                <div className='flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                  <FileText className='w-3.5 h-3.5' />
                  <span>Teks Soal</span>
                </div>
              </TableHead>

              <TableHead className='py-4'>
                <div className='flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                  <ListOrdered className='w-3.5 h-3.5' />
                  <span>Urutan</span>
                </div>
              </TableHead>

              <TableHead className='py-4'>
                <span className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                  Dimensi
                </span>
              </TableHead>

              <TableHead className='py-4'>
                <span className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                  Status
                </span>
              </TableHead>

              <TableHead className='text-center pl-8'>
                <span className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                  Aksi
                </span>
              </TableHead>

            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Loading Skeleton */}
            {loading &&
              Array.from({ length: limit }).map((_, i) => (
                <TableRow
                  key={i}
                  className='border-b border-gray-100'
                >
                  <TableCell className='py-4'>
                    <Skeleton className='h-5 w-8 rounded-md bg-gray-200/60' />
                  </TableCell>

                  <TableCell className='py-4'>
                    <Skeleton className='h-5 w-60 rounded-md bg-gray-200/60' />
                  </TableCell>

                  <TableCell className='py-4'>
                    <Skeleton className='h-5 w-16 rounded-md bg-gray-200/60' />
                  </TableCell>

                  <TableCell className='py-4'>
                    <Skeleton className='h-6 w-20 rounded-full bg-gray-200/60' />
                  </TableCell>

                  <TableCell className='py-4'>
                    <Skeleton className='h-6 w-20 rounded-full bg-gray-200/60' />
                  </TableCell>

                  <TableCell className='py-4'>
                    <Skeleton className='h-5 w-28 rounded-md bg-gray-200/60' />
                  </TableCell>
                </TableRow>
              ))}

            {/* Empty State */}
            {!loading && data.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className='text-center py-20'>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex flex-col items-center gap-5'
                  >
                    <div className='relative'>
                      <div className='p-5 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-inner'>
                        <FileText className='w-20 h-20 text-slate-300' />
                      </div>
                      <div className='absolute -top-2 -right-2 p-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-200'>
                        <Sparkles className='w-4 h-4' />
                      </div>
                    </div>

                    <div className='space-y-2 max-w-sm'>
                      <p className='text-slate-800 font-semibold text-lg'>
                        Belum Ada Data Soal
                      </p>
                      <p className='text-sm text-slate-400 leading-relaxed'>
                        Tambahkan soal baru untuk mulai mengelola data pertanyaan.
                      </p>
                    </div>
                  </motion.div>
                </TableCell>
              </TableRow>
            )}

            {/* Data */}
            {!loading &&
              data.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className='group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 border-b border-slate-100 last:border-0'
                >
                  <TableCell className='py-4'>
                    <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-500 font-mono text-sm group-hover:bg-white group-hover:shadow-sm transition'>
                      {(page - 1) * limit + index + 1}
                    </div>
                  </TableCell>

                  <TableCell className='py-4'>
                    <p className='font-medium text-slate-700 line-clamp-2 max-w-xs'>
                      {item.text}
                    </p>
                  </TableCell>

                  <TableCell className='py-4'>
                    <Badge className='bg-emerald-50 text-emerald-700 border-0'>
                      {item.urutan}
                    </Badge>
                  </TableCell>

                  <TableCell className='py-4'>
                    <Badge variant='secondary'>
                      {item.dimensi}
                    </Badge>
                  </TableCell>

                  <TableCell className='py-4'>
                    <Badge
                      className={
                        item.aktif
                          ? 'bg-blue-50 text-blue-700 border-0'
                          : 'bg-slate-100 text-slate-500 border-0'
                      }
                    >
                      {item.aktif
                        ? 'Aktif'
                        : 'Nonaktif'}
                    </Badge>
                  </TableCell>

                  <TableCell className='py-4 text-right'>
                    <div className='flex items-center justify-end gap-2'>

                      <button
                        onClick={() =>
                          onView(item.id)
                        }
                        className='p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition'
                      >
                        <Eye className='w-4 h-4' />
                      </button>

                      <button
                        onClick={() =>
                          onEdit(item.id)
                        }
                        className='p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition'
                      >
                        <Pencil className='w-4 h-4' />
                      </button>

                      <button
                        onClick={() =>
                          onDelete(item.id)
                        }
                        className='p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>

                    </div>
                  </TableCell>

                </motion.tr>
              ))}
          </TableBody>
        </Table>


      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        limit={limit}
        onPageChange={onPageChange}
      />

    </div>
  )
}
