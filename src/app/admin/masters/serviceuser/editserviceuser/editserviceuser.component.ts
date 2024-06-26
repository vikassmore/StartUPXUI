import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ServiceProviderUserModel } from '../addserviceuser/ServiceUser.Model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editserviceuser',
  templateUrl: './editserviceuser.component.html',
  styleUrls: ['./editserviceuser.component.css']
})
export class EditserviceuserComponent implements OnInit {
  ServiceCategoryList: any = [];
  userId: any;
  buttenDisabled: boolean;
  category: string;
  uploadForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required]),
    roleId: new FormControl('', [Validators.required]),
    roleName: new FormControl('', [Validators.required]),
    founderTypeId: new FormControl('', [Validators.required]),
    founderName: new FormControl('', [Validators.required]),
    //password:new FormControl('',[Validators.required]),
    category: new FormControl('', [Validators.required]),
    isActive: new FormControl(),
  });
  private sub: any;

  constructor(public tokenStorage: TokenStorageService, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.getAllCategory();
    this.sub = this.route.params.subscribe(params => {
      this.userId = params['userId'];
      if (this.userId != undefined || this.userId > 0) {
        this.getserviceUserById(this.userId);
      }
    });
  }
  //Category select
  public onSelectionChange(e) {
    this.category = e.value;
    if (this.category.length != 0) {
      this.buttenDisabled = false;
    } else {
      this.buttenDisabled = true;
    }
  }
  //On Submit
  public onServiceSubmit(value: Object): void {
    this.updateUser(value);
  }
  //Get All Category
  public getAllCategory() {
    this.appService.getAll("api/Category/getAllCategory").subscribe(data => {
      this.ServiceCategoryList = data;
    });
  }
  //Get service user by id
  getserviceUserById(userId): void {
    this.appService.getByuserId('api/User/GetServiceUserById/userId?userId=' + userId).subscribe((data: any) => {
      // this.uploadForm.controls['userId'].setValue(data.userId);   
      this.uploadForm.controls['firstName'].setValue(data.firstName);
      this.uploadForm.controls['lastName'].setValue(data.lastName);
      this.uploadForm.controls['emailId'].setValue(data.emailId);
      this.uploadForm.controls['founderTypeId'].setValue(data.founderTypeId);
      this.uploadForm.controls['founderName'].setValue(data.founderName);
      this.uploadForm.controls['roleId'].setValue(data.roleId);
      this.uploadForm.controls['roleName'].setValue(data.roleName);
      this.uploadForm.controls['category'].setValue(data.category.split(","));
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //Update service user
  private updateUser = (serviceUserFormData) => {
    var userId = Number(this.userId);
    let serviceuserModel: ServiceProviderUserModel = {
      userId: userId,
      firstName: serviceUserFormData.firstName,
      lastName: serviceUserFormData.lastName,
      emailId: serviceUserFormData.emailId,
      roleId: serviceUserFormData.roleId,
      founderTypeId: serviceUserFormData.founderTypeId,
      password: serviceUserFormData.password,
      category: serviceUserFormData.category.toString(),
      isActive: true,
      serviceStatus: true
    }
    this.appService.editserviceuser('api/User/EditServiceUser', serviceuserModel).subscribe((response: any) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open('Updated Successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/masters/listserviceuser'], { relativeTo: this.route });
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}
