import {
  CreateJurusanModal,
  DetailJurusanModal,
  EditJurusanModal,
  DeleteJurusanModal,
} from '@/features/jurusan'

type Props = {
  open: boolean
  setOpen: (v: boolean) => void

  detailOpen: boolean
  setDetailOpen: (v: boolean) => void
  detailId: string | null

  editOpen: boolean
  setEditOpen: (v: boolean) => void
  editId: string | null

  deleteOpen: boolean
  setDeleteOpen: (v: boolean) => void
  deleteLoading: boolean
  confirmDelete: () => void
  deleteName: string

  refetch: () => void
}

export const JurusanModals = ({
  open,
  setOpen,
  detailOpen,
  setDetailOpen,
  detailId,
  editOpen,
  setEditOpen,
  editId,
  deleteOpen,
  setDeleteOpen,
  deleteLoading,
  confirmDelete,
  deleteName,
  refetch,
}: Props) => {
  return (
    <>
      <CreateJurusanModal
        open={open}
        onOpenChange={setOpen}
        onSuccess={refetch}
      />

      <DetailJurusanModal
        open={detailOpen}
        onOpenChange={setDetailOpen}
        id={detailId}
      />

      <EditJurusanModal
        open={editOpen}
        onOpenChange={setEditOpen}
        id={editId}
        onSuccess={refetch}
      />

      <DeleteJurusanModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        loading={deleteLoading}
        onConfirm={confirmDelete}
        nama={deleteName}
      />
    </>
  )
}