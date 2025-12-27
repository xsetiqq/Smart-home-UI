/* eslint-disable @typescript-eslint/member-ordering */
import { Component, HostListener, inject, computed, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { AuthService } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { LoadingPage } from '../../shared/components/loading/dashboard.page';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    SidebarComponent,
    CommonModule,
    LoadingPage,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  readonly isAuthenticated = computed(() => this.authService.isAuthenticated());
  readonly userProfile = computed(() => this.authService.userProfile());
  isMobile = false;
  @ViewChild(MatSidenav)
  sidenav?: MatSidenav;
  private readonly authService = inject(AuthService);
  readonly authState = this.authService.isAuthenticated;
  ngOnInit() {
    this.checkScreen();
    this.authService.initAuth();
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
}
