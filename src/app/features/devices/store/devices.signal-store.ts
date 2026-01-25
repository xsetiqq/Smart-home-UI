import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { computed, inject } from '@angular/core'; 
import { DeviceItem } from '../../../shared/models/device.model';
import { SensorItem } from '../../../shared/models/sensor.model';
import { DevicesService } from '../service/devices.service';

export type DeviceEntity = DeviceItem | SensorItem;

interface DevicesStoreState {
  entities: Record<string, DeviceEntity>;
  loading: boolean;
}

export const DevicesSignalStore = signalStore(
  { providedIn: 'root' }, 
  withState<DevicesStoreState>({
    entities: {},
    loading: false,
  }),


  withComputed((store) => ({
  
    allDevices: computed(() => Object.values(store.entities())),
  })),

  withMethods((store, devicesService = inject(DevicesService)) => ({
    loadDevices() {
      patchState(store, { loading: true });

      devicesService.getDevices().subscribe({
        next: (devices) => {
          const entities = devices.reduce<Record<string, DeviceEntity>>((acc, device) => {
            acc[device.id!] = device;
            return acc;
          }, {});

          patchState(store, {
            entities,
            loading: false,
          });
        },
        error: () => {
          patchState(store, { loading: false });
        },
      });
    },

    toggleDeviceState(deviceId: string, newState: boolean) {

      const current = store.entities()[deviceId];
      if (!current || current.type !== 'device') return;
      const prevState = current.state;

      patchState(store, {
        entities: {
          ...store.entities(),
          [deviceId]: { ...current, state: newState },
        },
      });

      devicesService.toggleDevice(deviceId, newState).subscribe({
        error: () => {
          patchState(store, {
            entities: {
              ...store.entities(),
              [deviceId]: { ...current, state: prevState },
            },
          });
        },
      });
    },
  })),
);
