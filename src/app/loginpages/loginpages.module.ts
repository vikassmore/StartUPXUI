import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { InputFileModule } from 'ngx-input-file';

import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterComponent } from './register/register.component';
import { OtpverifyComponent } from './otpverify/otpverify.component';
import { TwostepverificationComponent } from './twostepverification/twostepverification.component';
import { PrimaryinvestmentdetailsComponent } from './primaryinvestmentdetails/primaryinvestmentdetails.component';
import { UserActivationComponent } from './user-activation/user-activation.component';

export const routes = [
  { path: '', redirectTo: 'loginpage', pathMatch: 'full' },
  { path: 'loginpage', component: LoginUserComponent, data: { breadcrumb: 'loginpage' } },
  { path: 'forgetpassword', component: ForgetpasswordComponent, data: { breadcrumb: 'forgetpassword' } },
  //{ path: 'resetpassword/:userId', component: ResetpasswordComponent, data: { breadcrumb: 'resetpassword' } }
  { path: 'resetpassword/:userId', component: ResetpasswordComponent },
  { path: 'otpverify/:email', component: OtpverifyComponent },
  { path: 'register', component: RegisterComponent, data: { breadcrumb: 'register' } },
  { path: 'twostepverification/:email', component: TwostepverificationComponent, data: { breadcrumb: 'twostepverify' } },
  { path: 'primaryinvestmentdetails/:userId', component: PrimaryinvestmentdetailsComponent, data: { breadcrumb: 'primaryinvestmentdetails' } },
  { path: 'useractivate', component: UserActivationComponent, data: { breadcrumb: 'user-activation' } },
];


@NgModule({
  declarations: [
    LoginUserComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    LoginUserComponent,
    RegisterComponent,
    OtpverifyComponent,
    TwostepverificationComponent,
    PrimaryinvestmentdetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
    SwiperModule,
    InputFileModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class LoginpagesModule { }
