import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

interface LoginResponse {
  token: string;
}

export interface UserProfile {
  fullName: string;
  initials: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly isAuthenticated = signal<boolean>(false);
  readonly userProfile = signal<UserProfile | null>(null);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);
  
  completeLogin(token: string): void {
    this.tokenService.setToken(token);
    this.initAuth();
  }

  initAuth(): void {
    const token = this.tokenService.getToken();

    if (!token) {
      this.isAuthenticated.set(false);
      return;
    }

    this.http.get<UserProfile>('/api/user/profile').subscribe({
      next: (profile) => {
        this.userProfile.set(profile);
        this.isAuthenticated.set(true);
      },
      error: () => {
        this.logout();
      },
    });
  }

  login(userName: string, password: string) {
    return this.http.post<LoginResponse>('/api/user/login', { userName, password });
  }

  logout(): void {
    this.tokenService.clearToken();
    this.userProfile.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
