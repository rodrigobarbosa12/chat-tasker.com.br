import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AuthState, ChangeLanguage, DrawerState, User } from "./types";
import { deleteCookie } from "cookies-next";

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => {
        set({ user });
      },
      logout: () => {
        set({
          user: null,
        });
        deleteCookie("token");
        deleteCookie("refreshtoken");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useDrawer = create<DrawerState>((set) => ({
  open: false,
  closeDrawer: () => {
    set({ open: false });
  },
  openDrawer: () => {
    set({ open: true });
  },
}));

export const useChangeLanguage = create<ChangeLanguage>()(
  persist(
    (set) => ({
      language: "pt-BR",
      changeLanguage: (language) => {
        set({ language });
      },
    }),
    {
      name: "change-language",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
