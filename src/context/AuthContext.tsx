'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User } from '@/types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data() as User);
          } else {
            const userData: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'User',
              photoURL: firebaseUser.photoURL || '',
              role: firebaseUser.email === 'admin@example.com' ? 'admin' : 'user',
              createdAt: new Date().toISOString(),
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), userData);
            setUser(userData);
          }
        } catch {
          // Firebase not configured - use mock user
          const mockUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Demo User',
            photoURL: firebaseUser.photoURL || '',
            role: firebaseUser.email === 'admin@example.com' ? 'admin' : 'user',
            createdAt: new Date().toISOString(),
          };
          setUser(mockUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
    } catch {
      // Demo mode - simulate login
      if (email === 'user@example.com' || email === 'admin@example.com') {
        const mockUser: User = {
          uid: email === 'admin@example.com' ? 'admin-uid' : 'user-uid',
          email,
          displayName: email === 'admin@example.com' ? 'Admin User' : 'Demo User',
          role: email === 'admin@example.com' ? 'admin' : 'user',
          createdAt: new Date().toISOString(),
        };
        setUser(mockUser);
        toast.success('Welcome back! (Demo Mode)');
        return;
      }
      toast.error('Invalid credentials. Use demo accounts.');
      throw new Error('Login failed');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(firebaseUser, { displayName: name });
      const userData: User = {
        uid: firebaseUser.uid,
        email,
        displayName: name,
        role: 'user',
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      setUser(userData);
      toast.success('Account created successfully!');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      toast.error(message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('Logged out successfully');
    } catch {
      setUser(null);
      toast.success('Logged out successfully');
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Logged in with Google!');
    } catch {
      toast.error('Google login failed. Please use email login.');
      throw new Error('Google login failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
