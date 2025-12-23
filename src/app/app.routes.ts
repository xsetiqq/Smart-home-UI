import { Route } from '@angular/router';
import { DashboardPage } from './features/dashboard/dashboard.page';
import { AboutPage } from './features/about/about.page';
import { NotFoundPage } from './shared/not-found/not-found.page';
import { isAuthenticatedGuard } from './auth/guards/auth.guard';
import { LoginPage } from './features/login/login.page';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'dashboard',
    component: DashboardPage,
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: 'about',
    component: AboutPage,
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: '404',
    component: NotFoundPage,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
