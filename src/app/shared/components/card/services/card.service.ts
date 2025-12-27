/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, inject } from '@angular/core';
import { TabSwitcherService } from '../../tab-switcher/services/tab-switcher.service';




@Injectable({
  providedIn: 'root',
})
export class CardService {
  private tabSwitcherService = inject(TabSwitcherService);

  toggleDevice(tabId: string, cardId: string, itemIndex: number, state: boolean): void {
    this.tabSwitcherService.updateDashboard((dashboard) => {
      if (!dashboard) return dashboard;

      const copy = structuredClone(dashboard);

      const tab = copy.tabs.find((tab) => tab.id === tabId);
      const card = tab?.cards.find((card) => card.id === cardId);
      const item = card?.items[itemIndex];

      if (item?.type === 'device') {
        item.state = state;
      }

      return copy;
    });
  }
  toggleCardDevices(tabId: string, cardId: string, state: boolean): void {
    this.tabSwitcherService.updateDashboard((dashboard) => {
      if (!dashboard) return dashboard;

      const tab = dashboard.tabs.find((tab) => tab.id === tabId);
      const card = tab?.cards.find((card) => card.id === cardId);

      card?.items.forEach((item) => {
        if (item.type === 'device') {
          item.state = state;
        }
      });

      return dashboard;
    });
  }
}
