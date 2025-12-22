import { Route } from '@angular/router';
import { DashboardPage } from './features/dashboard/dashboard.page';
import { AboutPage } from './features/about/about.page';
import { NotFoundPage } from './shared/not-found/not-found.page';


export const routes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPage },
  { path: 'about', component: AboutPage },
  { path: '404', component: NotFoundPage },
  { path: '**', redirectTo: '404' },
];
