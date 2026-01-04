import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const isAuthenticatedGuard: CanActivateFn = () => {
  const auth = inject(AuthService);

  return auth.checkUserAuthentication();
};
