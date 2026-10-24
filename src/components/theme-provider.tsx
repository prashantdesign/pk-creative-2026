"use client";

import { useState, useEffect, createContext, useContext, ReactNode, useMemo } from 'react';
import { doc } from 'firebase/firestore';
import { useFirestore, useDoc } from '@/firebase';
import type { SiteContent } from '@/types';

import PKLoader from '@/components/pk-loader';

type Theme = 'light' | 'dark';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProviderContext = createContext<{ theme: Theme, setTheme: (theme: Theme) => void } | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return window.document.documentElement.classList.contains('light') ? 'light' : 'dark';
    }
    return 'dark';
  });
  const firestore = useFirestore();
  
  const siteContentRef = useMemo(() => firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null, [firestore]);
  const { data: siteContent, loading } = useDoc<SiteContent & { theme?: Theme }>(siteContentRef);

  // 'system' follows the visitor's OS appearance (and updates live when it changes)
  useEffect(() => {
    const pref = siteContent?.theme;
    if (!pref) return;
    if (pref === 'light' || pref === 'dark') {
      setTheme(pref);
      return;
    }
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => setTheme(mq.matches ? 'dark' : 'light');
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [siteContent?.theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // We no longer block render while loading the theme, to allow instant SSR display.

  return (
      <ThemeProviderContext.Provider value={{ theme, setTheme }}>
          {children}
      </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
