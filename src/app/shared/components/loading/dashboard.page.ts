import { Component } from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinner],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})

export class LoadingPage {
}

