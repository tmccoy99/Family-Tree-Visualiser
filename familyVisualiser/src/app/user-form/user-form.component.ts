import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SuccesfulUserResponse } from '../user-response';
import { UserFormState } from '../user-form-state';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  userDetails = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
    ]),
  });

  warning: string = '';
  currentState: UserFormState = UserFormState.Login;
  otherState: UserFormState = UserFormState.SignUp;

  constructor(private router: Router) {}

  toggleState() {
    [this.currentState, this.otherState] = [this.otherState, this.currentState];
    this.warning = '';
  }

  async onSubmit(): Promise<void> {
    const endUrl: string = this.currentState === 'Sign up' ? 'users' : 'tokens';
    const response: Response = await fetch(`http://localhost:8085/${endUrl}`, {
      method: 'POST',
      body: JSON.stringify({
        email: this.userDetails.get('email')?.value,
        password: this.userDetails.get('password')?.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    switch (response.status) {
      case 201: {
        const body: SuccesfulUserResponse = await response.json();
        window.localStorage.setItem('userID', body.userID);
        window.localStorage.setItem('token', body.token);
        this.router.navigate(['/home']);
        break;
      }
      case 401: {
        this.warning = 'Either the email or password you provided is incorrect';
        break;
      }
      case 409: {
        this.warning = 'The provided email is already registered';
        break;
      }
      default: {
        this.warning = 'Unknown error, please try again later if this persists';
      }
    }
  }
}
