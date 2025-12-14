import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from "../../shared/ui/sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, MatSidenavModule, MatButtonModule, MatIconModule, SidebarComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  opened: boolean = true;
}
