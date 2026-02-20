export type CreateJurusanPayload = {
  nama: string
  alias: string
  deskripsi: string
  prospekKerja: string
}

export const createJurusan = async (
  payload: CreateJurusanPayload,
) => {
  const res = await fetch('/api/jurusan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.message ?? 'Gagal membuat jurusan')
  }

  return json
}