import type { DeviceItem } from './device.model';
import type { SensorItem } from './sensor.model';

export type CardItem = DeviceItem | SensorItem;

export type CardLayout = 'singleDevice' | 'horizontalLayout' | 'verticalLayout';

export interface Card {
  id: string;
  title: string;
  layout: CardLayout;
  items: CardItem[];
}
