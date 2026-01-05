/* eslint-disable @typescript-eslint/member-ordering */
import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatIcon],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  private readonly sidebarService = inject(SidebarService);
  readonly dashboardsArrays = computed(() => this.sidebarService.getDashboardNavArray());

  ngOnInit(): void {
    this.sidebarService.loadDashboardsNavArray();
  }
}
