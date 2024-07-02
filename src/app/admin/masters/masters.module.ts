import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddfundingComponent } from './funding/addfunding/addfunding.component';
import { ListfundingComponent } from './funding/listfunding/listfunding.component';
import { EditfundingComponent } from './funding/editfunding/editfunding.component';

import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { ListcategoryComponent } from './category/listcategory/listcategory.component';
import { EditcategoryComponent } from './category/editcategory/editcategory.component';

import { AddsectorComponent } from './sector/addsector/addsector.component';
import { ListsectorComponent } from './sector/listsector/listsector.component';
import { EditsectorComponent } from './sector/editsector/editsector.component';

import { AddfaqComponent } from './faq/addfaq/addfaq.component';
import { ListfaqComponent } from './faq/listfaq/listfaq.component';
import { EditfaqComponent } from './faq/editfaq/editfaq.component';

import { ListinvestorComponent } from './listinvestor/listinvestor.component';
import { ListstartupComponent } from './liststartup/liststartup.component';

import { AddpolicyComponent } from './policy/addpolicy/addpolicy.component';
import { ListpolicyComponent } from './policy/listpolicy/listpolicy.component';
import { EditpolicyComponent } from './policy/editpolicy/editpolicy.component';

import { ViewstartupComponent } from './viewstartup/viewstartup.component';
import { ViewinvestorComponent } from './viewinvestor/viewinvestor.component';
import { NotapproveComponent } from './notapprove/notapprove.component';
import { Notapprove1Component } from './notapprove1/notapprove1.component';
import { GaugingdemandComponent } from './gaugingdemand/gaugingdemand.component';

import { InvestmentopportunityComponent } from './investmentopportunity/investmentopportunity.component';
import { ListraisefundingComponent } from './listraisefunding/listraisefunding.component';

import { AddaccreditedinvestorComponent } from './accreditedinvestor/Addaccreditedinvestor/addaccreditedinvestor.component';
import { ListaccreditedinvestorComponent } from './accreditedinvestor/Listaccreditedinvestor/listaccreditedinvestor.component';
import { ListrequestofferingComponent } from './listrequestoffering/listrequestoffering.component';
import { ListnotableinvestorComponent } from './notableinvestor/listnotableinvestor/listnotableinvestor.component';
import { AddeditnotableinvestorComponent } from './notableinvestor/addeditnotableinvestor/addeditnotableinvestor.component';
import { ListserviceuserComponent } from './serviceuser/listserviceuser/listserviceuser.component';
import { AddserviceuserComponent } from './serviceuser/addserviceuser/addserviceuser.component';
import { EditserviceuserComponent } from './serviceuser/editserviceuser/editserviceuser.component';
import { ListprofilemanagementComponent } from './serviceuser/listprofilemanagement/listprofilemanagement.component';
import { listworkflowmanagement } from './serviceuser/listworkflowmanagement/listworkflowmanagement.component';
import { DenyserviceuserComponent } from './serviceuser/denyserviceuser/denyserviceuser.component';
import { ListindicateinterestComponent } from './listindicateinterest/listindicateinterest.component';
import { ListinvestedComponent } from './listinvested/listinvested.component';



export const routes = [

  { path: '', redirectTo: 'masters', pathMatch: 'full' },

  { path: 'addfunding', component: AddfundingComponent, data: { breadcrumb: 'masters / funding / add funding' } },
  { path: 'listfunding', component: ListfundingComponent, data: { breadcrumb: 'masters / funding / list of funding' } },
  { path: 'editfunding/:id', component: EditfundingComponent, data: { breadcrumb: 'masters / funding / edit funding' } },

  { path: 'addcategory', component: AddcategoryComponent, data: { breadcrumb: 'masters / category / add category' } },
  { path: 'listcategory', component: ListcategoryComponent, data: { breadcrumb: 'masters / category / list of category' } },
  { path: 'editcategory/:id', component: EditcategoryComponent, data: { breadcrumb: 'masters / category / edit category' } },

  { path: 'addsector', component: AddsectorComponent, data: { breadcrumb: 'masters / sector / add sector' } },
  { path: 'listsector', component: ListsectorComponent, data: { breadcrumb: 'masters / sector / list of sector' } },
  { path: 'editsector/:id', component: EditsectorComponent, data: { breadcrumb: 'masters / sector / edit sector' } },

  { path: 'addfaq', component: AddfaqComponent, data: { breadcrumb: 'masters / faq / add faq' } },
  { path: 'listfaq', component: ListfaqComponent, data: { breadcrumb: 'masters / faq / list of faqs' } },
  { path: 'editfaq/:id', component: EditfaqComponent, data: { breadcrumb: 'masters / faq / edit faq' } },

  { path: 'liststartup/:id', component: ListstartupComponent, data: { breadcrumb: 'dashboard / Startups' } },
  { path: 'listinvestor/:id', component: ListinvestorComponent, data: { breadcrumb: 'dashboard / Investors' } },

  { path: 'addpolicy', component: AddpolicyComponent, data: { breadcrumb: 'masters / policy / add policy' } },
  { path: 'listpolicy', component: ListpolicyComponent, data: { breadcrumb: 'masters / policy / list of policies' } },
  { path: 'editpolicy/:id', component: EditpolicyComponent, data: { breadcrumb: 'masters / policy / edit policy' } },

  { path: 'viewstartup/:id/:id2/:id3', component: ViewstartupComponent, data: { breadcrumb: 'dashboard / startup details' } },
  { path: 'viewinvestor/:id/:id2/:id3', component: ViewinvestorComponent, data: { breadcrumb: 'dashboard / investor details' } },

  { path: 'notapprove', component: NotapproveComponent, data: { breadcrumb: 'dashboard / Give Reason' } },
  { path: 'notapprove1', component: Notapprove1Component, data: { breadcrumb: 'dashboard / Give Reason' } },
  { path: 'gaugingdemand', component: GaugingdemandComponent, data: { breadcrumb: 'dashboard / Gauging Demand' } },

  { path: 'listraisefunding/:id', component: ListraisefundingComponent, data: { breadcrumb: 'dashboard / raise funding' } },

  { path: 'addaccreditedinvestor', component: AddaccreditedinvestorComponent, data: { breadcrumb: 'masters / Accredited Investor / Add Accredited Investor ' } },
  { path: 'listaccreditedinvestor', component: ListaccreditedinvestorComponent, data: { breadcrumb: 'masters / Accredited Investor  / List of Accredited Investor' } },

  { path: 'listrequestoffering/:id', component: ListrequestofferingComponent, data: { breadcrumb: 'dashboard / request offering' } },
  { path: 'listinvested/:id', component: ListinvestedComponent, data: { breadcrumb: 'dashboard / invested' } },
  { path: 'listindicateinterest/:id', component: ListindicateinterestComponent, data: { breadcrumb: 'dashboard / indicate interest' } },

  { path: 'listnotableinvestor', component: ListnotableinvestorComponent, data: { breadcrumb: 'dashboard / notable investor' } },
  { path: 'addeditnotableinvestor', component: AddeditnotableinvestorComponent, data: { breadcrumb: 'dashboard / add notable investor' } },
  { path: 'addeditnotableinvestor/:id', component: AddeditnotableinvestorComponent, data: { breadcrumb: 'dashboard / edit notable investor' } },

  { path: 'listserviceuser', component: ListserviceuserComponent, data: { breadcrumb: 'dashboard / service users' } },
  { path: 'addserviceuser', component: AddserviceuserComponent, data: { breadcrumb: 'dashboard / add service user' } },
  { path: 'editserviceuser/:userId', component: EditserviceuserComponent, data: { breadcrumb: 'dashboard / edit service user' } },
  { path: 'listprofilemanagement', component: ListprofilemanagementComponent, data: { breadcrumb: 'dashboard / service profile management' } },
  { path: 'listworkflowmanagement', component: listworkflowmanagement, data: { breadcrumb: 'dashboard / service workflow management' } },
  { path: 'denyserviceuser', component: DenyserviceuserComponent, data: { breadcrumb: 'dashboard / Give Reason' } },

];

@NgModule({
  declarations: [
    AddfundingComponent,
    ListfundingComponent,
    EditfundingComponent,

    AddsectorComponent,
    ListsectorComponent,
    EditsectorComponent,

    AddcategoryComponent,
    ListcategoryComponent,
    EditcategoryComponent,

    AddfaqComponent,
    ListfaqComponent,
    EditfaqComponent,

    ListinvestorComponent,
    ListstartupComponent,

    AddpolicyComponent,
    ListpolicyComponent,
    EditpolicyComponent,
    ViewstartupComponent,
    ViewinvestorComponent,
    NotapproveComponent,
    Notapprove1Component,
    GaugingdemandComponent,
    InvestmentopportunityComponent,
    ListraisefundingComponent,
    AddaccreditedinvestorComponent,
    ListaccreditedinvestorComponent,
    ListrequestofferingComponent,
    ListnotableinvestorComponent,
    AddeditnotableinvestorComponent,
    ListserviceuserComponent,
    AddserviceuserComponent,
    EditserviceuserComponent,
    ListprofilemanagementComponent,
    listworkflowmanagement,
    DenyserviceuserComponent,
    ListindicateinterestComponent,
    ListinvestedComponent

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
export class MastersModule { }
