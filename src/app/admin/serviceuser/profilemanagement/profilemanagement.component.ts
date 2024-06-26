import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AdddocumentComponent } from '../adddocument/adddocument.component';
import { ProfileManagementModel } from './Profilemanagement.Model';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import {saveAs} from 'file-saver/dist/FileSaver';

@Component({
  selector: 'app-profilemanagement',
  templateUrl: './profilemanagement.component.html',
  styleUrls: ['./profilemanagement.component.css']
})
export class ProfilemanagementComponent implements OnInit {
  userId: string | any;
  serviceProviderId: string | any;
  ServiceCategoryList: any = [];
  portfoliodocumentdetail: any = [];
  uploadForm = new FormGroup({
    ServiceProviderId: new FormControl(''),
    ServiceProviderName: new FormControl('', [Validators.required]),
    Category: new FormControl('', [Validators.required]),
    ContactInformation: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    TagsKeywords: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    isActive: new FormControl(true)

  })
  constructor(public dialog: MatDialog, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder, private tokenStorage: TokenStorageService) { }

  openDialog(serviceId): void {
    const dialogRef = this.dialog.open(AdddocumentComponent, {
      width: '120vh',
      data: { serviceId: serviceId }
    });
  }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != undefined || this.userId > 0) {
      this.getServiceProfileDetailsById(this.userId);
    }
    this.getAllCategory();
  }
  //Get All category
  public getAllCategory() {
    this.appService.getAll("api/Category/getAllCategory").subscribe(data => {
      this.ServiceCategoryList = data;
    });
  }
  ///On Submit 
  public onSubmit(value: Object): void {
    if (this.uploadForm.valid) {
      this.addService(value);
    }
  }
  //Validation
  keyPressOnlyChar(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    }
    else {
      event.preventDefault();
      return false;
    }
  }
  ///Get Profile details By userId
  getServiceProfileDetailsById(userId): void {
    this.appService.getById('api/Service/GetServiceByUserId/', userId).subscribe((data: any) => {
      this.uploadForm.controls['ServiceProviderId'].setValue(data.serviceId);
      this.uploadForm.controls['ServiceProviderName'].setValue(data.serviceProviderName);
      this.uploadForm.controls['Category'].setValue(data.category.split(","));
      this.uploadForm.controls['ContactInformation'].setValue(data.contactInformation);
      this.uploadForm.controls['TagsKeywords'].setValue(data.tagsKeywords);
      this.serviceProviderId = data.serviceId;
      this.getServiceDocument(this.serviceProviderId);
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //Get Service document by Id
  public getServiceDocument(serviceProviderId) {
    this.appService.getAllById("api/Service/GetAllDocumentByServiceId/", serviceProviderId).subscribe(data => {
      this.portfoliodocumentdetail = data;
    });
  }
  //Delete document
  public deleteDocument(doc: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want delete this?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const index: number = this.portfoliodocumentdetail.indexOf(doc);
        if (index !== -1) {
          this.portfoliodocumentdetail.splice(index, 1);
          this.appService.deleteById(`api/Service/DeletePortfolioDocument?servicePortFolioId=${doc.servicePortFolioId}`, {}).subscribe(data => {

          });
        }
      }
    });
  }

  ///download file
  public downloadDocument(serviceId, servicePortFolioId,fileName) {
    this.appService.downloadById("api/Service/DownloadPortfolioById/", serviceId + '/' + servicePortFolioId).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: data.type });
      saveAs(blob, fileName); 
    });
  }
  //Add service Data 
  private addService = (serviceFormData) => {
    let ProfileManagementModel1: ProfileManagementModel = {
      ServiceId: this.serviceProviderId,
      ServiceProviderName: serviceFormData.ServiceProviderName,
      Category: serviceFormData.Category.toString(),
      ContactInformation: serviceFormData.ContactInformation,
      TagsKeywords: serviceFormData.TagsKeywords,
      UserId: this.userId,
      IsActive: true,
    }
    this.appService.add('api/Service', ProfileManagementModel1).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/serviceuser/profilemanagement'], { relativeTo: this.route });
      }
      else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}
