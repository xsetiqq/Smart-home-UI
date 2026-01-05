import { Route } from '@angular/router';
import { DashboardPage } from './features/dashboard/dashboard.page';
import { NotFoundPage } from './shared/not-found/not-found.page';
import { isAuthenticatedGuard } from './auth/guards/auth.guard';
import { LoginPage } from './features/login/login.page';
import { HomePage } from './features/home/home.page';
import { CardListComponent } from './shared/components/card-list/card-list.component';




export const routes: Route[] = [
  {
    path: '',
    component: HomePage,
    canActivate: [isAuthenticatedGuard],
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: ':dashboardId',
            component: DashboardPage,
            children: [
              {
                path: ':tabId',
                component: CardListComponent,
              },
            ],
          },
        ],
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
