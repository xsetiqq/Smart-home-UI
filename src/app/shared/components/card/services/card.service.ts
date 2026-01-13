/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, inject } from '@angular/core';
import { DashboardSignalStore } from '../../../../features/dashboard/store/dashboard.signal-store';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  // ЭТО ПОТОМ НАДО БУДЕТ ПОМЕНЯТЬ
 // private readonly dashboardStore = inject(DashboardSignalStore);
  toggleDevice(tabId: string, cardId: string, itemIndex: number, state: boolean): void {
    //console.log(tabId, cardId, itemIndex, state);
    // this.dashboardStore.updateDashboard((dashboard) => {
    //   if (!dashboard) return dashboard;

    //   const copy = structuredClone(dashboard);

    //   const tab = copy.tabs.find((tab) => tab.id === tabId);
    //   const card = tab?.cards.find((card) => card.id === cardId);
    //   const item = card?.items[itemIndex];

    //   if (item?.type === 'device') {
    //     item.state = state;
    //   }

    //   return copy;
    // });
  }
  toggleCardDevices(tabId: string, cardId: string, state: boolean): void {
   // console.log(tabId, cardId, state);
    // this.dashboardStore.updateDashboard((dashboard) => {
    //   if (!dashboard) return dashboard;
    //   const tab = dashboard.tabs.find((tab) => tab.id === tabId);
    //   const card = tab?.cards.find((card) => card.id === cardId);
    //   card?.items.forEach((item) => {
    //     if (item.type === 'device') {
    //       item.state = state;
    //     }
    //   });
    //   return dashboard;
    // });
  }
}
