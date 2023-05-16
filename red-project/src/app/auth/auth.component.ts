import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

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
    this.isLoading = true;
    this.error = null;
    if (this.isLoginMode) {
      this.isLoading = false;
    }
    else {
      this.authService.signup(email, password)
      .subscribe(response => {
        console.log(response);
        this.isLoading = false;
      },
      error => {
        this.error = 'An error ocurred!';
        this.isLoading = false;
      });
    }

    form.reset();
  }
}