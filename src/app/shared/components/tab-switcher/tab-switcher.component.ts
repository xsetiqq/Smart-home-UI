import { Component, effect, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

import { DashboardSignalStore } from '../../../features/dashboard/store/dashboard.signal-store';
/* eslint-disable @typescript-eslint/member-ordering */
@Component({
  selector: 'app-tab-switcher',
  imports: [MatTabsModule, CommonModule, RouterModule],
  templateUrl: './tab-switcher.component.html',
  styleUrl: './tab-switcher.component.scss',
})
export class TabSwitcherComponent {
  private readonly dashboardStore = inject(DashboardSignalStore);

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly tabs = this.dashboardStore.tabs;

  constructor() {
    effect(() => {
      const tabs = this.tabs();

      if (!tabs.length) return;

      const tabId = this.route.firstChild?.snapshot.paramMap.get('tabId');

      const firstTab = tabs[0];
      if (!firstTab) return;

      if (!tabId) {
        this.router.navigate([firstTab.id], { relativeTo: this.route });
        return;
      }

      const validTab = tabs.find((t) => t.id === tabId) ?? firstTab;

      if (tabId !== validTab.id) {
        this.router.navigate([validTab.id], { relativeTo: this.route });
        return;
      }

     
    });
  }
}
