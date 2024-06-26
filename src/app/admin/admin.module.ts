import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { MatBadgeModule } from '@angular/material/badge'
const config: InputFileConfig = {
  fileAccept: '*'
};

import { AdminComponent } from './admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { FullScreenComponent } from './components/fullscreen/fullscreen.component'; 
import { MessagesComponent } from './components/messages/messages.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';



export const routes = [ 
  { 
    path: '', 
    component: AdminComponent, children: [
 
      //{ path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }, 
      // { path: '', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), data: { breadcrumb: 'Users' } },
      // { path: 'Incident', loadChildren: () => import('./incident/incident.module').then(m => m.IncidentModule), data: { breadcrumb: 'Incident' } },
      // { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
      // { path: 'sales', loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule) },
      //{ path: '', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), data: { breadcrumb: 'Users' } },
      // { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), data: { breadcrumb: 'Users' } },
      // { path: 'incident', loadChildren: () => import('./incident/incident.module').then(m => m.IncidentModule), data: { breadcrumb: 'Incident' } },
      // { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule), data: { breadcrumb: 'Customers' } },
      // { path: 'coupons', loadChildren: () => import('./coupons/coupons.module').then(m => m.CouponsModule), data: { breadcrumb: 'Coupons' } },
      // { path: 'withdrawal', loadChildren: () => import('./withdrawal/withdrawal.module').then(m => m.WithdrawalModule), data: { breadcrumb: 'Withdrawal' } },
      // { path: 'analytics', loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule), data: { breadcrumb: 'Analytics' } },
      // { path: 'refund', loadChildren: () => import('./refund/refund.module').then(m => m.RefundModule), data: { breadcrumb: 'Refund' } },
      // { path: 'followers', loadChildren: () => import('./followers/followers.module').then(m => m.FollowersModule), data: { breadcrumb: 'Followers' } },
      // { path: 'support', loadChildren: () => import('./support/support.module').then(m => m.SupportModule), data: { breadcrumb: 'Support' } },
      // { path: 'reviews', loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsModule), data: { breadcrumb: 'Reviews' } } ,
      // { path: 'department', loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule), data: { breadcrumb: 'Department' } },
      // { path: 'masters', loadChildren: () => import('./masters/masters.module').then(m => m.MastersModule), data: { breadcrumb: 'Masters' } },
      { path: 'dashboard-menu', loadChildren: () => import('./dashboard-menu/dashboard-menu.module').then(m => m.DashboardMenuModule), data: { breadcrumb: '' } },
      { path: 'masters', loadChildren: () => import('./masters/masters.module').then (m => m.MastersModule), data: { breadcrumb: '' }},
      { path: 'startup', loadChildren: () => import('./startup/startup.module').then (m => m.StartupModule), data: { breadcrumb: 'startup' }},
      { path: 'investor', loadChildren: () => import('./investor/investor.module').then (m => m.InvestorModule), data: { breadcrumb: 'investor' }},
      { path: 'serviceuser', loadChildren: () => import('./serviceuser/serviceuser.module').then (m => m.ServiceuserModule), data: { breadcrumb: 'service user' }},
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then (m => m.ProfileModule), data: { breadcrumb: 'profile' }},
      { path: 'notification', loadChildren: () => import('./notification/notification.module').then (m => m.NotificationModule), data: { breadcrumb: 'Notification' }},
      // { path: 'expense-head', loadChildren: () => import('./expense-head/expense-head.module').then(m => m.ExpenseHeadModule), data: { breadcrumb: 'expense-head' } },
      // { path: 'expenses-list', loadChildren: () => import('./expenses-list/expenses-list.module').then(m => m.ExpensesListModule), data: { breadcrumb: 'expenses-list' } },
      // { path: 'test', loadChildren:()=> import('./dashboard/dashboard.module').then(m=>m.DashboardModule),data:{breadcrumb: 'Test'}},
      // { path: 'hod', loadChildren: () => import('./hod/hod.module').then(m => m.HodModule), data: { breadcrumb: 'HOD' } },
      // { path: 'paytomember', loadChildren: () => import('./paytomember/paytomember.module').then(m => m.PaytomemberModule), data: { breadcrumb: 'PayToMember' } },
      // { path: 'cityMaster', loadChildren: () => import('./city-master/city-master.module').then(m => m.CityMasterModule), data: { breadcrumb: 'cityMaster' } }, 
      // { path: 'StateMaster', loadChildren: () => import('./StateMaster/state-master.module').then(m => m.StateMasterModule), data: { breadcrumb: 'StateMaster' } },  
      // { path: 'graphs', loadChildren: () => import('./graphs/graphs.module').then(m => m.GraphsModule), data: { breadcrumb: 'Graphs' } },  
    
    
     
    ]
  } 
];

@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    UserMenuComponent,
    FullScreenComponent,
    MessagesComponent,
    BreadcrumbComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    InputFileModule.forRoot(config),
    MatBadgeModule,
  ]
})
export class AdminModule { }
