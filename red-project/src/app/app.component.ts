import { Component, OnInit } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl<string>(null, Validators.required),
        'email': new FormControl<string>(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl<string>('male', Validators.required),
      'hobbies': new FormArray([]),
    });
  }
  
  onSubmit() {
    console.log(this.signupForm);
  }
  
  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  onAddHobby() {
    const control = new FormControl<string>(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
0  }
}
