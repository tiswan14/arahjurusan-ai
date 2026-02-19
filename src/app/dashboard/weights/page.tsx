'use client'

import { Scale, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JurusanWeightTable } from '@/components/admin/jurusan-weight/table'
import { useJurusanWeight } from '@/components/admin/jurusan-weight/use-jursan-weight'

const Page = () => {
  const jurusanId = 'cmlpgzatc0000ccckw0i11bez'

  const {
    data,
    dimensi,
    loading,
    refetch,
  } = useJurusanWeight(jurusanId)

  const handleEdit = (id: string) => {
    console.log('edit', id)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/jurusan-weights/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    refetch()
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
                  <Scale className='h-7 w-7 text-white' />
                </div>
              </div>

              <div className='space-y-1'>
                <h1 className='text-2xl font-bold tracking-tight text-gray-900'>
                  Manajemen Bobot Jurusan
                </h1>
                <p className='text-sm text-gray-500'>
                  Atur bobot dimensi per jurusan
                </p>
              </div>
            </div>

            <Button className='h-11 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2'>
              <Plus className='w-4 h-4' />
              <span className='text-sm font-semibold'>
                Tambah Bobot
              </span>
            </Button>

          </div>

          <div className='mt-6 h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent' />
        </div>

        <JurusanWeightTable
          data={data}
          dimensi={dimensi}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default Page
