import { Component, signal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { DashboardService } from './core/services/dashboard.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSlideToggleModule,
    MatSidenavModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  opened: boolean = true;

  constructor(private dashboardService: DashboardService) {
    this.loadData();
  }

  loadData() {
    this.dashboardService.getRaw().subscribe((data) => {
      console.log('RAW DATA:', data);
    });

    this.dashboardService.getTabs().subscribe((tabs) => {
      console.log('TABS:', tabs);
    });

    this.dashboardService.getTab('overview').subscribe((tab) => {
      console.log('SPECIFIC TAB:', tab);
    });
  }
}
