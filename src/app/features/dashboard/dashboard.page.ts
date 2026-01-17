import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TabSwitcherComponent } from '../../shared/components/tab-switcher/tab-switcher.component';
import { DashboardSignalStore } from './store/dashboard.signal-store';
import { DevicesSignalStore } from '../devices/store/devices.signal-store';

@Component({
  selector: 'app-dashboard',
  imports: [TabSwitcherComponent, RouterModule],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
  providers: [DashboardSignalStore, DevicesSignalStore],
})

export class DashboardPage implements OnInit {
  public dashboardID = signal<string | null>(null);
  readonly dashboardStore = inject(DashboardSignalStore);
  readonly devicesStore = inject(DevicesSignalStore);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const dashboardId = params.get('dashboardId');
      if (!dashboardId) return;

      if (this.dashboardID() === dashboardId) return;

      this.dashboardID.set(dashboardId);
      this.devicesStore.loadDevices();
      this.dashboardStore.loadDashboard(dashboardId);       
    });
  }
}
