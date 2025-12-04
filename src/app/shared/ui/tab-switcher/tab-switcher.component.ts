import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../core/services/dashboard.service';
import { DashboardTab } from '../../../models/dashboard.model';

@Component({
  selector: 'app-tab-switcher',
  imports: [MatTabsModule, CommonModule],
  templateUrl: './tab-switcher.component.html',
  styleUrl: './tab-switcher.component.scss',
})
/* eslint-disable @typescript-eslint/member-ordering */
export class TabSwitcherComponent {
  private readonly dashboardService = inject(DashboardService);
  public readonly tabs$: Observable<DashboardTab[]> = this.dashboardService.getTabs();
}
