/* eslint-disable @typescript-eslint/member-ordering */
import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { SidebarService } from './services/sidebar.service';
import { DashboardSignalStore } from '../../../features/dashboard/store/dashboard.signal-store';
import { AddDashboardDialogComponent } from '../add-dashboard-dialog/add-dashboard-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatIcon],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  private readonly sidebarService = inject(SidebarService);
  private readonly dialog = inject(MatDialog);
  readonly dashboardsArrays = computed(() => this.sidebarService.getDashboardNavArray());
  private readonly dashboardStore = inject(DashboardSignalStore);
  private readonly router = inject(Router);
  readonly isEditMode = this.dashboardStore.isEditMode;

  openAddDashboardDialog(): void {
    const existingIds = this.dashboardsArrays().map((dashboard) => dashboard.id);

    const dialogRef = this.dialog.open(AddDashboardDialogComponent, {
      data: { existingIds },
      width: '100%',
      maxWidth: '900px',
      panelClass: 'transparent-dialog-container',
    });

    dialogRef.afterClosed().subscribe({
      next: (result: { id: string; title: string; icon: string } | undefined) => {
        if (!result) {
          return;
        }
        this.dashboardStore.createDashboard(result.id, result.title, result.icon);
        this.sidebarService.loadDashboardsNavArray();
        this.router.navigate(['/dashboard', result?.id]);
      },
      error: (error: unknown) => {
        console.error('AddDashboardDialogComponent afterClosed error:', error);
      },
    });
  }

  ngOnInit(): void {
    this.sidebarService.loadDashboardsNavArray();
  }
}
