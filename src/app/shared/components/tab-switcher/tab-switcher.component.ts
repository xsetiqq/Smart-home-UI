import { Component, computed, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../features/dashboard/services/dashboard.service';
import { CardListComponent } from "../card-list/card-list.component";

@Component({
  selector: 'app-tab-switcher',
  imports: [MatTabsModule, CommonModule, CardListComponent],
  templateUrl: './tab-switcher.component.html',
  styleUrl: './tab-switcher.component.scss',
})
/* eslint-disable @typescript-eslint/member-ordering */
export class TabSwitcherComponent {
  private readonly dashboardService = inject(DashboardService);
  readonly tabs = computed(() => this.dashboardService.getTabs());

  ngOnInit(): void {
    this.dashboardService.loadDashboard();
  }
}
