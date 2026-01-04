import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SidebarService } from '../../shared/components/sidebar/services/sidebar.service';


export const dashboardRedirectGuard: CanActivateFn = () => {
  const sidebarService = inject(SidebarService);
  const router = inject(Router);

  const dashboards = sidebarService.getDashboardNavArray();

  if (!dashboards.length) {
    return true;
  }

  router.navigate(['/dashboard', 'overview']);
  return false;
};
