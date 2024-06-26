import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';


@Component({
  selector: 'app-twostepverification',
  templateUrl: './twostepverification.component.html',
  styleUrls: ['./twostepverification.component.css']
})
export class TwostepverificationComponent implements OnInit {
  display: any;
  isDisabled: boolean;
  loginForm: FormGroup;
  sub: any; email: any;
  isAddMode!: boolean;
  userId: any;
  uploadForm = new FormGroup({
    otp: new FormControl('', [Validators.required]),
  });
  constructor(private _authService: AuthenticationService, public formBuilder: FormBuilder, public _router: Router, public snackBar: MatSnackBar, private route: ActivatedRoute) {
    this.timer(1);
    this.loginForm = this.formBuilder.group({
      otp: new FormControl('', Validators.compose
        ([Validators.required,
        Validators.minLength(6),])),
    },)
  }

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

  //validation by Number
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  //Two setp OTP verfication
  public twostepverify(loginFormValue): void {
    if (this.loginForm.valid) {
      this._authService.twostepverify(`api/Login/VerifyOtp?OTP=${loginFormValue.otp}&email=${this.email}`, {}).subscribe((data: any) => {
        this.userId = data.userId;
        var user = JSON.parse(sessionStorage.getItem("auth-user"));
        if (user.roleName == "Admin") {
          this.snackBar.open('OTP Verified ', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

          this._router.navigate(['/admin/dashboard-menu/dash-board']);
        }
        if (user.roleName == "Startup") {
          this.snackBar.open('OTP Verified ', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

          this._router.navigate(['/admin/startup/dashboardstartup']);
        }
        if (user.roleName == "Invester") {

          this.snackBar.open('OTP Verified ', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

          this._router.navigate(['/admin/investor/dashboardinvestor']);
          //this._router.navigate(['/admin/investor/questionnaire']);
          this.snackBar.open('LoggedIn successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });


          this._router.navigate(['/admin/investor/dashboardinvestor']);

        }
        this.snackBar.open('OTP Verified and Logged In Successfully', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      },
        error => {
          this.snackBar.open('Please enter valid OTP.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
        });
    }
    else {
      this.snackBar.open("Please enter valid OTP.", '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }
  //Resend OTP
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

