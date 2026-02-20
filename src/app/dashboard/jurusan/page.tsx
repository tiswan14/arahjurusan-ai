'use client'

import { useCallback, useState } from 'react'
import { GraduationCap, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  useJurusan,
  useDeleteJurusan,
  useJurusanModals,
  JurusanTable,
  JurusanToolbar,
  JurusanModals,
} from '@/features/jurusan'

type QueryState = {
  page: number
  limit: number
  search: string
  sortBy: 'createdAt' | 'nama'
  order: 'asc' | 'desc'
}

const defaultQuery: QueryState = {
  page: 1,
  limit: 5,
  search: '',
  sortBy: 'createdAt',
  order: 'desc',
}

const Page = () => {
  const [open, setOpen] = useState(false)
  const [deleteName, setDeleteName] = useState<string>('')
  const [query, setQuery] = useState<QueryState>(defaultQuery)

  const {
    data,
    loading,
    totalPages,
    removeLocal,
    refetch,
  } = useJurusan(
    query.page,
    query.limit,
    query.search,
    query.sortBy,
    query.order,
  )


  const {
    detailOpen,
    detailId,
    openDetail,
    setDetailOpen,
    editOpen,
    editId,
    openEdit,
    setEditOpen,
    deleteOpen,
    openDelete,
    setDeleteOpen,
    deleteId,
  } = useJurusanModals()


  const handleView = (id: string) => {
    openDetail(id)
  }

  const handleEdit = (id: string) => {
    openEdit(id)
  }

  const handleDelete = (id: string, nama: string) => {
    setDeleteName(nama)
    openDelete(id)
  }

  const confirmDelete = () => {
    if (!deleteId) return
    remove(deleteId)
  }

  const handleDeleteSuccess = useCallback(async (id: string) => {
    removeLocal(id)
    setDeleteOpen(false)
    await refetch()
  }, [removeLocal, setDeleteOpen, refetch])

  const { loading: deleteLoading, remove } = useDeleteJurusan({
    onSuccess: handleDeleteSuccess,
  })


  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        {/* Header dengan desain lebih premium */}
        <div className="mb-8">
          <JurusanModals
            open={open}
            setOpen={setOpen}
            detailOpen={detailOpen}
            setDetailOpen={setDetailOpen}
            detailId={detailId}
            editOpen={editOpen}
            setEditOpen={setEditOpen}
            editId={editId}
            deleteOpen={deleteOpen}
            setDeleteOpen={setDeleteOpen}
            deleteLoading={deleteLoading}
            confirmDelete={confirmDelete}
            deleteName={deleteName}
            refetch={refetch}
          />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left section dengan gradient background subtle */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-2xl blur-lg opacity-20"></div>
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg shadow-blue-600/30">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Manajemen Jurusan
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                  <p>Kelola dan pantau data jurusan secara efektif</p>
                </div>
              </div>
            </div>

            {/* Tombol tambah dengan desain lebih elegan */}
            <Button
              onClick={() => setOpen(true)}
              className='h-11 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2'
            >
              <Plus className='w-4 h-4' />
              <span className='text-sm font-semibold'>Tambah Jurusan</span>
            </Button>

          </div>

          {/* Divider dekoratif */}
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent"></div>
        </div>

        {/* Toolbar dengan desain minimalis namun modern */}
        <JurusanToolbar
          search={query.search}
          onSearchChange={value =>
            setQuery(prev => ({
              ...prev,
              page: 1,
              search: value,
            }))
          }
          sortBy={query.sortBy}
          order={query.order}
          onSortChange={(field, direction) =>
            setQuery(prev => ({
              ...prev,
              page: 1,
              sortBy: field,
              order: direction,
            }))
          }
        />

        {/* Table */}
        <JurusanTable
          data={data}
          loading={loading}
          page={query.page}
          limit={query.limit}
          totalPages={totalPages}
          onPageChange={page =>
            setQuery(prev => ({
              ...prev,
              page,
            }))
          }
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </div>
    </div>
  )
}

export default Page

