import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

export const routes = [ 
  { path: '', redirectTo: 'profile', pathMatch: 'full'},
  { path: 'editprofile', component: EditprofileComponent, data: { breadcrumb: 'edit profile' } },
  { path: 'changepassword', component: ChangepasswordComponent, data: { breadcrumb: 'change password' } },
];

@NgModule({
  declarations: [
    EditprofileComponent,
    ChangepasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ProfileModule { }
