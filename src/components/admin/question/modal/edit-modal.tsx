'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  FileText,
  Save,
  X,
  Loader2,
} from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  id: string | null
  onSuccess: () => void
}

export const EditQuestionModal = ({
  open,
  onOpenChange,
  id,
  onSuccess,
}: Props) => {
  const [text, setText] = useState('')
  const [dimensi, setDimensi] = useState('')
  const [urutan, setUrutan] = useState<number>(1)
  const [aktif, setAktif] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !id) return

    const fetchDetail = async () => {
      const res = await fetch(`/api/questions/${id}`)
      const json = await res.json()

      if (res.ok) {
        setText(json.text)
        setDimensi(json.dimensi)
        setUrutan(json.urutan)
        setAktif(json.aktif)
      }
    }

    fetchDetail()
  }, [open, id])

  const handleSubmit = async () => {
    if (!id) return

    try {
      setLoading(true)

      const res = await fetch(`/api/questions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          dimensi,
          urutan,
          aktif,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.message)
      }

      onSuccess()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-xl rounded-2xl border border-gray-100 bg-white shadow-2xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <FileText className='w-5 h-5 text-blue-600' />
            Edit Soal
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4 mt-4'>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>
              Teks Soal
            </label>
            <Textarea
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>
              Dimensi
            </label>
            <Input
              value={dimensi}
              onChange={e => setDimensi(e.target.value)}
              className='bg-transparent text-black'
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>
              Urutan
            </label>
            <Input
              type='number'
              value={urutan}
              onChange={e =>
                setUrutan(Number(e.target.value))
              }
              className='bg-transparent text-black'
            />
          </div>

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={aktif}
              onChange={e =>
                setAktif(e.target.checked)
              }
            />
            <span className='text-sm'>
              Aktif
            </span>
          </div>

        </div>

        <DialogFooter className='mt-6'>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className='bg-transparent text-black hover:bg-gray-200'
          >
            <X className='w-4 h-4 mr-2' />
            Batal
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <Save className='w-4 h-4 mr-2' />
            )}
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
