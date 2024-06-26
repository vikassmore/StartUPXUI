import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ServiceInfoModel } from '../serviceinfo/serviceInfo.Model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceinfoComponent } from '../serviceinfo/serviceinfo.component';


@Component({
  selector: 'app-serviceshowinterest',
  templateUrl: './serviceshowinterest.component.html',
  styleUrls: ['./serviceshowinterest.component.css']
})
export class ServiceshowinterestComponent implements OnInit {
  userId: number;
  founderUserId: number;
  serviceId: any;
  serviceName: string;
  serviceDescription: string;
  category: string;
  subcategory: string;
  portfolio: string;
  // intrestedServiceNames:string;
  contactInformation: string;
  private sub: any;
  serviceCaseId: number;
  status: string;
  comment: string;
  flag: any;
  flag2: any;

  uploadForm = new FormGroup({
    intrestedServiceNames: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public appService: AppService, private tokenStorage: TokenStorageService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.serviceId = this.data.serviceId;
    this.userId = this.tokenStorage.getUser().userId;
    if (this.serviceId != undefined || this.serviceId > 0) {
      this.getservicedetails(this.serviceId);
    }
  }

  closeDialog() {
    this.dialog.closeAll(); // <- Close the mat dialog
  }
  //Get service details by id
  public getservicedetails(serviceId) {
    this.appService.getAllById("api/Service/GetServiceById/", serviceId).subscribe(data => {
      this.serviceId = data.serviceId;
      this.serviceName = data.serviceName;
      this.serviceDescription = data.serviceDescription;
      this.category = data.category;
      this.subcategory = data.subCategory;
      this.contactInformation = data.contactInformation;
      this.portfolio = data.portfolio;
    });
  }
  //On Submit
  public onServiceSubmit(value: Object): void {
    if (this.uploadForm.valid) {
      this.Addservice();
    }
  }
  //Add interest in service
  private Addservice = () => {
    if (this.serviceCaseId == null) {
      let serviceModel: ServiceInfoModel = {
        founderUserId: this.userId,
        serviceId: this.serviceId,
        serviceInterestDate: new Date(),
        status: '',
        comment: '',
        isActive: true,
        intrestedServiceNames: this.uploadForm.value.intrestedServiceNames
      }
      this.appService.addserviceuser('api/Service/AddServiceCase', serviceModel).subscribe((response) => {
        console.log("response", response);
        if (!Number.isNaN(response)) {
          this.dialog.closeAll();
          this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

          this.router.navigate(['/admin/startup/listmyservice'], { relativeTo: this.route });
        } else {
          this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      }, error => {
        this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });
    }
  }


}


