/* eslint-disable @typescript-eslint/member-ordering */
import { Component, HostListener, inject, computed, ViewChild, effect, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { AuthService } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';

import { SidebarService } from '../../shared/components/sidebar/services/sidebar.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    SidebarComponent,
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements OnInit {
  readonly isAuthenticated = computed(() => this.authService.isAuthenticated());
  readonly userProfile = computed(() => this.authService.userProfile());
  isMobile = false;
  @ViewChild(MatSidenav)
  sidenav?: MatSidenav;

  private router = inject(Router);
  private sidebarService = inject(SidebarService);
  private readonly authService = inject(AuthService);


  ngOnInit() {
    this.checkScreen();
  }

  handleLogout(): void {
    this.authService.logout();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreen();
  }

  toggleMenu(): void {
    if (this.isAuthenticated() && this.sidenav) {
      this.sidenav.toggle();
    }
  }

  private checkScreen(): void {
    this.isMobile = window.innerWidth <= 768;
  }
  constructor() {
    this.sidebarService.loadDashboardsNavArray();

    effect(() => {
      const dashboards = this.sidebarService.getDashboardNavArray();

      if (!dashboards.length) return;
      if (this.router.url !== '/') return;

      const firstDashboardId = dashboards[0].id;

      this.router.navigate(['/dashboard', firstDashboardId]);
    });
  }
}
