import { create } from 'zustand'

type ShareStore = {
  isOpen: boolean
  workspaceId: number
  pageId: number
  onOpen: (workspaceId: number, pageId: number) => void
  onClose: () => void
}

export const UseSharePage = create<ShareStore>((set) => ({
  isOpen: false,
  workspaceId: 0,
  pageId: 0,
  onOpen: (workspaceId, pageId) => set({ isOpen: true, workspaceId, pageId }),
  onClose: () => set({ isOpen: false, workspaceId: 0, pageId: 0 })
}));