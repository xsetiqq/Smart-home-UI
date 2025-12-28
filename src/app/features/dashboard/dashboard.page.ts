import { Component, inject } from "@angular/core";
import { TabSwitcherComponent } from "../../shared/components/tab-switcher/tab-switcher.component";
import { ActivatedRoute, RouterModule } from "@angular/router";


@Component({
  selector: 'app-dashboard',
  imports: [TabSwitcherComponent, RouterModule],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage {
  public dashboardID: string | null = null;
  private route = inject(ActivatedRoute);
 
  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('dashboardId');
      this.dashboardID = id;
    });
  }
}

