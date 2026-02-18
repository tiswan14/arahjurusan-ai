import { z } from 'zod'
import { Dimensi } from '@prisma/client'

export const createQuestionSchema = z.object({
  text: z
    .string()
    .min(5, 'Pertanyaan minimal 5 karakter')
    .max(500, 'Pertanyaan terlalu panjang'),

  dimensi: z.nativeEnum(Dimensi),

  urutan: z
    .number()
    .int('Urutan harus bilangan bulat')
    .positive('Urutan harus lebih dari 0'),

  aktif: z.boolean().optional(),
})

export const updateQuestionSchema = z
  .object({
    text: z
      .string()
      .min(5, 'Pertanyaan minimal 5 karakter')
      .max(500, 'Pertanyaan terlalu panjang')
      .optional(),

    dimensi: z.nativeEnum(Dimensi).optional(),

    urutan: z
      .number()
      .int('Urutan harus bilangan bulat')
      .positive('Urutan harus lebih dari 0')
      .optional(),

    aktif: z.boolean().optional(),
  })
  .refine(
    data =>
      data.text !== undefined ||
      data.dimensi !== undefined ||
      data.urutan !== undefined ||
      data.aktif !== undefined,
    {
      message: 'Minimal satu field harus diubah',
    },
  )

export type CreateQuestionInput =
  z.infer<typeof createQuestionSchema>

export type UpdateQuestionInput =
  z.infer<typeof updateQuestionSchema>
