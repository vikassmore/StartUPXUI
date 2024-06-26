import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-otpverify',
  templateUrl: './otpverify.component.html',
  styleUrls: ['./otpverify.component.css']
})
export class OtpverifyComponent implements OnInit {
  display: any;
  loginForm: FormGroup;
  isDisabled: boolean;
  sub: any;
  email: any;
  isAddMode!: boolean;
  userId: any;
  uploadForm = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  });
  constructor(private _authService: AuthenticationService, public formBuilder: FormBuilder, public _router: Router, public snackBar: MatSnackBar, private route: ActivatedRoute) {
    this.timer(1);
    this.loginForm = this.formBuilder.group({
      otp: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.minLength(6),
        // Validators.maxLength(6)
      ])),
    },)
  }
  //OTP timer
  timer(minute) {
    // let minute = 1;
    this.isDisabled = true;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
        this.isDisabled = false;
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      if (params['email']) {
        this.email = params['email'];
      }
    });
    this.email = this.route.snapshot.params['email'];
    this.isAddMode = !this.email;
    this.isDisabled = true;
  }
  //Forgot password
  public forgotUser(loginFormValue): void {
    if (this.loginForm.valid) {
      //this._authService.forgotUser(`api/User/ForgotPasswordLink?email=${loginFormValue.email}`,{}).subscribe(data => {
      //this._authService.forgotUser(`api/User/ForgotPasswordLink?email=${loginFormValue.email}`,{}).subscribe((response: any) => {
      this._authService.forgotUser(`api/Login/VerifyOtp?OTP=${loginFormValue.otp}&email=${this.email}`, {}).subscribe((data: any) => {
        this.userId = data.userId;
        console.log('r', this.userId)
        this.snackBar.open(' OTP Verified', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this._router.navigate(['/resetpassword/', this.userId]);
      },
        error => {
          this.snackBar.open('Please enter valid OTP.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
        });
    }
    else {
      this.snackBar.open("Please enter valid OTP.", '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }
  //Resend otp
  public reSendOtp() {
    this._authService.reSentOtp(`api/Login/ReSentOtp?email=${this.email}`, {}).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.timer(1);
        this.isDisabled = true;
        this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    },
      error => {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
      });
  }

}
