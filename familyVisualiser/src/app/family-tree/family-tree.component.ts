import { Component, Input } from '@angular/core';
import { FamilyMember, einstein } from '../family-member-data';

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.css'],
})
export class FamilyTreeComponent {
  @Input() root: FamilyMember = einstein;

  constructor() {}
}
