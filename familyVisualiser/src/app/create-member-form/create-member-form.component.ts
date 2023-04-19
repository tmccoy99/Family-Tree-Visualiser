import { Component, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CreateMemberTypes } from '../create-member-types';

@Component({
  selector: 'app-create-member-form',
  templateUrl: './create-member-form.component.html',
  styleUrls: ['./create-member-form.component.css'],
})
export class CreateMemberFormComponent {
  memberDetails = new FormGroup({
    name: new FormGroup('', Validators.required),
    birthYear: new FormGroup(0, Validators.max(new Date().getFullYear())),
  });

  @Input() createType: CreateMemberTypes = CreateMemberTypes.Root;
}
