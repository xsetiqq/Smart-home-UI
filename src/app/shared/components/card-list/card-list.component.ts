import { Component, computed, effect, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Card } from '../../models/card.model';
import { TabSwitcherService } from '../tab-switcher/services/tab-switcher.service';
import { ActivatedRoute } from '@angular/router';
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
  private readonly tabSwitcherService = inject(TabSwitcherService);

  readonly dashboard = this.tabSwitcherService.dashboard;

  readonly tabId = signal<string | null>(null);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.tabId.set(params.get('tabId'));
    });
  }

  readonly activeTab = computed(() => {
    const dashboard = this.dashboard();
    const tabId = this.tabId();

    if (!dashboard || !tabId) return null;

    return dashboard.tabs.find((t) => t.id === tabId) ?? null;
  });
}
