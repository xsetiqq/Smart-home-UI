import { Component, computed, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, CardItem } from '../../models/card.model';
import { MatIconModule } from '@angular/material/icon';
import { SensorItem } from '../../models/sensor.model';
import { DeviceItem } from '../../models/device.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { HighlightActiveDirective } from '../../directives/highlight-active';
import { SensorValuePipe } from '../../pipes/sensor-value-pipe';
import { DevicesSignalStore } from '../../../features/devices/store/devices.signal-store';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSlideToggleModule,
    HighlightActiveDirective,
    SensorValuePipe,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: Card;
  readonly deviceStateById = computed(() => {
    const entities = this.devicesStore.entities();

    return (deviceId: string | undefined) => {
      if (!deviceId) return false;
      const entity = entities[deviceId];
      return entity?.type === 'device' ? entity.state : false;
    };
  });
 

  private readonly devicesStore = inject(DevicesSignalStore);
  get groupToggleState(): boolean {
    return this.deviceItems.some((device) => this.deviceStateById()(device.id));
  }

  isDevice(item: CardItem): item is DeviceItem {
    return item.type === 'device';
  }
  isSensor(item: CardItem): item is SensorItem {
    return item.type === 'sensor';
  }
  get deviceItems() {
    return this.card.items.filter((item) => this.isDevice(item));
  }

  get showGroupToggle(): boolean {
    return this.deviceItems.length > 1;
  }

  onDeviceToggle(deviceId: string, state: boolean): void {
    this.devicesStore.toggleDeviceState(deviceId, state);
  }
  onGroupToggle(state: boolean): void {
    for (const device of this.deviceItems) {
      if (!device.id) continue;
      this.devicesStore.toggleDeviceState(device.id, state);
    }
  }
}
