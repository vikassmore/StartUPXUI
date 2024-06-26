import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddfaqComponent } from './addfaq/addfaq.component';
import { EditfaqComponent } from './editfaq/editfaq.component';
import { ListfaqComponent } from './listfaq/listfaq.component';

export const routes = [
  { path: '', redirectTo: 'faq', pathMatch: 'full' },
  { path: 'addfaq', component: AddfaqComponent, data: { breadcrumb: 'add faq' } },
  { path: 'listfaq', component: ListfaqComponent, data: { breadcrumb: 'list faq' } },
  { path: 'editfaq:id', component: EditfaqComponent, data: { breadcrumb: 'edit faq' } },
];

@NgModule({
  declarations: [
    AddfaqComponent,
    EditfaqComponent,
    ListfaqComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class FaqModule { }
