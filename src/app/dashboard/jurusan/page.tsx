/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { GraduationCap, Plus } from 'lucide-react'
import { useJurusan } from '@/components/admin/jurusan/use-jurusan'
import { JurusanTable } from '@/components/admin/jurusan/table'
import { JurusanToolbar } from '@/components/admin/jurusan/toolbar'
import { Button } from '@/components/ui/button'
import { CreateJurusanModal } from '@/components/admin/jurusan/create-modal'
import { DetailJurusanModal } from '@/components/admin/jurusan/detail-modal'
import { EditJurusanModal } from '@/components/admin/jurusan/edit-modal'
import { DeleteJurusanModal } from '@/components/admin/jurusan/delete-modal'
import { toast } from 'react-toastify'
import { useJurusanModals } from '@/components/admin/jurusan/use-jurusan-modals'

const Page = () => {
  const [open, setOpen] = useState(false)
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
    removeLocal,
    refetch,
  } = useJurusan(
    page,
    limit,
    search,
    sortBy,
    order,
  )
  const [deleteName, setDeleteName] = useState<string>('')


  const {
    createOpen,
    setCreateOpen,
    detailOpen,
    detailId,
    openDetail,
    setDetailOpen,
    editOpen,
    editId,
    openEdit,
    setEditOpen,
    deleteOpen,
    deleteId,
    openDelete,
    setDeleteOpen,
  } = useJurusanModals()


  const [deleteLoading, setDeleteLoading] = useState(false)



  const handleView = async (id: string) => {
    openDetail(id)
  }

  const handleEdit = async (id: string) => {
    openEdit(id)
  }

  const handleDelete = (id: string, nama: string) => {
    setDeleteName(nama)
    openDelete(id)
  }



  const confirmDelete = async () => {
    if (!deleteId || deleteLoading) return

    try {
      setDeleteLoading(true)

      const res = await fetch(`/api/jurusan/${deleteId}`, {
        method: 'DELETE',
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.message || 'Gagal menghapus jurusan')
      }

      toast.success('Jurusan berhasil dihapus')

      // langsung hilang dari UI
      removeLocal(deleteId)

      setDeleteOpen(false)

      // optional: sinkronisasi ulang
      await refetch()
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan'

      toast.error(message)
    } finally {
      setDeleteLoading(false)
    }
  }



  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>

        {/* Header dengan desain lebih premium */}
        <div className="mb-8">

          <CreateJurusanModal
            open={open}
            onOpenChange={setOpen}
            onSuccess={() => {
              window.location.reload()
            }}
          />

          <DetailJurusanModal
            open={detailOpen}
            onOpenChange={setDetailOpen}
            id={detailId}
          />


          <EditJurusanModal
            open={editOpen}
            onOpenChange={setEditOpen}
            id={editId}
            onSuccess={refetch}
          />


          <DeleteJurusanModal
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            loading={deleteLoading}
            onConfirm={confirmDelete}
            nama={deleteName}
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
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </div>
    </div>
  )
}

export default Page

