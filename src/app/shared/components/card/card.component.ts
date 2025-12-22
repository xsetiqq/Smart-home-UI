import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, CardItem } from '../../models/card.model';
import { MatIconModule } from '@angular/material/icon';
import { SensorItem } from '../../models/sensor.model';
import { DeviceItem } from '../../models/device.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { HighlightActiveDirective } from "../../directives/highlight-active";
import { SensorValuePipe } from '../../pipes/sensor-value-pipe';
import { CardService } from './services/card.service';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    HighlightActiveDirective,
    SensorValuePipe,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: Card;
  cardService = inject(CardService);
  @Input() tabId!: string;

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

  get groupToggleState(): boolean {
    return this.deviceItems.some((device) => device.state);
  }
  onDeviceToggle(index: number, state: boolean): void {
    this.cardService.toggleDevice(this.tabId, this.card.id, index, state);
  }
  onGroupToggle(state: boolean): void {
    this.cardService.toggleCardDevices(this.tabId, this.card.id, state);
  }
}
