'use client'

import { useState } from 'react'

export const useJurusanModals = () => {
  const [createOpen, setCreateOpen] = useState(false)

  const [detailOpen, setDetailOpen] = useState(false)
  const [detailId, setDetailId] = useState<string | null>(null)

  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  return {
    createOpen,
    setCreateOpen,

    detailOpen,
    detailId,
    openDetail: (id: string) => {
      setDetailId(id)
      setDetailOpen(true)
    },
    setDetailOpen,

    editOpen,
    editId,
    openEdit: (id: string) => {
      setEditId(id)
      setEditOpen(true)
    },
    setEditOpen,

    deleteOpen,
    deleteId,
    openDelete: (id: string) => {
      setDeleteId(id)
      setDeleteOpen(true)
    },
    setDeleteOpen,
    setDeleteId,
  }
}
