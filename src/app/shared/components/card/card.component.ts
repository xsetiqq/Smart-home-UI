import { Component, computed, inject, Input, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, CardItem } from '../../models/card.model';
import { MatIconModule } from '@angular/material/icon';
import { SensorItem } from '../../models/sensor.model';
import { DeviceItem } from '../../models/device.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
/* eslint-disable @typescript-eslint/member-ordering */
import { HighlightActiveDirective } from '../../directives/highlight-active';
import { SensorValuePipe } from '../../pipes/sensor-value-pipe';
import { DevicesSignalStore } from '../../../features/devices/store/devices.signal-store';
import { DashboardSignalStore } from '../../../features/dashboard/store/dashboard.signal-store';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditCardDialogComponent } from '../edit-card-dialog/edit-card-dialog.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSlideToggleModule,
    HighlightActiveDirective,
    SensorValuePipe,
    MatButtonModule,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() tabId!: string;
  @Input() card!: Card;
  @Input() index!: number;
  @Input() totalCards!: number;

  readonly dashboardStore = inject(DashboardSignalStore);
  readonly isEditMode = this.dashboardStore.isEditMode;
  private readonly devicesStore = inject(DevicesSignalStore);
  readonly deviceStateById = computed(() => {
    const entities = this.devicesStore.entities();

    return (deviceId: string | undefined) => {
      if (!deviceId) return false;
      const entity = entities[deviceId];
      return entity?.type === 'device' ? entity.state : false;
    };
  });
  private readonly dialog = inject(MatDialog);
  private readonly viewContainerRef = inject(ViewContainerRef);

  onDeleteCard(): void {
    this.dashboardStore.removeCard(this.tabId, this.card.id);
  }

  onMove(offset: number): void {
    const newIndex = this.index + offset;

    if (newIndex >= 0 && newIndex < this.totalCards) {
      this.dashboardStore.reorderCard(this.tabId, this.card.id, newIndex);
    }
  }

  onEdit(): void {
    const dialogRef = this.dialog.open(EditCardDialogComponent, {
      data: { card: this.card },
      viewContainerRef: this.viewContainerRef,
      width: '100%',
      maxWidth: '900px',
      panelClass: 'transparent-dialog-container',

    });

    dialogRef
      .afterClosed()
      .subscribe((result: { title: string; items: CardItem[] } | undefined) => {
        if (result) {
          this.dashboardStore.updateCard(this.tabId, this.card.id, {
            title: result.title,
            items: result.items,
          });
        }
      });
  }

  get groupToggleState(): boolean {
    return this.deviceItems.some((device) => this.deviceStateById()(device.id));
  }
  get deviceItems() {
    return this.card.items.filter((item) => this.isDevice(item));
  }

  isDevice(item: CardItem): item is DeviceItem {
    return item.type === 'device';
  }
  isSensor(item: CardItem): item is SensorItem {
    return item.type === 'sensor';
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
