import type { Card } from './card.model';

export interface DashboardTab {
  id: string;
  title: string;
  cards: Card[];
}

export interface Dashboard {
  id: string;
  title: string;
  icon: string;
  tabs: DashboardTab[];
}

export interface DashboardNav {
  id: string;
  title: string;
  icon: string;
}