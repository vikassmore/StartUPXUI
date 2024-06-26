import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';

import { Router, ActivatedRoute, Data } from '@angular/router';
import { ServiceProviderUserModel } from './ServiceUser.Model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
@Component({
  selector: 'app-addserviceuser',
  templateUrl: './addserviceuser.component.html',
  styleUrls: ['./addserviceuser.component.css']
})
export class AddserviceuserComponent implements OnInit {
  public form: FormGroup;
  services: any = [];
  buttenDisabled: boolean;
  category: string;
  ServiceCategoryList: any = [];
  FounderType: any = [];
  userId: any;
  private sub: any;
  hide = true;
  hide1 = true;
  uploadForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required]),
    roleId: new FormControl('', [Validators.required]),
    founderTypeId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    isActive: new FormControl(),
    serviceStatus: new FormControl(null)
  });

  isAddMode!: boolean;
  submitted = false;

  constructor(public appService: AppService, private _authService: AuthenticationService, private tokenStorage: TokenStorageService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.GetRole();
    this.GetFounderType();
    this.getAllCategory();

    this.uploadForm = new FormGroup({
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ])),

      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ])),
      emailId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA0-Z9._%+-]+@[a-zA0-Z9.-]+\\.[aA-zZ]{2,4}$"),
        Validators.maxLength(100),
      ])),
      roleId: new FormControl('', Validators.compose([
        Validators.required,

      ])),
      founderTypeId: new FormControl('', Validators.compose([
        Validators.required,

      ])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
        Validators.minLength(6),
        Validators.maxLength(10)
      ])),

      category: new FormControl('', Validators.compose([
        Validators.required,

      ])),
      isActive: new FormControl(),
      serviceStatus: new FormControl(null)

    })

  }
  //Get All Category
  public getAllCategory() {
    this.appService.getAll("api/Category/getAllCategory").subscribe(data => {
      this.ServiceCategoryList = data;
    });
  }
  //Get Role
  public GetRole() {
    this._authService.getRole("api/User/GetAllRole").subscribe((data: any) => {
      this.services = data;
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //get founder type
  public GetFounderType() {
    this._authService.getFounderType("api/FounderType").subscribe((data: any) => {
      this.FounderType = data;
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //validation for the char
  keyPressOnlyChar(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  //validation for the number
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
  //validation for category select
  public onSelectionChange(e) {
    this.category = e.value;
    if (this.category.length != 0) {
      this.buttenDisabled = false;
    } else {
      this.buttenDisabled = true;
    }
  }
  //On Submit
  public onServiceUserSubmit(value: Object): void {
    if (this.uploadForm.valid) {
      this.addserviceUser(value);
    }
  }
  //add service user
  private addserviceUser = (serviceUserFormData) => {
    if (this.userId == null) {
      serviceUserFormData.userId = 0;
      let serviceuserModel: ServiceProviderUserModel = {
        userId: serviceUserFormData.userId,
        firstName: serviceUserFormData.firstName,
        lastName: serviceUserFormData.lastName,
        emailId: serviceUserFormData.emailId,
        roleId: serviceUserFormData.roleId,
        founderTypeId: serviceUserFormData.founderTypeId,
        password: serviceUserFormData.password,
        category: serviceUserFormData.category.toString(),
        isActive: false,
        serviceStatus: null
      }
      this.appService.addUser('api/User/AddserviceProvider', serviceuserModel).subscribe((data: Data) => {
        if (!Number.isNaN(data)) {
          if (data.userId != 0 && data.roleId != 0) {
            this.snackBar.open('Saved successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['/admin/masters/listserviceuser'], { relativeTo: this.route });
          } else {
            this.snackBar.open("User already exists.", '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          }
        } else {
          this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      }, error => {
        this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });
    }
  }
}


