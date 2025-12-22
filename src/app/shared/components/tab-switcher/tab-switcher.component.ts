import { Component, computed, inject } from '@angular/core';
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
  readonly tabs = computed(() => this.tabSwitcherService.getTabs());

  ngOnInit(): void {
    this.tabSwitcherService.loadDashboard();
  }
}
