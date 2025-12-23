import { Component, HostListener, inject, computed, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { AuthService } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    SidebarComponent,
    CommonModule,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  readonly isAuthenticated = computed(() => this.authService.isAuthenticated());

  isMobile = false;
  @ViewChild(MatSidenav)
  sidenav?: MatSidenav;
  private readonly authService = inject(AuthService);

  ngOnInit() {
    this.checkScreen();
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
