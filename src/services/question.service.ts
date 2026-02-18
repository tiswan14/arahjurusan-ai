import { Dimensi } from '@prisma/client'
import {
  createQuestionSchema,
  updateQuestionSchema,
  type CreateQuestionInput,
  type UpdateQuestionInput,
} from '../schemas/question'
import { questionRepository } from '@/repositories/question.repository'

type FindAllParams = {
  page?: number
  limit?: number
  search?: string
  dimensi?: Dimensi
  aktif?: boolean
  orderBy?: 'createdAt' | 'urutan' | 'text'
  order?: 'asc' | 'desc'
}


export const questionService = {
  async create(payload: CreateQuestionInput) {
    const parsed = createQuestionSchema.safeParse(payload)

    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message)
    }

    const existing =
      await questionRepository.findByUrutan(
        parsed.data.urutan,
      )

    if (existing) {
      throw new Error('Urutan sudah digunakan')
    }

    return questionRepository.create(parsed.data)
  },

  async findAll(params: FindAllParams) {
    const page =
      params.page && params.page > 0
        ? params.page
        : 1

    const limit =
      params.limit &&
        params.limit > 0 &&
        params.limit <= 50
        ? params.limit
        : 10

    const { data, total } =
      await questionRepository.findAll({
        page,
        limit,
        search: params.search,
        dimensi: params.dimensi,
        aktif: params.aktif,
        orderBy: params.orderBy,
        order: params.order,
      })

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  },

  async findById(id: string) {
/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Finds a question by its ID.
   * @param {string} id The ID of the question to find.
   * @returns {Promise<Question>} The found question.
   * @throws {Error} If the question is not found.
   */
/*******  3d6d688c-b0d8-4b78-8949-cd306a2e32ed  *******/    const question =
      await questionRepository.findById(id)

    if (!question) {
      throw new Error('Soal tidak ditemukan')
    }

    return question
  },

  async updateById(
    id: string,
    payload: UpdateQuestionInput,
  ) {
    const parsed =
      updateQuestionSchema.safeParse(payload)

    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message)
    }

    const existing =
      await questionRepository.findById(id)

    if (!existing) {
      throw new Error('Soal tidak ditemukan')
    }

    if (parsed.data.urutan !== undefined) {
      const used =
        await questionRepository.findByUrutan(
          parsed.data.urutan,
        )

      if (used && used.id !== id) {
        throw new Error('Urutan sudah digunakan')
      }
    }

    return questionRepository.updateById(
      id,
      parsed.data,
    )
  },

  async deleteById(id: string) {
    const existing =
      await questionRepository.findById(id)

    if (!existing) {
      throw new Error('Soal tidak ditemukan')
    }

    await questionRepository.deleteById(id)

    return true
  },
}
