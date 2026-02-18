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
  FileText,
  ListOrdered,
  Layers,
  ToggleRight,
  X,
  Loader2,
} from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  id: string | null
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

export const DetailQuestionModal = ({
  open,
  onOpenChange,
  id,
}: Props) => {
  const [data, setData] = useState<{
    text: string
    dimensi: string
    urutan: number
    aktif: boolean
  } | null>(null)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !id) return

    const fetchDetail = async () => {
      try {
        setLoading(true)

        const res = await fetch(`/api/questions/${id}`)
        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.message)
        }

        setData(json)
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [open, id])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-xl rounded-2xl border border-gray-100 bg-white shadow-2xl'>
        <DialogHeader className='space-y-2'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10'>
              <FileText className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <DialogTitle className='text-lg font-semibold text-gray-900'>
                Detail Soal
              </DialogTitle>
              <p className='text-xs text-gray-500'>
                Informasi lengkap soal
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
              icon={FileText}
              title='Teks Soal'
            >
              {data.text}
            </Section>

            <Section
              icon={Layers}
              title='Dimensi'
            >
              {data.dimensi}
            </Section>

            <Section
              icon={ListOrdered}
              title='Urutan'
            >
              {data.urutan}
            </Section>

            <Section
              icon={ToggleRight}
              title='Status'
            >
              {data.aktif
                ? 'Aktif'
                : 'Nonaktif'}
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
