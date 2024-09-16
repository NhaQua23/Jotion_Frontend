import { create } from 'zustand'

type ShareStore = {
  isOpen: boolean
  workspaceId: number
  pageId: number
  onOpen: (pageId: number) => void
  onClose: () => void
}

export const UseUnSharePage = create<ShareStore>((set) => ({
  isOpen: false,
  workspaceId: 0,
  pageId: 0,
  onOpen: (pageId) => set({ isOpen: true, pageId }),
  onClose: () => set({ isOpen: false, workspaceId: 0, pageId: 0 })
}));