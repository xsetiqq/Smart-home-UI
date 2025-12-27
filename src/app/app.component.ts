import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  constructor(auth: AuthService) {
    auth.initAuth();
  }
}
