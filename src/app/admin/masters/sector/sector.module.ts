import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddsectorComponent } from './addsector/addsector.component';
import { ListsectorComponent } from './listsector/listsector.component';
import { EditsectorComponent } from './editsector/editsector.component';

export const routes = [
  { path: '', redirectTo: 'sector', pathMatch: 'full' },
  { path: 'addsector', component: AddsectorComponent, data: { breadcrumb: 'add sector' } },
  { path: 'listsector', component: ListsectorComponent, data: { breadcrumb: 'list sector' } },
];

@NgModule({
  declarations: [
   // AddsectorComponent,
    //ListsectorComponent,
    //EditsectorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class SectorModule { }
