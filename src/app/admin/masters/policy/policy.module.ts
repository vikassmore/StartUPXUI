import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddpolicyComponent } from './addpolicy/addpolicy.component';
import { EditpolicyComponent } from './editpolicy/editpolicy.component';
import { ListpolicyComponent } from './listpolicy/listpolicy.component';

export const routes = [
  { path: '', redirectTo: 'policy', pathMatch: 'full' },
  { path: 'addpolicy', component: AddpolicyComponent, data: { breadcrumb: 'add policy' } },
];

@NgModule({
  declarations: [
    AddpolicyComponent,
    EditpolicyComponent,
    ListpolicyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PolicyModule { }
