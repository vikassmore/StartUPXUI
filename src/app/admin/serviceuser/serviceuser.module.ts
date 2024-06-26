import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardserviceuserComponent } from './dashboardserviceuser/dashboardserviceuser.component';
import { ProfilemanagementComponent } from './profilemanagement/profilemanagement.component';
import { ServiceleadsComponent } from './serviceleads/serviceleads.component';
import { DeclineserviceComponent } from './declineservice/declineservice.component';
import { ListassignmentworkflowComponent } from './listassignmentworkflow/listassignmentworkflow.component';
import { UploadinvoiceComponent } from './uploadinvoice/uploadinvoice.component';
import { AdddocumentComponent } from './adddocument/adddocument.component';
import { CustomerdetailsComponent } from './customerdetails/customerdetails.component';


export const routes = [
  { path: '', redirectTo: 'serviceuser', pathMatch: 'full' },
  { path: 'dashboardserviceuser', component: DashboardserviceuserComponent, data: { breadcrumb: 'service user dashboard' } },
  { path: 'profilemanagement', component: ProfilemanagementComponent, data: { breadcrumb: 'profile management' } },
  { path: 'serviceleads', component: ServiceleadsComponent, data: { breadcrumb: 'service leads' } },
  { path: 'listassignmentworkflow', component: ListassignmentworkflowComponent, data: { breadcrumb: 'assignment work flow list' } },
  { path: 'uploadinvoice', component: UploadinvoiceComponent, data: { breadcrumb: 'upload invoice' } },
  { path: 'customerdetails/:id/:id1', component: CustomerdetailsComponent, data: { breadcrumb: 'customer details' } },
];

@NgModule({
  declarations: [
    DashboardserviceuserComponent,
    ProfilemanagementComponent,
    ServiceleadsComponent,
    DeclineserviceComponent,
    ListassignmentworkflowComponent,
    UploadinvoiceComponent,
    AdddocumentComponent,
    CustomerdetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ServiceuserModule { }
