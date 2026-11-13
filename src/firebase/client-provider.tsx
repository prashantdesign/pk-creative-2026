'use client';

import React, { useState, useEffect, type ReactNode } from 'react';
import PKLoader from '@/components/pk-loader';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

interface FirebaseServices {
    firebaseApp: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [services, setServices] = useState<FirebaseServices | null>(null);

  useEffect(() => {
    // Start Firebase once the browser is idle so it never competes with first paint / hydration.
    const start = () => setServices(initializeFirebase());
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(start, 200);
    return () => clearTimeout(t);
  }, []); // Empty dependency array ensures this runs only once on mount

  // During SSR and the initial client render before useEffect runs, services will be null.
  // We no longer return null here, allowing the SSR HTML to be visible immediately!

  return (
    <FirebaseProvider
      firebaseApp={services?.firebaseApp || null}
      auth={services?.auth || null}
      firestore={services?.firestore || null}
    >
      {children}
    </FirebaseProvider>
  );
}
