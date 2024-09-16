import { create } from 'zustand'

type DeleteStore = {
  isOpen: boolean
  isWorkspace: boolean
  isPage: boolean
  workspaceId: number
  pageId: number
  onOpenWorkspace: (idWorkspace: number) => void
  onOpenPage: (idWorkspace: number, idPage: number) => void
  onClose: () => void
}

export const UseDelete = create<DeleteStore>((set) => ({
  isOpen: false,
  isWorkspace: false,
  isPage: false,
  workspaceId: 0,
  pageId: 0,
  onOpenWorkspace: (idWorkspace) => set({ isOpen: true, isWorkspace: true, workspaceId: idWorkspace }),
  onOpenPage: (idWorkspace, idPage) => set({ isOpen: true, isPage: true, workspaceId: idWorkspace, pageId: idPage }),
  onClose: () => set({ isOpen: false, workspaceId: 0, pageId: 0, isWorkspace: false, isPage: false })
}));