import { Route } from '@angular/router';
import { DashboardPage } from './features/dashboard/dashboard.page';
import { NotFoundPage } from './features/not-found/not-found.page';
import { AboutPage } from './features/about/about.page';


export const routes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPage },
  { path: 'about', component: AboutPage },
  { path: '404', component: NotFoundPage },
  { path: '**', redirectTo: '404' },
];
