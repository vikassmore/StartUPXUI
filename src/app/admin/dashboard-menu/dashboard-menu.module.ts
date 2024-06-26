import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { InputFileModule } from 'ngx-input-file';

import { DashBoardComponent } from './dash-board/dash-board.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

export const routes = [ 
  { path: '', redirectTo: 'dash-board', pathMatch: 'full'},
  { path: 'dash-board', component: DashBoardComponent, data: { breadcrumb: 'Admin / Admin Dashboard' } },
];

@NgModule({
  declarations: [
    DashBoardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
    SwiperModule,
    InputFileModule,
    NgxChartsModule
  ]
})
export class DashboardMenuModule { }
