'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  GraduationCap,
  Tag,
  FileText,
  Briefcase,
  X,
  Loader2,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { getJurusanDetail } from '@/features/jurusan'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  id: string | null
}

type JurusanDetail = {
  nama: string
  alias: string
  deskripsi: string
  prospekKerja: string
}


const Section = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) => (
  <div className='space-y-2'>
    <div className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
      <Icon className='w-4 h-4 text-blue-600' />
      <span>{title}</span>
    </div>
    <div className='p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap'>
      {children}
    </div>
  </div>
)

export const DetailJurusanModal = ({
  open,
  onOpenChange,
  id,
}: Props) => {

  const [data, setData] = useState<JurusanDetail | null>(null)


  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !id) return

    let isMounted = true

    const fetchDetail = async () => {
      try {
        setLoading(true)
        const detail = await getJurusanDetail(id)
        if (isMounted) {
          setData(detail)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchDetail()

    return () => {
      isMounted = false
    }
  }, [open, id])

  useEffect(() => {
    if (!open) {
      setData(null)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-xl rounded-2xl border border-gray-100 bg-white shadow-2xl'>
        <DialogHeader className='space-y-2'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10'>
              <GraduationCap className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <DialogTitle className='text-lg font-semibold text-gray-900'>
                Detail Jurusan
              </DialogTitle>
              <p className='text-xs text-gray-500'>
                Informasi lengkap jurusan
              </p>
            </div>
          </div>
        </DialogHeader>

        {loading && (
          <div className='flex items-center justify-center py-10'>
            <Loader2 className='w-6 h-6 animate-spin text-blue-600' />
            <span className='ml-2 text-sm text-gray-500'>
              Memuat data...
            </span>
          </div>
        )}

        {!loading && data && (
          <div className='space-y-6 mt-2'>
            <Section
              icon={GraduationCap}
              title='Nama Jurusan'
            >
              {data.nama}
            </Section>

            <Section icon={Tag} title='Alias'>
              {data.alias}
            </Section>

            <Section
              icon={FileText}
              title='Deskripsi Jurusan'
            >
              {data.deskripsi}
            </Section>

            <Section
              icon={Briefcase}
              title='Prospek Kerja'
            >
              {data.prospekKerja}
            </Section>
          </div>
        )}

        <DialogFooter className='mt-8'>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className='rounded-xl bg-transparent border-gray-200 text-gray-800 hover:bg-gray-50 hover:text-gray-900'
          >
            <X className='w-4 h-4 mr-2' />
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
