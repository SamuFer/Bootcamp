import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    // initial state
    isLoggedIn: false,
    // actions
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),
}))