import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserProfile } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

export const isAuthenticatedGuard: CanActivateFn = () => {
  const auth = inject(AuthService);

  return auth.checkUserAuthentication();
};
