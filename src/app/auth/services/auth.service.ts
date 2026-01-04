import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { map } from 'rxjs/internal/operators/map';
import { catchError, of, throwError } from 'rxjs';

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
  readonly isAuthenticated = signal(false);

  readonly userProfile = signal<UserProfile | null>(null);
 
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);
  checkUserAuthentication() {
    return this.http.get<UserProfile>('/user/profile').pipe(
      map((data) => {
        if (data) {
          this.isAuthenticated.set(true);
          this.userProfile.set(data);
          return true;
        } else {
          this.logout();  
          return false;
        }
      }),
      

    );
  }
  completeLogin(token: string): void {
    this.tokenService.setToken(token);
    this.checkUserAuthentication();
  }

  login(userName: string, password: string) {
    return this.http.post<LoginResponse>('/user/login', { userName, password });
  }

  logout(): void {
    this.tokenService.clearToken();
    this.userProfile.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
