import { z } from 'zod'

export const createJurusanSchema = z.object({
  nama: z
    .string()
    .min(3, 'Nama minimal 3 karakter')
    .max(100)
    .trim(),

  alias: z
    .string()
    .min(2, 'Alias minimal 2 karakter')
    .max(10)
    .trim(),

  deskripsi: z
    .string()
    .min(5, 'Deskripsi terlalu pendek')
    .max(500)
    .trim(),

  prospekKerja: z
    .string()
    .min(5, 'Prospek kerja terlalu pendek')
    .max(300)
    .trim(),
})

export const updateJurusanSchema =
  createJurusanSchema.partial()

export default createJurusanSchema
