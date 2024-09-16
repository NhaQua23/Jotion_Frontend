import { create } from 'zustand'

type UserStore = {
  isOpen: boolean
  id: number
  onOpen: () => void
  onClose: () => void
}

export const UseUpdateUser = create<UserStore>((set) => ({
  isOpen: false,
  id: 0,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, id: 0 })
}));