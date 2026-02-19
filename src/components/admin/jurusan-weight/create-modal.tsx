'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Check, ChevronsUpDown, FileSearch, GraduationCap, Loader2, Save, Search, Sliders, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  open: boolean
  onOpenChange: (value: boolean) => void
  dimensi: string[]
  existingJurusanIds: string[]
  onSuccess: () => void
}

type Jurusan = {
  id: string
  nama: string
}

export const CreateWeightModal = ({
  open,
  onOpenChange,
  dimensi,
  existingJurusanIds,
  onSuccess,
}: Props) => {
  const [jurusanId, setJurusanId] =
    useState<string>('')

  const [jurusanList, setJurusanList] =
    useState<Jurusan[]>([])

  const [weights, setWeights] =
    useState<Record<string, number>>({})

  const [loading, setLoading] =
    useState(false)

  const availableJurusan = useMemo(() => {
    return jurusanList.filter(
      j => !existingJurusanIds.includes(j.id),
    )
  }, [jurusanList, existingJurusanIds])


  // reset weights saat modal dibuka
  useEffect(() => {
    if (!open) return

    const initial: Record<string, number> = {}
    dimensi.forEach(d => {
      initial[d] = 0
    })

    setWeights(initial)
  }, [open, dimensi])

  // fetch jurusan
  useEffect(() => {
    if (!open) return

    const fetchJurusan = async () => {
      try {
        const res = await fetch('/api/jurusan')
        const json = await res.json()

        if (res.ok) {
          setJurusanList(json.data ?? [])
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchJurusan()
  }, [open])

  const total = useMemo(() => {
    return Object.values(weights)
      .reduce((acc, val) => acc + val, 0)
  }, [weights])

  const isValid =
    jurusanId !== '' &&
    Number(total.toFixed(5)) === 1

  const handleChange = (
    key: string,
    value: number,
  ) => {
    setWeights(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!isValid || loading) return

    try {
      setLoading(true)

      const res = await fetch(
        '/api/jurusan-weights',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            jurusanId,
            weights: Object.entries(
              weights,
            ).map(([dimensi, bobot]) => ({
              dimensi,
              bobot,
            })),
          }),
        },
      )

      const json = await res.json()

      if (!res.ok) {
        throw new Error(
          json.message ||
          'Gagal menyimpan bobot',
        )
      }

      toast.success(
        'Bobot berhasil disimpan',
      )

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
      <DialogContent className='sm:max-w-lg bg-white border border-gray-100 shadow-xl'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-gray-800'>
            Tambah Bobot Jurusan
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4 mt-4'>

          {/* Jurusan Dropdown */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Jurusan
            </label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  className='w-full justify-between bg-gradient-to-r from-white to-gray-50/50 text-gray-700 border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200 shadow-sm hover:shadow group'
                >
                  <span className='flex items-center gap-2 truncate'>
                    <GraduationCap className='h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors' />
                    <span>
                      {jurusanId
                        ? availableJurusan.find(j => j.id === jurusanId)?.nama
                        : 'Pilih jurusan'}
                    </span>
                  </span>
                  <ChevronsUpDown className='ml-2 h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors' />
                </Button>
              </PopoverTrigger>

              <PopoverContent className='w-full p-0 bg-white/95 backdrop-blur-sm border-2 border-gray-200 shadow-xl rounded-xl overflow-hidden'>
                <Command className='bg-transparent'>
                  <div className='flex items-center border-b border-gray-100 px-3'>
                    <Search className='h-4 w-4 text-gray-400' />
                    <CommandInput
                      placeholder='Cari jurusan...'
                      className='bg-transparent text-gray-700 focus:ring-0 focus:outline-none border-0 placeholder:text-gray-400'
                    />
                  </div>

                  <CommandEmpty className='py-6 text-center text-gray-500'>
                    <FileSearch className='h-8 w-8 mx-auto mb-2 text-gray-300' />
                    Jurusan tidak ditemukan
                  </CommandEmpty>

                  <CommandGroup className='max-h-64 overflow-auto p-1'>
                    {availableJurusan.map(j => (
                      <CommandItem
                        key={j.id}
                        value={j.nama}
                        onSelect={() => setJurusanId(j.id)}
                        className={cn(
                          'flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150',
                          'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50/50',
                          jurusanId === j.id && 'bg-gradient-to-r from-blue-50 to-indigo-50/50 border-l-4 border-blue-500'
                        )}
                      >
                        <div className={cn(
                          'w-5 h-5 rounded-full border flex items-center justify-center transition-all',
                          jurusanId === j.id
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : 'border-gray-300 text-transparent hover:border-blue-400'
                        )}>
                          <Check className={cn(
                            'h-3.5 w-3.5',
                            jurusanId === j.id ? 'opacity-100' : 'opacity-0'
                          )} />
                        </div>
                        <span className='flex-1'>{j.nama}</span>
                        {jurusanId === j.id && (
                          <span className='text-xs text-blue-600 font-medium'>Dipilih</span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>


          </div>

          {/* Dimensi Inputs */}
          <div className='space-y-3 bg-white p-3 rounded-lg border border-gray-200'>

            {/* Header */}
            <div className='flex items-center justify-between pb-2 border-b border-gray-100'>
              <div className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                <Sliders className='h-4 w-4 text-blue-600' />
                Bobot Dimensi
              </div>
              <span className='text-xs text-gray-400'>Total harus 1.00</span>
            </div>

            {/* List */}
            <div className='space-y-2'>
              {dimensi.map((d, index) => (
                <div
                  key={d}
                  className='flex items-center justify-between gap-3'
                >
                  <div className='flex items-center gap-2'>
                    <div className='w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-medium'>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className='text-sm text-gray-700 capitalize'>
                      {d}
                    </span>
                  </div>

                  <Input
                    type='number'
                    step='0.01'
                    min={0}
                    max={1}
                    value={weights[d] ?? 0}
                    onChange={e =>
                      handleChange(
                        d,
                        Number(e.target.value)
                      )
                    }
                    className='bg-white text-black w-24 h-8 text-sm border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-200'
                  />
                </div>
              ))}
            </div>

            {/* Total */}
            <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
              <span className='text-sm text-gray-600'>
                Total
              </span>

              <span
                className={cn(
                  'text-sm font-semibold',
                  Number(total.toFixed(5)) === 1
                    ? 'text-blue-600'
                    : 'text-red-600'
                )}
              >
                {total.toFixed(2)}
              </span>
            </div>

            {Number(total.toFixed(5)) !== 1 && (
              <p className='text-xs text-red-500'>
                Total bobot harus 1.00
              </p>
            )}
          </div>

        </div>

        <DialogFooter className='mt-6 gap-2'>
          <Button
            variant='outline'
            className='bg-white'
            onClick={() =>
              onOpenChange(false)
            }
            disabled={loading}
          >
            <X className='w-4 h-4' />
            Batal
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className='min-w-[120px]'
          >
            {loading ? (
              <>
                <Loader2 className='w-4 h-4 animate-spin' />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className='w-4 h-4' />
                Simpan
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
