import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  signInWithCustomToken,
  signOut,
  User,
} from 'firebase/auth';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { environment } from 'src/environment';

const AUTH_TOKEN_KEY = 'firebaseCustomToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private app: FirebaseApp | null = null;
  private auth: Auth | null = null;
  private initPromise: Promise<void> | null = null;

  async initialize(): Promise<void> {
    if (this.initPromise) return this.initPromise;
    this.initPromise = (async () => {
      const customToken = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!customToken) return;

      try {
        this.app = initializeApp(environment.firebase);
        this.auth = getAuth(this.app);
        await signInWithCustomToken(this.auth, customToken);
      } catch (err) {
        console.error('Auth init failed:', err);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem('userId');
      }
    })();
    return this.initPromise;
  }

  async setCustomToken(customToken: string, userId: string): Promise<void> {
    localStorage.setItem(AUTH_TOKEN_KEY, customToken);
    localStorage.setItem('userId', userId);
    this.initPromise = null;
    try {
      if (!this.app) {
        this.app = initializeApp(environment.firebase);
        this.auth = getAuth(this.app);
      }
      await signInWithCustomToken(this.auth!, customToken);
    } catch (err) {
      console.error('Auth sign-in failed:', err);
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem('userId');
      throw err;
    }
  }

  clearAuth(): void {
    if (this.auth) {
      signOut(this.auth);
    }
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem('userId');
  }

  async getIdToken(): Promise<string | null> {
    await this.initialize();
    const user = this.auth?.currentUser;
    if (!user) return null;
    try {
      return await user.getIdToken();
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  }
}
