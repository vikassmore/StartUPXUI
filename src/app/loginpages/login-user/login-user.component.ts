import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { UserForAuthenticationDto } from 'src/app/interfaces/user/UserForAuthenticationDto.model';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Enum } from '../register/Enum';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { response } from 'express';
import { SocialMediaModel } from './SocialMedia.Model';

declare var google: any;
@Component({
  selector: 'app-login-user,autofocus',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  public loginForm: FormGroup;
  public phoneLoginFrom: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;
  // public IsShow:boolean;
  private _returnUrl: string;
  hide = true;
  labelName: string;
  isLoggedIn = false;
  role: string | any;
  userId: string | any;
  founderName: string | any;
  toggle: boolean = true;
  public mobileNumber: string;
  user: any;
  public email: string | any;
  public roleId: number;


  constructor(private _authService: AuthenticationService, private authService: SocialAuthService, public appService: AppService, private _router: Router,
    private _route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private tokenStorage: TokenStorageService) { }



  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.pattern("^[a-zA0-Z9._%+-]+@[a-zA0-Z9.-]+\\.[aA-zZ]{2,4}$")),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })

    this.phoneLoginFrom = new FormGroup({
      otp: new FormControl("", [Validators.minLength(6)]),
      mobileNumber: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
    })

    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  toggleView(change: MatButtonToggleChange) {
    this.toggle = change.value;
  }

  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }

  //Social media login by email
  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      //client_id: "97678496984-n144so83mt5uogjrnanejtmnu3bu6b4h.apps.googleusercontent.com",
      client_id: "928489314516-13gvpt8uu1016jv52qra06i9ah33lsuq.apps.googleusercontent.com",
      callback: (response: any) => this.handleGoogleSignIn(response)
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { size: "large", type: "icon", shape: "pill" }
    );
  }
  //Google account signin
  handleGoogleSignIn(response: any) {
    console.log("credential:", response.credential);
    // This next is for decoding the idToken to an object if you want to see the details.
    let base64Url = response.credential.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    var payload = JSON.parse(jsonPayload);
    this.email = payload.email;
    this._authService.loginUserbyemail("api/Login/AuthenticateByEmail/" + this.email, {}).subscribe((data: any) => {
      this.roleId = data.roleId;
      window.sessionStorage.setItem("role", data.roleId);
      var user = sessionStorage.setItem("userID", this.user);
      sessionStorage.setItem("roleId", this.role);
      this.user = data.userId;
      window.sessionStorage.setItem("auth-token", data.token);
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
      this.userId = this.tokenStorage.getUser().userId;
      if (this.roleId > 0 || this.roleId != undefined) {
        if (data.roleName == Enum.RoleName.Satrtup) {
          this._router.navigate(['/admin/startup/dashboardstartup']);
        }
        if (data.roleName == Enum.RoleName.Investor) {
          this._router.navigate(['/admin/investor/dashboardinvestor']);
        }
      }
      else {
        this._router.navigate(['/register']);
      }
    },
      error => {
        this._router.navigate(['/register']);
        this.snackBar.open('User is not registred , Please register here', '×', { panelClass: 'error', verticalPosition: 'top', duration: 6000 });
      })
  }

  //login user
  public loginUser = (loginFormValue) => {
    this.showError = false;
    const login = { ...loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      email: login.email,
      password: login.password,
    }
    if (this.loginForm.valid) {
      this._authService.loginUser(`api/Login/authenticate`, userForAuth).subscribe((res: Data) => {
        if (res.statusCode == 200) {
          this.user = res.userId;
          this.role = res.roleId;
          sessionStorage.setItem("role", res.roleId);
          window.sessionStorage.setItem("role", res.roleId);
          var user = sessionStorage.setItem("userID", this.user);
          var founderName = sessionStorage.setItem("founderName", res.founderName);
          window.sessionStorage.setItem("auth-token", res.token);
          this.tokenStorage.saveToken(res.token);
          this.tokenStorage.saveUser(res);
          this.isLoggedIn = true;
          this.role = this.tokenStorage.getUser().role;
          this.userId = this.tokenStorage.getUser().userId;
          //this._router.navigate(['/twostepverification/',this.loginForm.value.email]);
          if (res.roleName == Enum.RoleName.Admin) {

            this._router.navigate(['/admin/dashboard-menu/dash-board']);

          }
          if (res.roleName == Enum.RoleName.Satrtup) {

            this._router.navigate(['/admin/startup/dashboardstartup']);

          }
          if (res.roleName == Enum.RoleName.Investor) {

            this._router.navigate(['/admin/investor/dashboardinvestor']);
            //this._router.navigate(['/admin/investor/questionnaire']);
          }
          if (res.roleName == Enum.RoleName.Service) {

            this._router.navigate(['/admin/serviceuser/dashboardserviceuser']);

          }
        }
        else {
          this.snackBar.open('Please enter valid Email / Password.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
        }
      },
        (error) => {
          this.snackBar.open('Please enter valid Email / Password.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
        })
    }
    else {
      this.snackBar.open("Otp verify.", '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }
  //FaceBook signIn
  public signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(socialusers => {
      this.Savesresponse(socialusers);
    });
  }
  //Save FB user details
  public Savesresponse(socialusers) {
    const SocialMediaModel1: SocialMediaModel = {
      Provider: socialusers.Provider,
      ProviderId: socialusers.Provider,
      AccessToken: socialusers.Provider,
      FirstName: socialusers.Provider,
      LastName: socialusers.Provider,
      EmailId: socialusers.Provider,
      FounderTypeId: socialusers.founderTypeId
    }
    this._authService.loginUserbyemail('api/SocialMediaLogin/', SocialMediaModel1).subscribe((res: Data) => {
      if (res.statusCode == 200) {
        this.user = res.userId;
        this.role = res.roleId;
        var user = sessionStorage.setItem("userID", this.user);
        sessionStorage.setItem("roleId", this.role);
        var founderName = sessionStorage.setItem("founderName", res.founderName);
        window.sessionStorage.setItem("auth-token", res.token);
        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveUser(res);
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().role;
        this.userId = this.tokenStorage.getUser().userId;
        if (res.roleName == Enum.RoleName.Satrtup) {

          this._router.navigate(['/admin/startup/dashboardstartup']);

        }
        if (res.roleName == Enum.RoleName.Investor) {

          this._router.navigate(['/admin/investor/dashboardinvestor']);
        }
      }
      else {
        this.snackBar.open(res.message, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, (error) => {
      this.snackBar.open('Please enter valid Email / Password.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    })
  }
}

