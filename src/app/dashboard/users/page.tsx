'use client'

import { useState } from 'react'
import {
  Users} from 'lucide-react'
import { useUsers } from '@/components/admin/users/use-users'
import { UsersTable } from '@/components/admin/users/table'
import { UsersToolbar } from '@/components/admin/users/toolbar'


const Page = () => {
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(6)
  const [search, setSearch] = useState<string>('')
  const [sortBy, setSortBy] = useState<'createdAt' | 'nama'>('createdAt')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')

  const { users, loading, totalPages } = useUsers(
    page,
    limit,
    search,
    sortBy,
    order,
  )

  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/20'
      case 'superadmin':
        return 'bg-purple-500/10 text-purple-600 border-purple-200 hover:bg-purple-500/20'
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200 hover:bg-gray-500/20'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className='mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='flex items-center gap-4'>
            <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-md shadow-blue-600/20'>
              <Users className='h-6 w-6 text-white' />
            </div>

            <div>
              <h1 className='text-2xl font-semibold tracking-tight text-gray-900'>
                User Management
              </h1>
              <p className='text-sm text-muted-foreground'>
                Kelola, pantau, dan atur akses pengguna sistem
              </p>
            </div>
          </div>
        </div>


        {/* Search Bar */}
        <UsersToolbar
          search={search}
          onSearchChange={value => {
            setPage(1)
            setSearch(value)
          }}
          sortBy={sortBy}
          order={order}
          onSortChange={(field, direction) => {
            setPage(1)
            setSortBy(field)
            setOrder(direction)
          }}
        />



        {/* Table Card */}
        <UsersTable
          users={users}
          loading={loading}
          page={page}
          limit={limit}
          totalPages={totalPages}
          onPageChange={setPage}
          getRoleBadgeVariant={getRoleBadgeVariant}
        />

      </div>
    </div>
  )
}

export default Page