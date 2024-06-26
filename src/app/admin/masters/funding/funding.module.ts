import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddfundingComponent } from './addfunding/addfunding.component';
import { ListfundingComponent } from './listfunding/listfunding.component';
import { EditfundingComponent } from './editfunding/editfunding.component';

export const routes = [
  { path: '', redirectTo: 'funding', pathMatch: 'full' },
  { path: 'addfunding', component: AddfundingComponent, data: { breadcrumb: 'add funding' } },
  { path: 'listfunding', component: ListfundingComponent, data: { breadcrumb: 'list funding' } },
  // { path: 'addfunding/:id', component: AddfundingComponent, data: { breadcrumb: 'edit funding' } },
];

@NgModule({
  declarations: [
    AddfundingComponent,
    ListfundingComponent,
    EditfundingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class FundingModule { }
