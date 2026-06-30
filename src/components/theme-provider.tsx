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
  const [theme, setTheme] = useState<Theme>('dark'); // Default to dark
  const firestore = useFirestore();
  
  const siteContentRef = useMemo(() => firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null, [firestore]);
  const { data: siteContent, loading } = useDoc<SiteContent & { theme?: Theme }>(siteContentRef);

  useEffect(() => {
    if (siteContent?.theme) {
      setTheme(siteContent.theme);
    }
  }, [siteContent]);

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
