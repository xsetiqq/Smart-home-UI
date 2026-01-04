/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dashboard, DashboardNav } from '../../../models/dashboard.model';
import { TabSwitcherService } from '../../tab-switcher/services/tab-switcher.service';


@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private http = inject(HttpClient);

  private readonly url = '/dashboards';

  private readonly _dashboardsNavArray = signal<DashboardNav[] | null>(null);
  readonly dashboardsNavArray = this._dashboardsNavArray.asReadonly();

  loadDashboardsNavArray(): void {
    this.http.get<DashboardNav[]>(this.url).subscribe({
      next: (data) => {
        this._dashboardsNavArray.set(data);
      },
      error: (err) => console.error('Failed to load dashboard', err),
    });
  }

  getDashboardNavArray() {
    return this.dashboardsNavArray() ?? [];
  }
}
