import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode: boolean = true;

  constructor(private authService: AuthService)
  {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {

    }
    else {
      this.authService.signup(email, password)
      .subscribe(response => {
        console.log(response);
      },
      error => {
        console.error(error);
      });
    }

    form.reset();
  }
}