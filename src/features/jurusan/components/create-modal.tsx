'use client'

import { useEffect, useState } from 'react'
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
import { X, Loader2, Save } from 'lucide-react'
import { createJurusan } from '@/features/jurusan'

type Props = {
  open: boolean
  onOpenChange: (value: boolean) => void
  onSuccess: () => Promise<void> | void
}

type FormState = {
  nama: string
  alias: string
  deskripsi: string
  prospekKerja: string
}

const initialState: FormState = {
  nama: '',
  alias: '',
  deskripsi: '',
  prospekKerja: '',
}

export const CreateJurusanModal = ({
  open,
  onOpenChange,
  onSuccess,
}: Props) => {
  const [form, setForm] = useState<FormState>(initialState)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }))
  }


  const resetForm = () => {
    setForm(initialState)
  }


  const handleSubmit = async () => {
    if (loading) return

    if (!form.nama.trim()) {
      toast.error('Nama jurusan wajib diisi')
      return
    }

    try {
      setLoading(true)
      const sanitizedForm = {
        ...form,
        nama: form.nama.trim(),
        alias: form.alias.trim(),
      }
      await createJurusan(sanitizedForm)

      toast.success('Jurusan berhasil ditambahkan')

      resetForm()
      onOpenChange(false)
      await onSuccess()
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

  useEffect(() => {
    if (!open) {
      resetForm()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg bg-white border border-gray-100 shadow-xl backdrop-blur-sm'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-gray-800'>
            Tambah Jurusan Baru
          </DialogTitle>
          <p className='text-sm text-gray-500 mt-1'>
            Lengkapi formulir berikut untuk menambahkan jurusan
          </p>
        </DialogHeader>

        <div className='space-y-4 mt-2'>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Nama Jurusan
            </label>
            <Input
              placeholder='Contoh: Rekayasa Perangkat Lunak'
              value={form.nama}
              onChange={e => handleChange('nama', e.target.value)}
              className='text-black border-gray-200 focus:border-blue-400 focus:ring-blue-400 bg-gray-50/50'
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Alias
            </label>
            <Input
              placeholder='Contoh: RPL'
              value={form.alias}
              onChange={e => handleChange('alias', e.target.value)}
              className='text-black border-gray-200 focus:border-blue-400 focus:ring-blue-400 bg-gray-50/50'
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Deskripsi Jurusan
            </label>
            <Textarea
              placeholder='Jelaskan tentang jurusan ini...'
              value={form.deskripsi}
              onChange={e => handleChange('deskripsi', e.target.value)}
              rows={3}
              className='border-gray-200 focus:border-blue-400 focus:ring-blue-400 bg-gray-50/50 resize-none'
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Prospek Kerja
            </label>
            <Textarea
              placeholder='Sebutkan peluang karir setelah lulus...'
              value={form.prospekKerja}
              onChange={e => handleChange('prospekKerja', e.target.value)}
              rows={2}
              className='border-gray-200 focus:border-blue-400 focus:ring-blue-400 bg-gray-50/50 resize-none'
            />
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
            disabled={loading || !form.nama.trim()}
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
                Simpan Jurusan
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}