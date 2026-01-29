import { signalStore, withMethods, withState } from '@ngrx/signals';
import { DashboardTab } from '../../../shared/models/dashboard.model';
import { DashboardsService } from '../service/dashboards.service';
import { patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { DeviceItem } from '../../../shared/models/device.model';
import { SensorItem } from '../../../shared/models/sensor.model';
import { CardItem } from '../../../shared/models/card.model';

function toKebabCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}
function generateCardId(layout: string) {
  return `${layout}-${crypto.randomUUID()}`;
}

interface DashboardStoreState {
  dashboardId: string | null;
  tabs: DashboardTab[];
  snapshotTabs: DashboardTab[] | null;
  isEditMode: boolean;
  loading: boolean;
}

export const DashboardSignalStore = signalStore(
  withState<DashboardStoreState>({
    dashboardId: null,
    tabs: [],
    snapshotTabs: null,
    isEditMode: false,
    loading: false,
  }),

  withMethods((store, dashboardsService = inject(DashboardsService)) => ({
    loadDashboard(dashboardId: string) {
      patchState(store, { loading: true });

      dashboardsService.getDashboard(dashboardId).subscribe({
        next: (dashboard) => {
          patchState(store, {
            dashboardId,
            tabs: dashboard.tabs,
            loading: false,
          });
        },
        error: () => {
          patchState(store, { loading: false });
        },
      });
    },
    enterEditMode() {
      if (store.isEditMode()) return;

      patchState(store, {
        isEditMode: true,
        snapshotTabs: structuredClone(store.tabs()),
      });
    },
    discardChanges() {
      const snapshot = store.snapshotTabs();
      if (!snapshot) return;

      patchState(store, {
        tabs: structuredClone(snapshot),
        snapshotTabs: null,
        isEditMode: false,
      });
    },
    saveDashboard() {
      const dashboardId = store.dashboardId();
      if (!dashboardId) return;
      patchState(store, { loading: true });
      dashboardsService
        .saveDashboard(dashboardId, {
          tabs: store.tabs(),
        })
        .subscribe({
          next: () => {
            patchState(store, {
              loading: false,
              snapshotTabs: null,
              isEditMode: false,
            });
          },
          error: () => {
            patchState(store, { loading: false });
          },
        });
    },
    createDashboard(dashboardId: string, title: string, icon: string) {
      dashboardsService.createDashboard({ id: dashboardId, title, icon }).subscribe();
    },
    addTab(title: string) {
      if (!store.isEditMode()) return;

      const trimmedTitle = title.trim();
      if (!trimmedTitle) return;

      const id = toKebabCase(trimmedTitle);

      const exists = store
        .tabs()
        .some((tab) => tab.id === id || tab.title.toLowerCase() === trimmedTitle.toLowerCase());

      if (exists) return;

      const newTab = {
        id,
        title: trimmedTitle,
        cards: [],
      };

      patchState(store, {
        tabs: [...store.tabs(), newTab],
      });
    },
    renameTab(tabId: string, newTitle: string) {
      if (!store.isEditMode()) return;

      const title = newTitle.trim();
      if (!title) return;

      const tabs = store.tabs();
      const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
      if (tabIndex === -1) return;

      const newTabId = toKebabCase(title);

      const nextTabs = [...tabs];
      const targetTab = nextTabs[tabIndex];

      nextTabs[tabIndex] = {
        ...targetTab,
        id: newTabId,
        title,
      };

      patchState(store, {
        tabs: nextTabs,
      });
    },
    removeTab(tabId: string) {
      if (!store.isEditMode()) return;

      const nextTabs = store.tabs().filter((tab) => tab.id !== tabId);

      if (nextTabs.length === store.tabs().length) return;

      patchState(store, {
        tabs: nextTabs,
      });
    },
    reorderTab(tabId: string, direction: 'left' | 'right') {
      if (!store.isEditMode()) return;

      const tabs = store.tabs();
      const index = tabs.findIndex((tab) => tab.id === tabId);

      if (index === -1) return;

      const targetIndex = direction === 'left' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= tabs.length) return;

      const nextTabs = [...tabs];
      const [movedTab] = nextTabs.splice(index, 1);
      nextTabs.splice(targetIndex, 0, movedTab);

      patchState(store, {
        tabs: nextTabs,
      });
    },
    addCard(tabId: string, layout: 'singleDevice' | 'horizontalLayout' | 'verticalLayout') {
      if (!store.isEditMode()) return;

      const tabs = store.tabs();
      const tabIndex = tabs.findIndex((tab) => tab.id === tabId);

      if (tabIndex === -1) return;

      const newCard = {
        id: generateCardId(layout),
        title: '',
        layout,
        items: [],
      };

      const nextTabs = [...tabs];
      const targetTab = nextTabs[tabIndex];

      nextTabs[tabIndex] = {
        ...targetTab,
        cards: [...targetTab.cards, newCard],
      };

      patchState(store, {
        tabs: nextTabs,
      });
    },
    removeCard(tabId: string, cardId: string) {
      if (!store.isEditMode()) return;

      const tabs = store.tabs();
      const tabIndex = tabs.findIndex((tab) => tab.id === tabId);

      if (tabIndex === -1) return;

      const tab = tabs[tabIndex];
      const nextCards = tab.cards.filter((card) => card.id !== cardId);

      if (nextCards.length === tab.cards.length) return;

      const nextTabs = [...tabs];
      nextTabs[tabIndex] = {
        ...tab,
        cards: nextCards,
      };

      patchState(store, {
        tabs: nextTabs,
      });
    },
    reorderCard(tabId: string, cardId: string, newIndex: number) {
      if (!store.isEditMode()) return;

      const tabs = store.tabs();
      const tabIndex = tabs.findIndex((tab) => tab.id === tabId);

      if (tabIndex === -1) return;

      const tab = tabs[tabIndex];
      const cards = tab.cards;

      const currentIndex = cards.findIndex((card) => card.id === cardId);
      if (currentIndex === -1) return;

      if (newIndex < 0 || newIndex >= cards.length) return;
      if (newIndex === currentIndex) return;

      const nextCards = [...cards];
      const [movedCard] = nextCards.splice(currentIndex, 1);
      nextCards.splice(newIndex, 0, movedCard);

      const nextTabs = [...tabs];
      nextTabs[tabIndex] = {
        ...tab,
        cards: nextCards,
      };

      patchState(store, {
        tabs: nextTabs,
      });
    },
    updateCard(tabId: string, cardId: string, changes: { title?: string; items?: CardItem[] }) {
      if (!store.isEditMode()) return;

      const tabs = store.tabs();
      const tabIndex = tabs.findIndex((tab) => tab.id === tabId); 
      if (tabIndex === -1) return;

      const tab = tabs[tabIndex];
      const cardIndex = tab.cards.findIndex((card) => card.id === cardId); 
      if (cardIndex === -1) return;

  
      const updatedCard = {
        ...tab.cards[cardIndex],
        ...changes,
      };

      const nextCards = [...tab.cards];
      nextCards[cardIndex] = updatedCard;

      const nextTabs = [...tabs];
      nextTabs[tabIndex] = { ...tab, cards: nextCards };

      patchState(store, { tabs: nextTabs });
    },
    addItemToCard(tabId: string, cardId: string, item: DeviceItem | SensorItem) {
      if (!store.isEditMode()) return;

      const tabs = store.tabs();
      const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
      if (tabIndex === -1) return;

      const tab = tabs[tabIndex];
      const cardIndex = tab.cards.findIndex((card) => card.id === cardId);
      if (cardIndex === -1) return;

      const nextItem = structuredClone(item);

      const nextCards = [...tab.cards];
      nextCards[cardIndex] = {
        ...tab.cards[cardIndex],
        items: [...tab.cards[cardIndex].items, nextItem],
      };

      const nextTabs = [...tabs];
      nextTabs[tabIndex] = {
        ...tab,
        cards: nextCards,
      };

      patchState(store, {
        tabs: nextTabs,
      });
    },
    removeItemFromCard(tabId: string, cardId: string, itemId: string) {
      if (!store.isEditMode()) return;

      const tabs = store.tabs();
      const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
      if (tabIndex === -1) return;

      const tab = tabs[tabIndex];
      const cardIndex = tab.cards.findIndex((card) => card.id === cardId);
      if (cardIndex === -1) return;

      const card = tab.cards[cardIndex];
      const nextItems = card.items.filter((item) => item.id !== itemId);

      if (nextItems.length === card.items.length) return;

      const nextCards = [...tab.cards];
      nextCards[cardIndex] = {
        ...card,
        items: nextItems,
      };

      const nextTabs = [...tabs];
      nextTabs[tabIndex] = {
        ...tab,
        cards: nextCards,
      };

      patchState(store, {
        tabs: nextTabs,
      });
    },
    deleteCurrentDashboard() {
      const dashboardId = store.dashboardId();
      if (!dashboardId) return;

      patchState(store, { loading: true });

      dashboardsService.deleteDashboard(dashboardId).subscribe({
        next: () => {
          patchState(store, {
            dashboardId: null,
            tabs: [],
            snapshotTabs: null,
            isEditMode: false,
            loading: false,
          });
        },
        error: () => {
          patchState(store, { loading: false });
        },
      });
    },
  })),
);
