import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, take } from 'rxjs/operators';

export const isAuthenticatedGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return toObservable(auth.isAuthenticated).pipe(
    take(1),
    map((isAuth) => (isAuth ? true : router.parseUrl('/login')))
  );
};
