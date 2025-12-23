import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiPrefixInterceptor } from './auth/interceptors/api-prefix.interceptor';
import { authTokenInterceptor } from './auth/interceptors/auth-token.interceptor';
import { authErrorInterceptor } from './auth/interceptors/auth-error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([apiPrefixInterceptor, authTokenInterceptor, authErrorInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
