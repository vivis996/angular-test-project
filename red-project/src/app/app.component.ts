import { Component, OnInit } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders: string[] = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames: string[] = ['Chris', 'Anna'];
  
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl<string>(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl<string>(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl<string>('male', Validators.required),
      'hobbies': new FormArray<FormControl<string>>([]),
    });
  }
  
  onSubmit(): void {
    console.log(this.signupForm);
  }
  
  get controls(): FormControl<string>[] {
    return (this.signupForm.get('hobbies') as FormArray<FormControl<string>>).controls;
  }

  onAddHobby(): void {
    const control = new FormControl<string>(null, Validators.required);
    (<FormArray<FormControl<string>>>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        }
        resolve(null);
      }, 1500);
    });
    return promise;
  }
}
