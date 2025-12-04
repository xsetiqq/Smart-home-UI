import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from "./shared/ui/sidebar/sidebar.component";


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    SidebarComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  opened: boolean = true;
}
