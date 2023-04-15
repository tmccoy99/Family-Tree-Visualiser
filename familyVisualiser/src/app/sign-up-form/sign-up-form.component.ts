import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SuccesfulUserResponse } from '../user-response';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
})
export class SignUpFormComponent {
  signUp = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router) {}

  async onSubmit(email: string, password: string): Promise<void> {
    const response: Response = await fetch('http://localhost:8085/users', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
      const body: SuccesfulUserResponse = await response.json();
      window.localStorage.setItem('userID', body.userID);
      window.localStorage.setItem('token', body.token);
      this.router.navigate(['/home']);
    }
  }
}
