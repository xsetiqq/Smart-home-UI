/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../../../models/dashboard.model';


@Injectable({
  providedIn: 'root',
})
export class TabSwitcherService {
  private http = inject(HttpClient);
  private readonly url = '/dashboards';

  private readonly _dashboard = signal<Dashboard | null>(null);
  readonly dashboard = this._dashboard.asReadonly();

  loadDashboard(dashboardID: string): void {
    this.http.get<Dashboard>(`${this.url}/${dashboardID}`).subscribe({
      next: (data) => this._dashboard.set(data),
      error: (err) => console.error('Failed to load dashboard', err),
    });
  }

  updateDashboard(updater: (dashboard: Dashboard | null) => Dashboard | null): void {
    this._dashboard.update(updater);
  }

  getTabs() {
    return this.dashboard()?.tabs ?? [];
  }
}
