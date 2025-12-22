import { Pipe, PipeTransform } from '@angular/core';
import { SensorValue } from '../models/sensor.model';

@Pipe({
  name: 'sensorValue',
  standalone: true,
})
export class SensorValuePipe implements PipeTransform {
  transform(value: SensorValue): string {
    return `${value.amount} ${value.unit}`;
  }
}
