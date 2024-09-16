import { create } from 'zustand'

type NameStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const SetNameWorkspace = create<NameStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))