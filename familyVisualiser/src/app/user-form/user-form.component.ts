import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SuccesfulUserResponse } from '../user-response';
import { UserFormState } from '../user-form-state';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  userDetails = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  warning: string = '';
  state: UserFormState = UserFormState.SignUp;

  constructor(private router: Router) {}

  toggleLogIn(): void {
    this.state = UserFormState.Login;
    this.warning = '';
  }

  toggleSignUp(): void {
    this.state = UserFormState.SignUp;
    this.warning = '';
  }

  async onSubmit(email: string, password: string): Promise<void> {
    const endUrl: string = this.state === 'Sign Up' ? 'users' : 'tokens';
    const response: Response = await fetch(`http://localhost:8085/${endUrl}`, {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
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
