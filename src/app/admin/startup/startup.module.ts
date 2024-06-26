import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DashboardstartupComponent } from './dashboardstartup/dashboardstartup.component';
import { StartupdetailsComponent } from './startupdetails/startupdetails.component';
import { FounderdetailsComponent } from './founderdetails/founderdetails.component';
import { FundingdetailsComponent } from './fundingdetails/fundingdetails.component';
import { AddfundingdetailsComponent } from './addfundingdetails/addfundingdetails.component';
import { ServiceinfoComponent } from './serviceinfo/serviceinfo.component';
import { ListfounderdetailsComponent } from './listfounderdetails/listfounderdetails.component';
import { EditfounderdetailsComponent } from './editfounderdetails/editfounderdetails.component';
import { DocumentdetailsComponent } from './documentdetails/documentdetails.component';
import { ListmyservicesComponent } from './listmyservices/listmyservices.component';
import { ServiceshowinterestComponent } from './serviceshowinterest/serviceshowinterest.component';
import { AdddocumentComponent } from './adddocument/adddocument.component';


export const routes = [

  { path: '', redirectTo: 'startup', pathMatch: 'full' },

  { path: 'dashboardstartup', component: DashboardstartupComponent, data: { breadcrumb: 'startup dashboard' } },
  { path: 'startupdetails', component: StartupdetailsComponent, data: { breadcrumb: 'startup details' } },
  { path: 'founderdetails', component: FounderdetailsComponent, data: { breadcrumb: 'add founder details' } },
  { path: 'editfounderdetails/:id', component: EditfounderdetailsComponent, data: { breadcrumb: 'edit founder details' } },
  { path: 'listfounderdetails', component: ListfounderdetailsComponent, data: { breadcrumb: 'list of founders' } },
  { path: 'fundingdetails', component: FundingdetailsComponent, data: { breadcrumb: 'list of funding details' } },
  { path: 'documentdetails', component: DocumentdetailsComponent, data: { breadcrumb: 'document details' } },
  { path: 'addfundingdetails', component: AddfundingdetailsComponent, data: { breadcrumb: 'add funding details' } },
  { path: 'serviceinfo/:serviceId/:id', component: ServiceinfoComponent, data: { breadcrumb: 'service details' } },
  { path: 'startupdetails/:id', component: StartupdetailsComponent, data: { breadcrumb: ' Edit startup details' } },
  { path: 'addfundingdetails/:id', component: AddfundingdetailsComponent, data: { breadcrumb: 'Edit funding details' } },
  { path: 'listmyservice', component: ListmyservicesComponent, data: { breadcrumb: 'my service case Management.' } },
  { path: 'serviceshowinterest', component: ServiceshowinterestComponent, data: { breadcrumb: 'service show interest' } },
  { path: 'adddocument', component: AdddocumentComponent, data: { breadcrumb: 'add document' } },
];

@NgModule({
  declarations: [
    DashboardstartupComponent,
    StartupdetailsComponent,
    FounderdetailsComponent,
    FundingdetailsComponent,
    AddfundingdetailsComponent,
    ServiceinfoComponent,
    ListfounderdetailsComponent,
    EditfounderdetailsComponent,
    DocumentdetailsComponent,
    ListmyservicesComponent,
    ServiceshowinterestComponent,
    AdddocumentComponent
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
export class StartupModule { }
