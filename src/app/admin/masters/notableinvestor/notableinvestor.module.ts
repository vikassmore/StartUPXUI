import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListnotableinvestorComponent } from './listnotableinvestor/listnotableinvestor.component';
import { AddeditnotableinvestorComponent } from './addeditnotableinvestor/addeditnotableinvestor.component';



@NgModule({
  declarations: [
    ListnotableinvestorComponent,
    AddeditnotableinvestorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NotableinvestorModule { }
