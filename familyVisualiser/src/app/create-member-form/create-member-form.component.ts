import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateMemberTypes } from '../create-member-types';

@Component({
  selector: 'app-create-member-form',
  templateUrl: './create-member-form.component.html',
  styleUrls: ['./create-member-form.component.css'],
})
export class CreateMemberFormComponent {
  memberDetails = new FormGroup({
    name: new FormControl('', [Validators.required]),
    birthYear: new FormControl(null, [
      Validators.max(new Date().getFullYear()),
    ]),
  });

  @Input() createType: CreateMemberTypes = CreateMemberTypes.Root;

  async onSubmit(): Promise<void> {
    const response: Response = await fetch('http://localhost:8085/members', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.memberDetails.get('name')?.value,
        birthYear: this.memberDetails.get('birthYear')?.value,
        creationType: this.createType,
      }),
    });
  }
}
