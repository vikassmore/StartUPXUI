import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListserviceuserComponent } from './listserviceuser/listserviceuser.component';
import { AddserviceuserComponent } from './addserviceuser/addserviceuser.component';
import { ListprofilemanagementComponent } from './listprofilemanagement/listprofilemanagement.component';
import { listworkflowmanagement } from './listworkflowmanagement/listworkflowmanagement.component';
import { EditserviceuserComponent } from './editserviceuser/editserviceuser.component';
import { DenyserviceuserComponent } from './denyserviceuser/denyserviceuser.component';


export const routes = [
  { path: '', redirectTo: 'serviceuser', pathMatch: 'full' },
  { path: 'addserviceuser', component: AddserviceuserComponent, data: { breadcrumb: 'add service user' } },
  { path: 'listserviceuser', component: ListserviceuserComponent, data: { breadcrumb: 'list service user' } },
  { path: 'editserviceuser', component: EditserviceuserComponent, data: { breadcrumb: 'edit service user' } },
  { path: 'denyserviceuser', component: DenyserviceuserComponent, data: { breadcrumb: 'deny service user' } },
];

@NgModule({
  declarations: [
    ListserviceuserComponent,
    AddserviceuserComponent,
    ListprofilemanagementComponent,
    listworkflowmanagement,
    EditserviceuserComponent,
    DenyserviceuserComponent,

  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ]
})
export class ServiceuserModule { }
