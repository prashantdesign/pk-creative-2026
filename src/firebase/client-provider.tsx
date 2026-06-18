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
    // Initialize Firebase on the client side, once per component mount.
    setServices(initializeFirebase());
  }, []); // Empty dependency array ensures this runs only once on mount

  // During SSR and the initial client render before useEffect runs, services will be null.
  // We'll show a loader to prevent rendering children that might depend on Firebase.
  if (!services) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <PKLoader />
        </div>
    );
  }

  return (
    <FirebaseProvider
      firebaseApp={services.firebaseApp}
      auth={services.auth}
      firestore={services.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
