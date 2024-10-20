import { create } from 'zustand';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;

  setTheme: (value: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem('theme') as Theme) || 'system',

  setTheme: (theme) => {
    set({ theme });

    localStorage.setItem('theme', theme);
  },
}));
