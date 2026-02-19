import { z } from 'zod'
import { Dimensi } from '@prisma/client'

export const createJurusanWeightSchema = z
  .object({
    jurusanId: z
      .string()
      .trim()
      .min(1, 'Jurusan wajib dipilih'),

    dimensi: z
      .nativeEnum(Dimensi)
      .refine(val => !!val, {
        message: 'Dimensi wajib dipilih',
      }),

    bobot: z
      .coerce
      .number()
      .min(0, 'Bobot minimal 0')
      .max(1, 'Bobot maksimal 1'),
  })
  .strict()

export const updateJurusanWeightSchema = z
  .object({
    bobot: z
      .coerce
      .number()
      .min(0, 'Bobot minimal 0')
      .max(1, 'Bobot maksimal 1'),
  })
  .strict()

export type CreateJurusanWeightInput =
  z.infer<typeof createJurusanWeightSchema>

export type UpdateJurusanWeightInput =
  z.infer<typeof updateJurusanWeightSchema>
