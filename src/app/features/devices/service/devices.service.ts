import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceItem } from '../../../shared/models/device.model';
import { SensorItem } from '../../../shared/models/sensor.model';

@Injectable({ providedIn: 'root' })
export class DevicesService {
  private readonly http = inject(HttpClient);
  private readonly url = '/devices';

  getDevices() {
    return this.http.get<(DeviceItem | SensorItem)[]>(this.url);
  }

  toggleDevice(deviceId: string, state: boolean) {
    return this.http.patch<DeviceItem>(`${this.url}/${deviceId}`, { state });
  }
}
