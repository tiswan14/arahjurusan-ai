'use client'

import { useEffect, useState } from 'react'
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
  GraduationCap,
  Tag,
  FileText,
  Briefcase,
  Save,
  Loader2,
  X,
} from 'lucide-react'
import { toast } from 'react-toastify'
import { getJurusanDetail, updateJurusan } from '@/features/jurusan'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  id: string | null
  onSuccess: () => void
}

const Field = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) => (
  <div className='space-y-2'>
    <div className='flex items-center gap-2 text-sm font-medium text-gray-700'>
      <Icon className='w-4 h-4 text-blue-600' />
      <span>{label}</span>
    </div>
    {children}
  </div>
)


type JurusanForm = {
  nama: string
  alias: string
  deskripsi: string
  prospekKerja: string
}

const EMPTY_FORM: JurusanForm = {
  nama: '',
  alias: '',
  deskripsi: '',
  prospekKerja: '',
}

export const EditJurusanModal = ({
  open,
  onOpenChange,
  id,
  onSuccess,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<JurusanForm>(EMPTY_FORM)
  const [initialForm, setInitialForm] = useState<JurusanForm>(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open || !id) return

    const fetchDetail = async () => {
      try {
        setLoading(true)

        const data = await getJurusanDetail(id)

        setForm({
          nama: data.nama,
          alias: data.alias,
          deskripsi: data.deskripsi,
          prospekKerja: data.prospekKerja,
        })

        setInitialForm({
          nama: data.nama,
          alias: data.alias,
          deskripsi: data.deskripsi,
          prospekKerja: data.prospekKerja,
        })
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(error)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [open, id])


  const isChanged =
    form.nama !== initialForm.nama ||
    form.alias !== initialForm.alias ||
    form.deskripsi !== initialForm.deskripsi ||
    form.prospekKerja !== initialForm.prospekKerja

  const handleChange = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!id) return

    try {
      setSubmitting(true)

      await updateJurusan(id, form)

      toast.success('Jurusan berhasil diperbarui')

      onSuccess()
      onOpenChange(false)
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan pada server',
      )
    } finally {
      setSubmitting(false)
    }
  }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-xl rounded-2xl bg-white border border-gray-200 shadow-2xl'>
        <DialogHeader className='space-y-2'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10'>
              <GraduationCap className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <DialogTitle className='text-lg font-semibold text-gray-900'>
                Edit Jurusan
              </DialogTitle>
              <p className='text-sm text-gray-500'>
                Perbarui informasi jurusan
              </p>
            </div>
          </div>
        </DialogHeader>

        {loading ? (
          <div className='flex items-center justify-center py-8'>
            <Loader2 className='w-6 h-6 animate-spin text-blue-600' />
          </div>
        ) : (
          <div className='space-y-6 mt-4'>
            <Field icon={GraduationCap} label='Nama Jurusan'>
              <Input
                className='bg-transparent text-black h-10 text-sm border-gray-300 focus:border-blue-600 focus:ring-blue-600/20'
                value={form.nama}
                onChange={e =>
                  handleChange('nama', e.target.value)
                }
              />
            </Field>

            <Field icon={Tag} label='Alias'>
              <Input
                className='h-10 text-black text-sm bg-transparent border-gray-300 focus:border-blue-600 focus:ring-blue-600/20'
                value={form.alias}
                onChange={e =>
                  handleChange('alias', e.target.value)
                }
              />
            </Field>

            <Field icon={FileText} label='Deskripsi'>
              <Textarea
                className='text-sm min-h-[90px] border-gray-300 focus:border-blue-600 focus:ring-blue-600/20'
                value={form.deskripsi}
                onChange={e =>
                  handleChange('deskripsi', e.target.value)
                }
              />
            </Field>

            <Field icon={Briefcase} label='Prospek Kerja'>
              <Textarea
                className='text-sm min-h-[80px] border-gray-300 focus:border-blue-600 focus:ring-blue-600/20'
                value={form.prospekKerja}
                onChange={e =>
                  handleChange(
                    'prospekKerja',
                    e.target.value,
                  )
                }
              />
            </Field>
          </div>
        )}

        <DialogFooter className='mt-8 gap-3'>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={submitting}
            className='h-10 px-4 rounded-xl bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50'
          >
            <X className='w-4 h-4 mr-2' />
            Batal
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={submitting || !isChanged}
            className='h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
          >
            {submitting ? (
              <Loader2 className='w-4 h-4 animate-spin mr-2' />
            ) : (
              <Save className='w-4 h-4 mr-2' />
            )}
            Simpan Perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
