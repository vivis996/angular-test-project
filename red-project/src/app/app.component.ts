import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion: string = 'pet';

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // onSubmit(form: NgForm): void {
  //   console.log(form);
  // }

  onSubmit(): void {
    console.log(this.signupForm);
  }
}
