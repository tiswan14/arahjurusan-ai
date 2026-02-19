'use client'

import { useState } from 'react'
import { FileText, Plus } from 'lucide-react'
import { useQuestion } from '@/components/admin/question/use-question'
import { QuestionTable } from '@/components/admin/question/table'
import { QuestionToolbar } from '@/components/admin/question/toolbar'
import { Button } from '@/components/ui/button'
import { DetailQuestionModal } from '@/components/admin/question/detail-modal'
import { EditQuestionModal } from '@/components/admin/question/edit-modal'
import { DeleteQuestionModal } from '@/components/admin/question/delete-modal'
import { CreateQuestionModal } from '@/components/admin/question/create-modal'

const Page = () => {
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(5)
  const [search, setSearch] = useState<string>('')
  const [detailOpen, setDetailOpen] = useState(false)
  const [detailId, setDetailId] = useState<string | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [dimensi, setDimensi] =
    useState<string | undefined>()

  const [createOpen, setCreateOpen] = useState(false)


  const [sortBy, setSortBy] = useState<
    'createdAt' | 'urutan' | 'text'
  >('createdAt')

  const [order, setOrder] = useState<
    'asc' | 'desc'
  >('desc')

  const {
    data,
    loading,
    totalPages,
    total,
    refetch,
  } = useQuestion(
    page,
    limit,
    search,
    sortBy,
    order,
    dimensi,
  )



  const handleView = (id: string) => {
    setDetailId(id)
    setDetailOpen(true)
  }

  const handleEdit = (id: string) => {
    setEditId(id)
    setEditOpen(true)
  }
  const handleDelete = (id: string) => {
    setDeleteId(id)
    setDeleteOpen(true)
  }


  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>

        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>

            <div className='flex items-center gap-5'>
              <div className='relative'>
                <div className='absolute inset-0 bg-blue-600 rounded-2xl blur-lg opacity-20' />
                <div className='relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg shadow-blue-600/30'>
                  <FileText className='h-7 w-7 text-white' />
                </div>
              </div>

              <div className='space-y-1'>
                <h1 className='text-2xl font-bold tracking-tight text-gray-900'>
                  Manajemen Soal
                </h1>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                  <div className='h-1.5 w-1.5 rounded-full bg-blue-600' />
                  <p>Kelola dan pantau data soal secara efektif</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setCreateOpen(true)}
              className='h-11 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2'
            >
              <Plus className='w-4 h-4' />
              <span className='text-sm font-semibold'>
                Tambah Soal
              </span>
            </Button>

          </div>

          <div className='mt-6 h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent' />
        </div>

        <DetailQuestionModal
          open={detailOpen}
          onOpenChange={setDetailOpen}
          id={detailId}
        />

        <EditQuestionModal
          open={editOpen}
          onOpenChange={setEditOpen}
          id={editId}
          onSuccess={() => {
            setEditOpen(false)
            refetch()
          }}
        />


        <DeleteQuestionModal
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          id={deleteId}
          onSuccess={() => {
            setDeleteOpen(false)
            refetch()
          }}
        />

        <CreateQuestionModal
          open={createOpen}
          onOpenChange={setCreateOpen}
          onSuccess={() => {
            setCreateOpen(false)
            refetch()
          }}
        />



        {/* Toolbar */}
        <QuestionToolbar
          search={search}
          dimensi={dimensi}
          onDimensiChange={value => {
            setPage(1)
            setDimensi(value)
          }}
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
        <QuestionTable
          data={data}
          loading={loading}
          page={page}
          limit={limit}
          totalPages={totalPages}
          total={total}
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
