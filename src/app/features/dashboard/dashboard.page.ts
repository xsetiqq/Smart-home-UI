import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TabSwitcherComponent } from '../../shared/components/tab-switcher/tab-switcher.component';
import { TabSwitcherService } from '../../shared/components/tab-switcher/services/tab-switcher.service';

@Component({
  selector: 'app-dashboard',
  imports: [TabSwitcherComponent, RouterModule],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage implements OnInit {
  dashboardID = signal<string | null>(null);
  private route = inject(ActivatedRoute);
  private tabSwitcherService = inject(TabSwitcherService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const dashboardId = params.get('dashboardId');
      if (!dashboardId) return;

      if (this.dashboardID() === dashboardId) return;

      this.dashboardID.set(dashboardId);
      this.tabSwitcherService.loadDashboard(dashboardId);
    });
  }
}
