import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UserForAuthenticationDto } from 'src/app/interfaces/user/UserForAuthenticationDto.model';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { AppService, Data } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserForgotpassword } from 'src/app/interfaces/user/UserForgotpassword.model';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  loginForm: FormGroup;
  showError = false;
  email: any;
  constructor(private _authService: AuthenticationService, public formBuilder: FormBuilder, public _router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
    },);
  }

  // ForgotUser
  public forgotUser(loginFormValue): void {
    if (this.loginForm.valid) {
      this.email = this.loginForm.value.email;
      //this._authService.forgotUser(`api/User/ForgotPasswordLink?email=${loginFormValue.email}`,{}).subscribe(data => {
      //this._authService.forgotUser(`api/User/ForgotPasswordLink?email=${loginFormValue.email}`,{}).subscribe((response: any) => {
      this._authService.forgotUser(`api/User/ForgotPasswordOTP?email=${loginFormValue.email}`, {}).subscribe((response: any) => {
      },);
      this.snackBar.open(' We have sent OTP on your email, Please check', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this._router.navigate(['/otpverify/', this.email]);
    }
  }

}
