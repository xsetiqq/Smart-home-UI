import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule,  } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  public errorMessage: string | null = null;
  public isLoading = false;

  public myForm = new FormGroup({
    username: new FormControl('Warner', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('ea', [Validators.required, Validators.minLength(1)]),
  });
  private authService = inject(AuthService);
  private router = inject(Router);
  public handleSubmit(): void {
    this.isLoading = true;
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.myForm.value;

    this.authService.login(username!, password!).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.authService.completeLogin(res.token);
        this.router.navigate(['/']);
      },

      error: (err) => {
        this.isLoading = false;
        console.error('Login failed', err.error);
        this.errorMessage = err?.error || 'Unknown error occurred. Please try again later.';
      },
    });
  }
}
