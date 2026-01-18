import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-delete-dashboard-dialog',
  imports: [MatIcon, MatDialogModule, MatButtonModule],
  templateUrl: './delete-dashboard-dialog.component.html',
  styleUrl: './delete-dashboard-dialog.component.scss',
})
export class DeleteDashboardDialogComponent {
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
}
