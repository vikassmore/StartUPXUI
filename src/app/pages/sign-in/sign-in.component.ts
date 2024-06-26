import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  public roleList : any =[];
  public departmentList : any =[];


  constructor(public appService:AppService, private tokenStorage: TokenStorageService, public formBuilder: FormBuilder, 
    public router:Router,private route: ActivatedRoute, public snackBar: MatSnackBar) { }

  ngOnInit() {
// this.getDepartMentList();
// this.getRoleList();

    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])] 
    });

    this.registerForm = this.formBuilder.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'emailId': ['', Validators.compose([Validators.required, emailValidator])],
      'userPassword': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
      'roleId': ['', Validators.required],
      'departmentId': ['', Validators.required],

    },{validator: matchingPasswords('userPassword', 'confirmPassword')});

  }

  // public getRoleList(){  
  //   debugger; 
  //   this.appService.getRoleList('api/User/GetAllRoles').subscribe(data => {
  //     this.roleList = data; 
  //     console.log(this.roleList);
  //   }); 
  // }

  
  // public getDepartMentList(){  
  //   debugger; 
  //   this.appService.getDepartMentList('api/Department').subscribe(data => {
  //     this.departmentList = data; 
  //     console.log(this.departmentList);
  //   }); 
  // }
 
  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid) {
      this.router.navigate(['/']);
    }
  }

  public onRegisterFormSubmit(values:Object):void {
        if (this.registerForm.valid) {
          var formData = new FormData();
          debugger;
          formData.append('firstName', this.registerForm.value.firstName);
          formData.append('lastName', this.registerForm.value.lastName);
          formData.append('emailId', this.registerForm.value.emailId);
          formData.append('userPassword', this.registerForm.value.userPassword);
          formData.append('confirmPassword', this.registerForm.value.confirmPassword);
          formData.append('roleId', this.registerForm.value.roleId);
          formData.append('departmentId', this.registerForm.value.departmentId);

        //  formData.append('roleId', this.registerForm.value.roleId);
          debugger;
          console.log(this.registerForm.value)
          this.appService.adduser('api/User/WebRegister', formData).subscribe(data => {
            this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['/login/loginpage'], { relativeTo: this.route });
    
         }, error => {
           this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
         });
        }
      }
    
}