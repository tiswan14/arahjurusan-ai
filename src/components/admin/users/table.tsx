'use client'

import { format } from 'date-fns'
import { id as localeID } from 'date-fns/locale'
import { motion } from 'framer-motion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Calendar,
  Mail,
  User,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react'

export type User = {
  id: string
  nama: string
  email: string
  role: string
  createdAt: string
}

type Props = {
  users: User[]
  loading: boolean
  page: number
  limit: number
  totalPages: number
  onPageChange: (page: number) => void
  getRoleBadgeVariant: (role: string) => string
}

const getInitials = (name: string) => {
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const getAvatarColor = (name: string) => {
  const colors = [
    'from-blue-500 to-blue-600',
    'from-emerald-500 to-emerald-600',
    'from-amber-500 to-amber-600',
    'from-violet-500 to-violet-600',
    'from-rose-500 to-rose-600',
    'from-sky-500 to-sky-600',
    'from-indigo-500 to-indigo-600',
    'from-purple-500 to-purple-600',
  ]

  const sum = name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)

  return colors[sum % colors.length]
}

export const UsersTable = ({
  users,
  loading,
  page,
  limit,
  totalPages,
  onPageChange,
  getRoleBadgeVariant,
}: Props) => {
  return (
    <div className='bg-white rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/50 overflow-hidden'>
      {/* Header dengan gradient subtle */}

      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow className='bg-slate-50/50 border-b border-slate-100'>
              <TableHead className='w-12 text-xs font-medium text-slate-500 uppercase tracking-wider'>
                No
              </TableHead>
              <TableHead className='text-xs font-medium text-slate-500 uppercase tracking-wider'>
                <div className='flex items-center gap-2'>
                  <User className='w-3.5 h-3.5' />
                  Nama Lengkap
                </div>
              </TableHead>
              <TableHead className='text-xs font-medium text-slate-500 uppercase tracking-wider'>
                <div className='flex items-center gap-2'>
                  <Mail className='w-3.5 h-3.5' />
                  Email
                </div>
              </TableHead>
              <TableHead className='text-xs font-medium text-slate-500 uppercase tracking-wider'>
                <div className='flex items-center gap-2'>
                  <Shield className='w-3.5 h-3.5' />
                  Role
                </div>
              </TableHead>
              <TableHead className='text-xs font-medium text-slate-500 uppercase tracking-wider'>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-3.5 h-3.5' />
                  Tanggal Dibuat
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading &&
              Array.from({ length: limit }).map((_, i) => (
                <TableRow key={i} className='border-b border-slate-100'>
                  <TableCell><Skeleton className='h-5 w-8' /></TableCell>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Skeleton className='h-9 w-9 rounded-full' />
                      <Skeleton className='h-5 w-32' />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className='h-5 w-48' /></TableCell>
                  <TableCell><Skeleton className='h-6 w-20 rounded-full' /></TableCell>
                  <TableCell><Skeleton className='h-5 w-32' /></TableCell>
                </TableRow>
              ))}

            {!loading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className='text-center py-16'>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex flex-col items-center gap-4'
                  >
                    <div className='relative'>
                      <div className='p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50'>
                        <UserCircle className='w-16 h-16 text-slate-300' />
                      </div>
                      <div className='absolute -top-1 -right-1 p-1.5 rounded-full bg-amber-400 text-white shadow-sm'>
                        <Sparkles className='w-3 h-3' />
                      </div>
                    </div>
                    <div className='space-y-1 text-center'>
                      <p className='text-slate-700 font-medium'>
                        Belum Ada Data Pengguna
                      </p>
                      <p className='text-sm text-slate-400 max-w-sm'>
                        Sistem belum memiliki data pengguna. Tambahkan pengguna baru untuk mulai mengelola.
                      </p>
                    </div>
                  </motion.div>
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className='group hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-200 border-b border-slate-100 last:border-0'
                >
                  <TableCell className='text-sm text-slate-400 font-mono'>
                    {(page - 1) * limit + index + 1}
                  </TableCell>

                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-br ${getAvatarColor(
                          user.nama,
                        )} flex items-center justify-center text-white text-sm font-semibold shadow-sm shadow-slate-200 group-hover:scale-105 transition-transform duration-200`}
                      >
                        {getInitials(user.nama)}
                      </div>
                      <span className='font-medium text-slate-700 group-hover:text-slate-900 transition-colors'>
                        {user.nama}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className='text-sm text-slate-500 group-hover:text-slate-700 transition-colors'>
                      {user.email}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant='outline'
                      className={`${getRoleBadgeVariant(user.role)} font-medium capitalize border-0 shadow-sm px-3 py-1`}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <span className='text-sm text-slate-500'>
                      {format(new Date(user.createdAt), 'dd MMM yyyy', {
                        locale: localeID,
                      })}
                    </span>
                  </TableCell>
                </motion.tr>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination yang lebih modern */}
      <div className='flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50'>
        <p className='text-sm text-slate-600'>
          Halaman{' '}
          <span className='font-semibold text-slate-900'>
            {page}
          </span>{' '}
          dari{' '}
          <span className='font-semibold text-slate-900'>
            {totalPages}
          </span>
        </p>

        <div className='flex items-center gap-2'>
          <Button
            size='sm'
            variant='outline'
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className='border-slate-300 bg-white hover:bg-slate-100 hover:border-slate-400 disabled:opacity-40'
          >
            <ChevronLeft className='w-4 h-4' />
          </Button>

          <div className='flex items-center gap-1'>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = page

              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (page <= 3) {
                pageNum = i + 1
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = page - 2 + i
              }

              const isActive = pageNum === page

              return (
                <Button
                  key={pageNum}
                  size='sm'
                  variant={isActive ? 'default' : 'outline'}
                  onClick={() => onPageChange(pageNum)}
                  className={
                    isActive
                      ? 'w-9 bg-blue-600 hover:bg-blue-700 text-white'
                      : 'w-9 border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                  }
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            size='sm'
            variant='outline'
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className='border-slate-300 bg-white hover:bg-slate-100 hover:border-slate-400 disabled:opacity-40'
          >
            <ChevronRight className='w-4 h-4' />
          </Button>
        </div>
      </div>

    </div>
  )
}