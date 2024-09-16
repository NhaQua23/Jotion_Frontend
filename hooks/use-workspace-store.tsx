import { create } from 'zustand';

interface Workspace {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  editable: boolean;
}

interface WorkspaceState {
  workspaces: Workspace[];
  setWorkspaces: (workspaces: Workspace[]) => void;
  addWorkspace: (workspace: Workspace) => void;
  updateWorkspace: (updatedWorkspace: Workspace) => void;
  removeWorkspace: (workspaceId: number) => void;
}

export const UseWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: [],
  setWorkspaces: (workspaces) => set({ workspaces }),
  addWorkspace: (workspace) => set((state) => ({
    workspaces: [...state.workspaces, workspace]
  })),
  updateWorkspace: (updatedWorkspace) => set((state) => ({
    workspaces: state.workspaces.map(workspace => 
      workspace.id === updatedWorkspace.id ? updatedWorkspace : workspace)
  })),
  removeWorkspace: (workspaceId) => set((state) => ({
    workspaces: state.workspaces.filter(workspace => workspace.id !== workspaceId)
  }))
}));
