import { Component, effect, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { TabSwitcherService } from './services/tab-switcher.service';
/* eslint-disable @typescript-eslint/member-ordering */
@Component({
  selector: 'app-tab-switcher',
  imports: [MatTabsModule, CommonModule, RouterModule],
  templateUrl: './tab-switcher.component.html',
  styleUrl: './tab-switcher.component.scss',
})
export class TabSwitcherComponent {
  private readonly tabSwitcherService = inject(TabSwitcherService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly dashboard = this.tabSwitcherService.dashboard;

  @Input() dashboardID: string | null = null;

  constructor() {
    effect(() => {
      const dashboard = this.dashboard();
      if (!dashboard) return;

      const tabId = this.route.firstChild?.snapshot.paramMap.get('tabId');

      const firstTab = dashboard.tabs[0];
      if (!firstTab) return;

      if (!tabId) {
        this.router.navigate([firstTab.id], { relativeTo: this.route });
        return;
      }

      const validTab = dashboard.tabs.find((t) => t.id === tabId) ?? firstTab;

      if (tabId !== validTab.id) {
        this.router.navigate([validTab.id], { relativeTo: this.route });
        return;
      }

      this.tabSwitcherService.setActiveTab(validTab.id);
    });
  }
}
