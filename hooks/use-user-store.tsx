import { create } from 'zustand';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface UserState {
  user: User | null;

  setUsername: (newUsernam: string) => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

export const UseUserStore = create<UserState>((set) => ({
  user: null,

  setUsername: (newUsername: string) => set((state) => ({
    user: state.user ? {...state.user, username: newUsername } : { id: 0, username: newUsername, email: '', password: '' },
  })),
  updateUser: (updatedUser) => set((state) => ({
    user: state.user ? {...state.user, ...updatedUser } : updatedUser as User,
  })),
}));