'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// This function is intended for client-side use only.
export function initializeFirebase() {
  if (typeof window === 'undefined') {
    throw new Error("Firebase should only be initialized on the client side.");
  }
  
  if (getApps().length > 0) {
    return getSdks(getApp());
  }

  // Check if the config is valid before initializing
  if (!firebaseConfig.apiKey) {
    throw new Error('Firebase configuration is missing or invalid. Please check your environment variables.');
  }

  const firebaseApp = initializeApp(firebaseConfig);
  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
export * from './errors';
export * from './error-emitter';
export * from './non-blocking-updates';
export * from './non-blocking-login';
