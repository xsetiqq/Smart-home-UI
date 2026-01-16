import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DashboardSignalStore } from '../../../features/dashboard/store/dashboard.signal-store';
import { AddCardDialogComponent } from '../add-card-dialog/add-card-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
/* eslint-disable @typescript-eslint/member-ordering */
@Component({
  selector: 'app-add-card-btn',
  imports: [MatButtonModule],
  templateUrl: './add-card-btn.component.html',
  styleUrl: './add-card-btn.component.scss',
})
export class AddCardBtnComponent {
  private readonly dashboardStore = inject(DashboardSignalStore);
  public dialog = inject(MatDialog);
  readonly isEditMode = this.dashboardStore.isEditMode;
  readonly tabId = signal<string | null>(null);
  private readonly route = inject(ActivatedRoute);

  openDialog() {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      data: { tabId: this.tabId() },
      width: '100%',
      maxWidth: '900px',
      panelClass: 'transparent-dialog-container',
    });

    dialogRef.afterClosed().subscribe((layout) => {

      const currentTabId = this.tabId();

      if (layout && currentTabId) {
    
        this.dashboardStore.addCard(currentTabId, layout);
      }
    });
  }
  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.tabId.set(params.get('tabId'));
    });
  }
}
