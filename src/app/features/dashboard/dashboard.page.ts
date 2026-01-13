import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TabSwitcherComponent } from '../../shared/components/tab-switcher/tab-switcher.component';
import { DashboardSignalStore } from './store/dashboard.signal-store';

@Component({
  selector: 'app-dashboard',
  imports: [TabSwitcherComponent, RouterModule],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
  providers: [DashboardSignalStore],
})
export class DashboardPage implements OnInit {
  dashboardID = signal<string | null>(null);
  readonly dashboardStore = inject(DashboardSignalStore);
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      console.log('STORE TABS:', this.dashboardStore.tabs());
      console.log('LOADING:', this.dashboardStore.loading());
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const dashboardId = params.get('dashboardId');
      if (!dashboardId) return;

      if (this.dashboardID() === dashboardId) return;

      this.dashboardID.set(dashboardId);
      this.dashboardStore.loadDashboard(dashboardId);
    });
  }
}
