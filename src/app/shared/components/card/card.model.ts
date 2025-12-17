import { DeviceItem } from "../../../models/device.model";
import { SensorItem } from "../../../models/sensor.model";


export type CardItem = SensorItem | DeviceItem;

export type CardLayout = 'singleDevice' | 'horizontalLayout' | 'verticalLayout';

export interface Card {
  id: string;
  title: string;
  layout: CardLayout;
  items: CardItem[];
}
