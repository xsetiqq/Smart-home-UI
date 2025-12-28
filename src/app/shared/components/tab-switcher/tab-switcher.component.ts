import { Component, computed, effect, inject, Input, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { CardListComponent } from "../card-list/card-list.component";
import { TabSwitcherService } from './services/tab-switcher.service';


@Component({
  selector: 'app-tab-switcher',
  imports: [MatTabsModule, CommonModule, CardListComponent],
  templateUrl: './tab-switcher.component.html',
  styleUrl: './tab-switcher.component.scss',
})
/* eslint-disable @typescript-eslint/member-ordering */
export class TabSwitcherComponent {
  private readonly tabSwitcherService = inject(TabSwitcherService);

  private dashboardId = signal<string | null>(null);

  readonly tabs = this.tabSwitcherService.dashboard;

  @Input()
  set dashboardID(value: string) {
    this.dashboardId.set(value);
  }

  constructor() {
    effect(() => {
      const id = this.dashboardId();

      if (!id) return;

      this.tabSwitcherService.loadDashboard(id);
    });
  }
}
