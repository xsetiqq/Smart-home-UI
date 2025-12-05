import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, CardItem } from '../../../models/card.model';
import { DeviceItem } from '../../../models/device.model';
import { SensorItem } from '../../../models/sensor.model';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: Card;
}
