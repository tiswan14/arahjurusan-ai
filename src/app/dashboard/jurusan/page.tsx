'use client'

import { useState } from 'react'
import { GraduationCap } from 'lucide-react'
import { useJurusan } from '@/components/admin/jurusan/use-jurusan'
import { JurusanTable } from '@/components/admin/jurusan/table'
import { JurusanToolbar } from '@/components/admin/jurusan/toolbar'

const Page = () => {
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(5)
  const [search, setSearch] = useState<string>('')
  const [sortBy, setSortBy] = useState<
    'createdAt' | 'nama'
  >('createdAt')
  const [order, setOrder] = useState<
    'asc' | 'desc'
  >('desc')

  const {
    data,
    loading,
    totalPages,
  } = useJurusan(
    page,
    limit,
    search,
    sortBy,
    order,
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>

        {/* Header */}
        <div className='mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='flex items-center gap-4'>
            <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-md shadow-blue-600/20'>
              <GraduationCap className='h-6 w-6 text-white' />
            </div>

            <div>
              <h1 className='text-2xl font-semibold tracking-tight text-gray-900'>
                Jurusan Management
              </h1>
              <p className='text-sm text-muted-foreground'>
                Kelola data jurusan yang tersedia di sistem
              </p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <JurusanToolbar
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

        {/* Table */}
        <JurusanTable
          data={data}
          loading={loading}
          page={page}
          limit={limit}
          totalPages={totalPages}
          onPageChange={setPage}
        />

      </div>
    </div>
  )
}

export default Page
