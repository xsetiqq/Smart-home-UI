/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../../../models/dashboard.model';


@Injectable({
  providedIn: 'root',
})
export class TabSwitcherService {
  private http = inject(HttpClient);
  private readonly url = '/data/mock-data.json';

  private readonly _dashboard = signal<Dashboard | null>(null);
  readonly dashboard = this._dashboard.asReadonly();

  constructor() {
    effect(() => {
      const dashboard = this._dashboard();
      if (!dashboard) return;

      console.log('Dashboard signal updated:', dashboard);
    });
  }

  loadDashboard(): void {
    this.http.get<Dashboard>(this.url).subscribe((data) => {
      this._dashboard.set(data);
    });
  }

  updateDashboard(updater: (dashboard: Dashboard | null) => Dashboard | null): void {
    this._dashboard.update(updater);
  }

  getTabs() {
    return this.dashboard()?.tabs ?? [];
  }

  getTab(tabId: string) {
    return this.getTabs().find((tabs) => tabs.id === tabId);
  }
}
