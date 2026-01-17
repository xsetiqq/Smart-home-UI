import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
/* eslint-disable @typescript-eslint/member-ordering */
import { Card, CardItem } from '../../models/card.model';
import { DevicesSignalStore } from '../../../features/devices/store/devices.signal-store';

@Component({
  selector: 'app-edit-card-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './edit-card-dialog.component.html',
  styleUrls: ['./edit-card-dialog.component.scss'],
})
export class EditCardDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<EditCardDialogComponent>);
  private readonly data = inject<{ card: Card } | null>(MAT_DIALOG_DATA, { optional: true });
  private readonly initialCard: Card | null = this.data?.card ?? null;
  private readonly devicesStore = inject(DevicesSignalStore);
  public selectedDeviceId = signal<string | null>(null);
  readonly title = signal<string>(this.initialCard?.title ?? '');
  readonly items = signal<CardItem[]>([...(this.initialCard?.items ?? [])]);
  readonly availableDevices = this.devicesStore.allDevices;

  removeItem(indexToRemove: number): void {
    this.items.update((currentItems) => currentItems.filter((_, index) => index !== indexToRemove));
  }

  addItem(deviceId: string): void {
    const foundDevice = this.availableDevices().find((d) => d.id === deviceId);

    if (foundDevice) {
      this.items.update((current) => [...current, foundDevice]);

      setTimeout(() => {
        this.selectedDeviceId.set(null);
      }, 0);
    }
  }

  save(): void {
    this.dialogRef.close({
      title: this.title(),
      items: this.items(),
    });
  }
}
