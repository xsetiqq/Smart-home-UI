import { Component, computed, inject } from '@angular/core';
import { RouterModule } from "@angular/router";
import { LoadingComponent } from "./shared/components/loading/loading.component";
import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  imports: [RouterModule, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  public isLoading = computed(() => this.authService.loading());
  private readonly authService = inject(AuthService);
}
