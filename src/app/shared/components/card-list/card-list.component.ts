import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { ActivatedRoute } from '@angular/router';
import { DashboardSignalStore } from '../../../features/dashboard/store/dashboard.signal-store';
/* eslint-disable @typescript-eslint/member-ordering */
@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  host: { class: 'card-list' },
})
export class CardListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dashboardStore = inject(DashboardSignalStore);

  readonly tabId = signal<string | null>(null);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.tabId.set(params.get('tabId'));
    });
  }

  readonly activeTab = computed(() => {
    const tabs = this.dashboardStore.tabs();
    const tabId = this.tabId();

    if (!tabId || !tabs.length) return null;

    return tabs.find((t) => t.id === tabId) ?? null;
  });
}
