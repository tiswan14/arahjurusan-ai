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
  Hash,
  BookOpen,
  Eye,
  Pencil,
  BarChart3,
} from 'lucide-react'

export type GroupedJurusanWeight = {
  jurusanId: string
  jurusanNama: string
  weights: Record<string, number>
}

type Props = {
  data: GroupedJurusanWeight[]
  dimensi: string[]
  loading: boolean
  onEdit: (jurusanId: string) => void
  onDetail: (jurusanId: string) => void
}

export const JurusanWeightTable = ({
  data,
  dimensi,
  loading,
  onEdit,
  onDetail,
}: Props) => {
  return (
    <div className='mt-6 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/20 overflow-hidden backdrop-blur-sm'>
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
                  <BookOpen className='w-3.5 h-3.5' />
                  <span>Jurusan</span>
                </div>
              </TableHead>

              {dimensi.map(d => (
                <TableHead key={d} className='py-4'>
                  <div className='flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                    <BarChart3 className='w-3.5 h-3.5' />
                    <span>{d}</span>
                  </div>
                </TableHead>
              ))}

              <TableHead className='text-center py-4 pl-8'>
                <span className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                  Aksi
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className='border-b border-slate-100'>
                  <TableCell className='py-4'>
                    <Skeleton className='h-5 w-8 rounded-md bg-gray-200/60' />
                  </TableCell>
                  <TableCell className='py-4'>
                    <Skeleton className='h-5 w-40 rounded-md bg-gray-200/60' />
                  </TableCell>
                  {dimensi.map(d => (
                    <TableCell key={d} className='py-4'>
                      <Skeleton className='h-5 w-16 rounded-md bg-gray-200/60' />
                    </TableCell>
                  ))}
                  <TableCell className='py-4'>
                    <Skeleton className='h-8 w-24 rounded-md bg-gray-200/60 ml-auto' />
                  </TableCell>
                </TableRow>
              ))}

            {!loading && data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={dimensi.length + 3}
                  className='text-center py-20'
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex flex-col items-center gap-4'
                  >
                    <BookOpen className='w-14 h-14 text-slate-300' />
                    <div>
                      <p className='text-slate-800 font-semibold'>
                        Data Bobot Belum Tersedia
                      </p>
                      <p className='text-sm text-slate-400'>
                        Silakan konfigurasi bobot untuk setiap jurusan.
                      </p>
                    </div>
                  </motion.div>
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              data.map((row, index) => (
                <motion.tr
                  key={row.jurusanId}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className='group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 border-b border-slate-100 last:border-0'
                >
                  <TableCell className='py-4'>
                    <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-500 font-mono text-sm group-hover:bg-white group-hover:shadow-sm transition-all duration-200'>
                      {index + 1}
                    </div>
                  </TableCell>

                  <TableCell className='py-4'>
                    <span className='font-semibold text-slate-700 group-hover:text-blue-600 transition-colors duration-200'>
                      {row.jurusanNama}
                    </span>
                  </TableCell>

                  {dimensi.map(d => (
                    <TableCell key={d} className='py-4'>
                      <Badge
                        variant='secondary'
                        className='px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-0 shadow-sm'
                      >
                        {(row.weights[d] ?? 0).toFixed(2)}
                      </Badge>
                    </TableCell>
                  ))}

                  <TableCell className='py-4 text-right'>
                    <div className='flex items-center justify-end gap-2'>
                      <button
                        onClick={() => onDetail(row.jurusanId)}
                        className='cursor-pointer p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition'
                      >
                        <Eye className='w-4 h-4' />
                      </button>

                      <button
                        onClick={() => onEdit(row.jurusanId)}
                        className='cursor-pointer p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition'
                      >
                        <Pencil className='w-4 h-4' />
                      </button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
