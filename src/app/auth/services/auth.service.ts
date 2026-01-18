import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './local-storage.service';
import { map } from 'rxjs/internal/operators/map';
import { finalize } from 'rxjs/internal/operators/finalize';


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
  readonly loading: WritableSignal<boolean> = signal(false);
  readonly userProfile = signal<UserProfile | null>(null);

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);

  checkUserAuthentication() {
    this.loading.set(true);
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
      finalize(() => {
        this.loading.set(false);
      })
    );
  }

  completeLogin(token: string): void {
    this.tokenService.setToken(token);
    this.checkUserAuthentication().subscribe();
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
