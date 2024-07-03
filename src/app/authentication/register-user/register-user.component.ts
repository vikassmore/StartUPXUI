import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserForRegistration } from 'src/app/interfaces/user/UserForRegistration.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private _authService: AuthenticationService, public snackBar: MatSnackBar, public router: Router,) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      userpassword: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      mobileNo: new FormControl(''),
      roleId: new FormControl(''),
     // departmentId:new FormControl('')
    });
  }

  public validateControl = (controlName: string) => {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName)
  }

  public registerUser = (registerFormValue) => {
    const formValues = { ...registerFormValue };

    const user: UserForRegistration = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      emailId: formValues.emailId,
      userPassword: formValues.userPassword,
      //address: formValues.address,
      mobileNo: formValues.mobileNo,
      roleId: formValues.roleId,
     // departmentId:formValues.departmentId,
    };

    this._authService.registerUser("api/User", user)
      .subscribe(_ => {
      
        console.log("Successful registration");
      },
        error => {
        
          console.log(error.error.errors);
        })
  }
}