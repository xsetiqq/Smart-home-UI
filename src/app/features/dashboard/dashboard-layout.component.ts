import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../shared/components/sidebar/services/sidebar.service';


@Component({
  selector: 'app-dashboard-redirect',
  standalone: true,
  template: '',
})
export class DashboardRedirectComponent {
  private router = inject(Router);
  private sidebarService = inject(SidebarService);

  constructor() {
    effect(() => {
      const dashboards = this.sidebarService.dashboardsNavArray();

      if (!dashboards || dashboards.length === 0) return;

      const firstDashboardId = dashboards[0].id;

      this.router.navigate(['/dashboard', firstDashboardId]);
    });
  }
}
