import { create } from "zustand";

interface Page {
  id: number;
  title: string;
  background: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: number;
  authorId: number;
}

interface PageState {
  title: string;
  setTitle: (newTitle: string) => void;

  background: string;
  setBackground: (newBackground: string) => void;

  pageByWorkspace: { [id: number]: Page } ;
  pagesByWorkspace: { [workspaceId: number]: Page[] };
  setPages: (workspaceId: number, pages: Page[]) => void;
  setPage: (updatedPage: Page) => void;
  addPage: (workspaceId: number, page: Page) => void;
  updatePage: (workspaceId: number, page: Page) => void;
  updatePageById: (pageId: number, updatedPage: Page) => void;
  removePage: (workspaceId: number, pageId: number) => void;
}

export const UsePageStore = create<PageState>((set) => ({
  title: "",
  setTitle: (newTitle: string) => set({ title: newTitle }),

  background: "",
  setBackground: (newBackground: string) => set({ background: newBackground }),

  pageByWorkspace: {},
  pagesByWorkspace: {},

  setPages: (workspaceId, pages) => set((state) => ({ 
    pagesByWorkspace: {
      ...state.pagesByWorkspace,
      [workspaceId]: pages,
    }, 
  })),

  setPage: (updatedPage) => {
    const workspaceId = updatedPage.workspaceId;
    set((state) => ({
      pagesByWorkspace: {
        ...state.pagesByWorkspace,
        [workspaceId]: state.pagesByWorkspace[workspaceId]?.map((page) =>
          page.id === updatedPage.id ? updatedPage : page
        ) || [updatedPage],
      },
      pageByWorkspace: {
        ...state.pageByWorkspace,
        [updatedPage.id]: updatedPage,
      },
      title: updatedPage.title,
    }));
  },

  addPage: (workspaceId, page) => set((state) => ({
    pagesByWorkspace: {
      ...state.pagesByWorkspace,
      [workspaceId]: [...(state.pagesByWorkspace[workspaceId] || []), page],
    }, 
  })),

  updatePage: (workspaceId, updatedPage) => set((state) => ({
    pagesByWorkspace: {
      ...state.pagesByWorkspace,
      [workspaceId]: state.pagesByWorkspace[workspaceId].map(page => 
        page.id === updatedPage.id ? updatedPage : page
      ),
    },
    title: updatedPage.title,
  })),

  updatePageById: (pageId, updatedPage) => {
    const workspaceId = updatedPage.workspaceId; // Xác định workspaceId từ page
    set((state) => ({
      pagesByWorkspace: {
        ...state.pagesByWorkspace,
        [workspaceId]: state.pagesByWorkspace[workspaceId].map((page) =>
          page.id === pageId ? updatedPage : page
        ),
      },
      pageByWorkspace: {
        ...state.pageByWorkspace,
        [pageId]: updatedPage,
      },
      title: updatedPage.title,
    }));
  },

  removePage: (workspaceId, pageId) => set((state) => {
    const updatedPages = state.pagesByWorkspace[workspaceId]?.filter((page) => page.id !== pageId) || [];
    return {
      pagesByWorkspace: {
        ...state.pagesByWorkspace,
        [workspaceId]: updatedPages,
      },
    };
  }),
}));