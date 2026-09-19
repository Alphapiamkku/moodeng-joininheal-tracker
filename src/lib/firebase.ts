import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuration loaded from firebase-applet-config.json
const firebaseConfig = {
  projectId: "moodeng-joininheal-tracker",
  appId: "1:160834223925:web:a99917c1debac63c45567c",
  apiKey: "AIzaSyCtF6BnPSoVHop3Mk6jIjH2wfznGnNYtP4",
  authDomain: "moodeng-joininheal-tracker.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-cdf93928-4a4d-4ee2-b8e1-1a72a993921f",
  storageBucket: "moodeng-joininheal-tracker.firebasestorage.app",
  messagingSenderId: "160834223925",
  oAuthClientId: "160834223925-t8hhsbommr4d7bcpmbj9s09m5jsfhrsu.apps.googleusercontent.com"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Using specific firestoreDatabaseId if configured or default
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export default app;
