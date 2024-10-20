import { useEffect } from 'react';
import { useThemeStore } from '@/store/theme/useThemeStore';

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const root = window.document.documentElement;
    
    const onThemeChange = () => {

      root.classList.remove('light', 'dark');

      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';

        root.classList.add(systemTheme);
        return;
      }

      root.classList.add(theme);
    };

    mediaQuery.addEventListener('change', onThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', onThemeChange);
    };
  }, [theme]);

  return <>{children}</>;
};
