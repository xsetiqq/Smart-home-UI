import { Component, effect, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

import { DashboardSignalStore } from '../../../features/dashboard/store/dashboard.signal-store';
import { MatIcon } from "@angular/material/icon";
/* eslint-disable @typescript-eslint/member-ordering */
@Component({
  selector: 'app-tab-switcher',
  imports: [MatTabsModule, CommonModule, RouterModule, MatIcon],
  templateUrl: './tab-switcher.component.html',
  styleUrl: './tab-switcher.component.scss',
})
export class TabSwitcherComponent {
  private readonly dashboardStore = inject(DashboardSignalStore);

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isEditMode = this.dashboardStore.isEditMode;
  readonly tabs = this.dashboardStore.tabs;
  readonly dashboardId = this.dashboardStore.dashboardId;
  public editingTabId: string | null = null;
  onEdit() {
    this.dashboardStore.enterEditMode();
  }

  onSave() {
    this.dashboardStore.saveDashboard();
  }

  onDiscard() {
    this.dashboardStore.discardChanges();
  }

  onDelete() {
    console.log('Надо модалку сделать с подтверждением');
    // this.dashboardStore.deleteCurrentDashboard();
  }
  
  onTabRename(tabId: string, newTitle: string) {
    this.dashboardStore.renameTab(tabId, newTitle);
    this.editingTabId = null;
  }

  onTabEdit(tabId: string) {
    this.editingTabId = tabId;
  }

  moveTabLeft(tabId: string) {
    this.dashboardStore.reorderTab(tabId, 'left');
  }

  moveTabRight(tabId: string) {
    this.dashboardStore.reorderTab(tabId, 'right');
  }
  isFirstTab(tabId: string): boolean {
    return this.tabs()[0]?.id === tabId;
  }

  isLastTab(tabId: string): boolean {
    const tabs = this.tabs();
    return tabs[tabs.length - 1]?.id === tabId;
  }
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

      if (this.editingTabId && this.editingTabId !== tabId) {
        this.editingTabId = null;
      }
    });
  }
}
