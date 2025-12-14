import { Component } from '@angular/core';
import { HomePage } from "./features/home/home.page";


@Component({
  selector: 'app-root',
  imports: [
    HomePage
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
}
