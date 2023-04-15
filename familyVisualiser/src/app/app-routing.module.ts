import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyTreeComponent } from './family-tree/family-tree.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: UserFormComponent },
  { path: 'home', component: FamilyTreeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
