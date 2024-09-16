import { create } from 'zustand'

type UpdateStore = {
  isOpen: boolean
  id: number
  onOpen: (id: number) => void
  onClose: () => void
}

export const UseUpdateWorkspace = create<UpdateStore>((set) => ({
  isOpen: false,
  id: 0,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: 0 })
}));