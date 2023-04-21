import { Component, Input } from '@angular/core';
import { FamilyMember } from '../family-member-data';

@Component({
  selector: 'app-family-member',
  templateUrl: './family-member.component.html',
  styleUrls: ['./family-member.component.css'],
})
export class FamilyMemberComponent {
  @Input() data!: FamilyMember;
  selected: boolean = false;

  select(): void {
    this.selected = true;
  }
}
