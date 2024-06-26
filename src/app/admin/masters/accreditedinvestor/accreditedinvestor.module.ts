import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaccreditedinvestorComponent } from './listaccreditedinvestor/listaccreditedinvestor.component';
import { AddaccreditedinvestorComponent } from './addaccreditedinvestor/addaccreditedinvestor.component';



@NgModule({
  declarations: [
    ListaccreditedinvestorComponent,
    AddaccreditedinvestorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccreditedinvestorModule { }
