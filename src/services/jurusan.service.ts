import createJurusanSchema, {
  updateJurusanSchema,
} from '@/schemas/jurusan'
import { jurusanRepository } from '@/repositories/jurusan.repository'

const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export const jurusanService = {
  async create(payload: unknown) {
    const parsed = createJurusanSchema.safeParse(payload)

    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message)
    }

    const { nama, alias, deskripsi, prospekKerja } =
      parsed.data

    const slug = generateSlug(nama)
    const normalizedAlias = alias.toUpperCase()

    const existingSlug =
      await jurusanRepository.findBySlug(slug)

    if (existingSlug) {
      throw new Error('Slug sudah digunakan')
    }

    const existingAlias =
      await jurusanRepository.findByAlias(
        normalizedAlias,
      )

    if (existingAlias) {
      throw new Error('Alias sudah digunakan')
    }

    return jurusanRepository.create({
      nama,
      slug,
      alias: normalizedAlias,
      deskripsi,
      prospekKerja,
    })
  },

  async findAll(params: {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    order?: string
  }) {
    const safePage =
      params.page && params.page > 0 ? params.page : 1

    const safeLimit =
      params.limit &&
        params.limit > 0 &&
        params.limit <= 50
        ? params.limit
        : 10

    type SortField = 'nama' | 'createdAt'

    const allowedSort: SortField[] = [
      'nama',
      'createdAt',
    ]

    const sortBy: SortField =
      allowedSort.includes(
        params.sortBy as SortField,
      )
        ? (params.sortBy as SortField)
        : 'nama'

    const order =
      params.order === 'desc' ? 'desc' : 'asc'

    const { data, total } =
      await jurusanRepository.findAll({
        page: safePage,
        limit: safeLimit,
        search: params.search ?? '',
        sortBy,
        order,
      })

    return {
      data,
      meta: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages: Math.ceil(
          total / safeLimit,
        ),
      },
    }
  },

  async findById(id: string) {
    const jurusan =
      await jurusanRepository.findById(id)

    if (!jurusan) {
      throw new Error('Jurusan tidak ditemukan')
    }

    return jurusan
  },

  async deleteById(id: string) {
    const existing =
      await jurusanRepository.findById(id)

    if (!existing) {
      throw new Error('Jurusan tidak ditemukan')
    }

    await jurusanRepository.delete(id)

    return true
  },

  async updateById(
    id: string,
    payload: unknown,
  ) {
    const parsed =
      updateJurusanSchema.safeParse(payload)

    if (!parsed.success) {
      throw new Error(
        parsed.error.issues[0].message,
      )
    }

    const existing =
      await jurusanRepository.findById(id)

    if (!existing) {
      throw new Error('Jurusan tidak ditemukan')
    }

    const data = parsed.data

    return jurusanRepository.update(id, {
      ...(data.nama !== undefined && {
        nama: data.nama,
      }),
      ...(data.alias !== undefined && {
        alias: data.alias.toUpperCase(),
      }),
      ...(data.deskripsi !== undefined && {
        deskripsi: data.deskripsi,
      }),
      ...(data.prospekKerja !== undefined && {
        prospekKerja: data.prospekKerja,
      }),
    })
  },
}
