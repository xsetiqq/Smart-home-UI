import { Route } from '@angular/router';
import { DashboardPage } from './features/dashboard/dashboard.page';
import { AboutPage } from './features/about/about.page';
import { NotFoundPage } from './shared/not-found/not-found.page';
import { isAuthenticatedGuard } from './auth/guards/auth.guard';
import { LoginPage } from './features/login/login.page';
import { HomePage } from './features/home/home.page';

export const routes: Route[] = [
  {
    path: '',
    component: HomePage,
    canActivate: [isAuthenticatedGuard],
    children: [
      {
        path: 'dashboard',
        canActivate: [isAuthenticatedGuard],
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full',
          },
          {
            path: ':id',
            component: DashboardPage,
          },
        ],
      },

      {
        path: 'about',
        canActivate: [isAuthenticatedGuard],
        component: AboutPage,
      },
    ],
  },

  {
    path: 'login',
    component: LoginPage,
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
