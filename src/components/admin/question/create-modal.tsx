'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  X,
  Loader2,
  Save,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Dimensi =
  | 'logika'
  | 'numerik'
  | 'kreatif'
  | 'sosial'
  | 'teknis'

type Props = {
  open: boolean
  onOpenChange: (value: boolean) => void
  onSuccess: () => void
}

export const CreateQuestionModal = ({
  open,
  onOpenChange,
  onSuccess,
}: Props) => {
  const [text, setText] = useState('')
  const [dimensi, setDimensi] =
    useState<Dimensi>('logika')
  const [urutan, setUrutan] =
    useState<number>(1)
  const [aktif, setAktif] =
    useState<boolean>(true)
  const [loading, setLoading] =
    useState(false)

  const resetForm = () => {
    setText('')
    setDimensi('logika')
    setUrutan(1)
    setAktif(true)
  }

  const handleSubmit = async () => {
    if (loading) return

    try {
      setLoading(true)

      const res = await fetch('/api/questions', {
        method: 'POST',
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
        throw new Error(
          json.message ||
          'Gagal membuat soal',
        )
      }

      toast.success('Soal berhasil ditambahkan')

      resetForm()
      onOpenChange(false)
      onSuccess()
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan'

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg bg-white border border-gray-100 shadow-xl backdrop-blur-sm'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-gray-800'>
            ✨ Tambah Soal Baru
          </DialogTitle>
          <p className='text-sm text-gray-500 mt-1'>
            Lengkapi formulir berikut untuk menambahkan soal
          </p>
        </DialogHeader>

        <div className='space-y-4 mt-2'>

          {/* Text */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Teks Soal
            </label>
            <Textarea
              placeholder='Masukkan pertanyaan...'
              value={text}
              onChange={e =>
                setText(e.target.value)
              }
              rows={3}
              className='border-gray-200 focus:border-blue-400 focus:ring-blue-400 bg-gray-50/50 resize-none'
            />
          </div>

          {/* Dimensi */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Dimensi
            </label>

            <Select
              value={dimensi}
              onValueChange={value =>
                setDimensi(value as Dimensi)
              }
            >
              <SelectTrigger className='bg-white shadow-md hover:shadow-lg focus:shadow-lg transition-all duration-200 border-0'>
                <SelectValue placeholder='Pilih dimensi' />
              </SelectTrigger>

              <SelectContent className='bg-white shadow-xl border-0 rounded-xl'>
                <SelectItem value='logika'>
                  Logika
                </SelectItem>
                <SelectItem value='numerik'>
                  Numerik
                </SelectItem>
                <SelectItem value='kreatif'>
                  Kreatif
                </SelectItem>
                <SelectItem value='sosial'>
                  Sosial
                </SelectItem>
                <SelectItem value='teknis'>
                  Teknis
                </SelectItem>
              </SelectContent>
            </Select>
          </div>


          {/* Urutan */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Urutan
            </label>
            <Input
              type='number'
              min={1}
              value={urutan}
              onChange={e =>
                setUrutan(
                  Number(e.target.value),
                )
              }
              className='bg-transparent text-black border-gray-200 focus:border-blue-400 focus:ring-blue-400'
            />
          </div>

          {/* Status */}
          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={aktif}
              onChange={e =>
                setAktif(e.target.checked)
              }
              className='h-4 w-4'
            />
            <label className='text-sm text-gray-700'>
              Aktif
            </label>
          </div>

        </div>

        <DialogFooter className='mt-6 gap-2'>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className='flex items-center gap-2 bg-transparent border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
          >
            <X className='w-4 h-4' />
            Batal
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md min-w-[120px] transition-all duration-200'
          >
            {loading ? (
              <>
                <Loader2 className='w-4 h-4 animate-spin' />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className='w-4 h-4' />
                Simpan Soal
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
