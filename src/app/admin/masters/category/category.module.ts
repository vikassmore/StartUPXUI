import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { ListcategoryComponent } from './listcategory/listcategory.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';

export const routes = [
  { path: '', redirectTo: 'category', pathMatch: 'full' },
  { path: 'addcategory', component: AddcategoryComponent, data: { breadcrumb: 'add category' } },
  { path: 'listcategory', component: ListcategoryComponent, data: { breadcrumb: 'list category' } },
];

@NgModule({
  declarations: [
    // AddcategoryComponent,
    // ListcategoryComponent,
    // EditcategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class categoryModule { }
