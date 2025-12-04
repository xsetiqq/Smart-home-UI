import { Component } from "@angular/core";
import { TabSwitcherComponent } from "../../shared/ui/tab-switcher/tab-switcher.component";

@Component({
  selector: 'app-dashboard',
  imports: [TabSwitcherComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})

export class DashboardPage {
}

