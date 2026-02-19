import { jurusanWeightRepository } from '@/repositories/jurusan-weight.repository'
import { z } from 'zod'
import { Dimensi } from '@prisma/client'
import { prisma } from '@/lib/prisma'

const bulkSchema = z.object({
  jurusanId: z.string().cuid(),
  weights: z
    .array(
      z.object({
        dimensi: z.nativeEnum(Dimensi),
        bobot: z
          .coerce
          .number()
          .min(0)
          .max(1),
      }),
    )
    .min(1),
})

export type BulkJurusanWeightInput =
  z.infer<typeof bulkSchema>

export const jurusanWeightService = {
  async setWeights(
    payload: BulkJurusanWeightInput,
  ) {
    const parsed =
      bulkSchema.safeParse(payload)

    if (!parsed.success) {
      throw new Error(
        parsed.error.issues[0].message,
      )
    }

    const { jurusanId, weights } =
      parsed.data

    // ✅ cek jurusan ada
    const jurusan = await prisma.jurusan.findUnique({
      where: { id: jurusanId },
    })

    if (!jurusan) {
      throw new Error('Jurusan tidak ditemukan')
    }

    // ✅ cek duplicate dimensi
    const dimensiSet = new Set(
      weights.map(w => w.dimensi),
    )

    if (dimensiSet.size !== weights.length) {
      throw new Error(
        'Dimensi tidak boleh duplikat',
      )
    }

    // ✅ cek total bobot = 1
    const total = weights.reduce(
      (acc, w) => acc + w.bobot,
      0,
    )

    if (Number(total.toFixed(5)) !== 1) {
      throw new Error(
        'Total bobot harus sama dengan 1',
      )
    }

    return jurusanWeightRepository.bulkUpsert(
      jurusanId,
      weights,
    )
  },


  async getByJurusan(jurusanId: string) {
    if (!jurusanId) {
      throw new Error('Jurusan tidak valid')
    }

    return jurusanWeightRepository.findByJurusan(
      jurusanId,
    )
  },

  async deleteById(id: string) {
    if (!id) {
      throw new Error('ID tidak valid')
    }

    await jurusanWeightRepository.deleteById(
      id,
    )

    return true
  },

  async getAll() {
    return jurusanWeightRepository.findAll()
  },

}
