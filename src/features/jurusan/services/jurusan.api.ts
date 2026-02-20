// =====================================================
// ENTITY TYPE
// Representasi data jurusan dari backend (has id)
// =====================================================
export type Jurusan = {
  id: string
  nama: string
  alias: string
  deskripsi: string
  prospekKerja: string
}

// =====================================================
// PAYLOAD TYPE (tanpa id)
// Digunakan untuk create & update
// Best practice: pisahkan entity dan payload
// =====================================================
export type JurusanPayload = Omit<
  Jurusan,
  'id'
>

// =====================================================
// CREATE
// Responsibility:
// - Handle HTTP request
// - Normalisasi error
// - Return pure data (bukan raw response)
// =====================================================
export const createJurusan = async (
  payload: JurusanPayload,
): Promise<Jurusan> => {
  const res = await fetch('/api/jurusan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const json = await res.json()

  // Best practice: selalu cek status HTTP + flag backend
  if (!res.ok || !json.success) {
    throw new Error(
      json?.message ?? 'Gagal membuat jurusan',
    )
  }

  // Best practice: return data saja, bukan seluruh response
  return json.data
}

// =====================================================
// DETAIL
// Responsibility:
// - Fetch single resource
// - Type-safe return
// - Throw error jika gagal
// =====================================================
export const getJurusanDetail = async (
  id: string,
): Promise<Jurusan> => {
  const res = await fetch(`/api/jurusan/${id}`)
  const json = await res.json()

  if (!res.ok || !json.success) {
    throw new Error(
      json?.message ??
      'Gagal mengambil detail jurusan',
    )
  }

  return json.data
}

// =====================================================
// UPDATE
// Responsibility:
// - Update resource by id
// - Payload tidak mengandung id (REST best practice)
// - Tidak perlu return data jika tidak digunakan
// =====================================================
export const updateJurusan = async (
  id: string,
  payload: JurusanPayload,
): Promise<void> => {
  const res = await fetch(`/api/jurusan/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const json = await res.json()

  if (!res.ok || !json.success) {
    throw new Error(
      json?.message ?? 'Gagal update jurusan',
    )
  }
}