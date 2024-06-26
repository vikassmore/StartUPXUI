import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ListnotificationComponent } from './listnotification/listnotification.component';

export const routes = [ 
  { path: '', redirectTo: 'notification', pathMatch: 'full'},
  { path: 'listnotification', component: ListnotificationComponent, data: { breadcrumb: 'list notification' } },
];

@NgModule({
  declarations: [
    ListnotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class NotificationModule { }
