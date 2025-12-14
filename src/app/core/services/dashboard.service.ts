/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
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

  getTabs() {
    return this.dashboard()?.tabs ?? [];
  }

  getTab(tabId: string) {
    return this.getTabs().find((tabs) => tabs.id === tabId);
  }

  toggleDevice(tabId: string, cardId: string, itemIndex: number, state: boolean): void {
    this._dashboard.update((dashboard) => {
      if (!dashboard) return dashboard;

      const copy = structuredClone(dashboard);

      const tab = copy.tabs.find((tabs) => tabs.id === tabId);
      const card = tab?.cards.find((cards) => cards.id === cardId);
      const item = card?.items[itemIndex];

      if (item?.type === 'device') {
        item.state = state;
      }

      return copy;
    });
  }
  toggleCardDevices(tabId: string, cardId: string, state: boolean): void {
    this._dashboard.update((dashboard) => {
      if (!dashboard) return dashboard;

      const tab = dashboard.tabs.find((tabs) => tabs.id === tabId);
      const card = tab?.cards.find((cards) => cards.id === cardId);

      card?.items.forEach((item) => {
        if (item.type === 'device') {
          item.state = state;
        }
      });

      return dashboard;
    });
  }
}
