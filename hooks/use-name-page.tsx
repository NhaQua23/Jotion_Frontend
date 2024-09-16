import { create } from 'zustand'

type NameStore = {
  isOpen: boolean
  workspaceId: number
  onOpen: (workspaceId: number) => void
  onClose: () => void
}

export const SetNamePage = create<NameStore>((set) => ({
  isOpen: false,
  workspaceId: 0,
  onOpen: (workspaceId) => set({ isOpen: true, workspaceId }),
  onClose: () => set({ isOpen: false, workspaceId: 0 })
}));