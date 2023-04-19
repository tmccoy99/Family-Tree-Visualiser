import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { FamilyTreeComponent } from './family-tree/family-tree.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CreateMemberFormComponent } from './create-member-form/create-member-form.component';

@NgModule({
  declarations: [AppComponent, FamilyTreeComponent, UserFormComponent, CreateMemberFormComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
