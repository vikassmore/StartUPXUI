import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { emailValidator, matchingPasswords } from 'src/app/theme/utils/app-validators';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Enum } from './Enum';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  hide1 = true;
  userId: string | any;
  password: string;
  confirmPassword: string;
  public loginForm: FormGroup;
  Types = 'option1';
  labelName: string;
  submitted = false;
  uploadForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    //userName: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    Types: new FormControl('', [Validators.required])
  });


  constructor(public appService: AppService,
    public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder) {
    this.uploadForm = this.formBuilder.group({

      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
      ])),
      // userName: new FormControl('', Validators.compose([
      //   Validators.required,
      //   Validators.minLength(5),
      // ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
      ])),
      emailId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA0-Z9._%+-]+@[a-zA0-Z9.-]+\\.[aA-zZ]{2,4}$"),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
        Validators.minLength(6),
        Validators.maxLength(10)
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      Types: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    },
      { validator: matchingPasswords('password', 'confirmPassword') });
  }

  ngOnInit(): void {

  }
  //On Submit
  public onSubmit() {
    this.validatePassword();
    this.submitted = true;
  }
  //Password match
  validatePassword() {
    if (this.password !== this.confirmPassword) {
    }
    else {
      this.registerUser();
    }
  }

  //Validation
  keyPressOnlyChar(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  //select tab
  selectedTabValue(changeEvent: MatTabChangeEvent) {
    this.labelName = changeEvent.tab.textLabel;
  }
  //User Registration 
  private registerUser() {
    var formData = new FormData();
    if (this.labelName == Enum.RoleName.Admin) {
      formData.append('roleId', Enum.RoleId.Admin);
    }
    else if (this.labelName == Enum.RoleName.Satrtup) {
      formData.append('roleId', Enum.RoleId.Satrtup);
    }
    else if (this.labelName == Enum.RoleName.Investor) {
      formData.append('roleId', Enum.RoleId.Investor);
    }
    else {
      formData.append('roleId', Enum.RoleId.Satrtup);
    }
    console.log(this.uploadForm.value.Types);
    if (this.uploadForm.value.Types == Enum.founderTypeName.Individual) {
      formData.append('founderTypeId', Enum.founderTypeId.Individual);
    }
    else {
      formData.append('founderTypeId', Enum.founderTypeId.Organization);
    }
    formData.append('firstName', this.uploadForm.value.firstName);
    formData.append('lastName', this.uploadForm.value.lastName);
    //formData.append('userName', this.uploadForm.value.userName);
    formData.append('emailId', this.uploadForm.value.emailId);
    formData.append('password', this.uploadForm.value.password);
    if (this.uploadForm.valid) {
      this.appService.addUser('api/User', formData).subscribe((data: Data) => {
        if (data.message == "User already exists.") {
          this.snackBar.open(data.message, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
        else {
          if (data.roleId == Enum.RoleId.Investor) {
            this.router.navigate(['/primaryinvestmentdetails', data.userId]);
          } else {
            this.snackBar.open(data.message, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['/']);
          }
        }
      }, error => {
        this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });
    }
    else {
      this.snackBar.open("Please enter valid password.", '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }
}
