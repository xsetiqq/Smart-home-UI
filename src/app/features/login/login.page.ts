import { Component } from '@angular/core';
import { LoginFormComponent } from "../../shared/components/login-form/login-form.component";

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {

}
