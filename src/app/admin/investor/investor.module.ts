import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatBadgeModule } from '@angular/material/badge'
import { DashboardinvestorComponent } from './dashboardinvestor/dashboardinvestor.component';
import { DiscoverlistComponent } from './discoverlist/discoverlist.component';
import { CompanydetailsComponent } from './companydetails/companydetails.component';
import { InvestordetailsComponent } from './investordetails/investordetails.component';
import { BasicdetailsComponent } from './basicdetails/basicdetails.component';
import { InvestmentdetailsComponent } from './investmentdetails/investmentdetails.component';
import { ServiceinfoComponent } from './serviceinfo/serviceinfo.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { BankdetailsComponent } from './bankdetails/bankdetails.component';
import { InvestmentprofileComponent } from './investmentprofile/investmentprofile.component';
import { QuestionnairedetailsComponent } from './questionnairedetails/questionnairedetails.component';
import { TrustedcontactComponent } from './trustedcontact/trustedcontact.component';
import { MyinvestmentComponent } from './myinvestment/myinvestment.component';
import { SubmitinterestComponent } from './submitinterest/submitinterest.component';
import { CompanyinvestComponent } from './companyinvest/companyinvest.component';
import { MywatchlistComponent } from './mywatchlist/mywatchlist.component';
import { MydocumentsComponent } from './mydocuments/mydocuments.component';
import { CompanyinterestComponent } from './companyinterest/companyinterest.component';
import { AdddocumentsComponent } from './adddocuments/adddocuments.component';
import { RequestofferingComponent } from './requestoffering/requestoffering.component';


export const routes = [
  { path: '', redirectTo: 'investor', pathMatch: 'full' },
  { path: 'dashboardinvestor', component: DashboardinvestorComponent, data: { breadcrumb: 'investor dashboard' } },
  { path: 'discoverlist', component: DiscoverlistComponent, data: { breadcrumb: 'discover list' } },
  { path: 'companydetails/:id/:id1/:id2', component: CompanydetailsComponent, data: { breadcrumb: 'company details' } },
  { path: 'investordetails', component: InvestordetailsComponent, data: { breadcrumb: 'investor details' } },
  { path: 'basicdetails', component: BasicdetailsComponent, data: { breadcrumb: 'basic details' } },
  { path: 'investmentdetails', component: InvestmentdetailsComponent, data: { breadcrumb: 'interested sectors & investment details' } },
  { path: 'serviceinfo/:serviceId', component: ServiceinfoComponent, data: { breadcrumb: 'service details' } },
  { path: 'questionnaire', component: QuestionnaireComponent, data: { breadcrumb: 'Suitability Questionnaire' } },
  { path: 'bankdetails', component: BankdetailsComponent, data: { breadcrumb: 'Bank Account Details' } },
  { path: 'trustedcontact', component: TrustedcontactComponent, data: { breadcrumb: 'Trusted Contact Person' } },
  { path: 'investmentprofile', component: InvestmentprofileComponent, data: { breadcrumb: 'Investment Profile' } },
  { path: 'bankdetails', component: BankdetailsComponent, data: { breadcrumb: 'Bank Account Details' } },
  { path: 'questionnairedetails/:id', component: QuestionnairedetailsComponent, data: { breadcrumb: 'Suitability Questionnaire Details' } },
  { path: 'myinvestment', component: MyinvestmentComponent, data: { breadcrumb: 'My Investments' } },
  { path: 'mywatchlist', component: MywatchlistComponent, data: { breadcrumb: 'My Watchlist' } },
  { path: 'mydocuments', component: MydocumentsComponent, data: { breadcrumb: 'My Documents' } },
  { path: 'submitinterest/:id/:id1', component: SubmitinterestComponent, data: { breadcrumb: 'Submit Interest' } },
  { path: 'companyinvest/:id/:id1', component: CompanyinvestComponent, data: { breadcrumb: 'Invest Now' } },
  { path: 'companyinterest/:id/:id1', component: CompanyinterestComponent, data: { breadcrumb: 'Indicate Interest' } },
  { path: 'adddocuments', component: AdddocumentsComponent, data: { breadcrumb: 'Add Document' } },
  { path: 'requestoffering/:id/:id1', component: RequestofferingComponent, data: { breadcrumb: 'Company Details' } },
];

@NgModule({
  declarations: [
    CompanydetailsComponent,
    DashboardinvestorComponent,
    DiscoverlistComponent,
    InvestordetailsComponent,
    BasicdetailsComponent,
    InvestmentdetailsComponent,
    ServiceinfoComponent,
    QuestionnaireComponent,
    BankdetailsComponent,
    InvestmentprofileComponent,
    QuestionnairedetailsComponent,
    TrustedcontactComponent,
    MyinvestmentComponent,
    SubmitinterestComponent,
    CompanyinvestComponent,
    MywatchlistComponent,
    MydocumentsComponent,
    CompanyinterestComponent,
    AdddocumentsComponent,
    RequestofferingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MatBadgeModule,
    NgxPaginationModule
  ]
})
export class InvestorModule { }
