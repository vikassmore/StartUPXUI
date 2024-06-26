import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeclineserviceComponent } from '../declineservice/declineservice.component';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadinvoiceComponent } from '../uploadinvoice/uploadinvoice.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-listassignmentworkflow',
  templateUrl: './listassignmentworkflow.component.html',
  styleUrls: ['./listassignmentworkflow.component.css']
})
export class ListassignmentworkflowComponent implements OnInit {
  ServiceCaseList: any = [];
  public ServiceCaseDataList: any = [];
  public title: any;
  userId: any;
  public page: any;
  public count = 10;
  constructor(public dialog: MatDialog, private tokenStorage: TokenStorageService, public appService: AppService, private snackBar: MatSnackBar) { }

  openDialog(serviceCaseId): void {
    const dialogRef = this.dialog.open(UploadinvoiceComponent, {
      width: '80vh',
      data: { serviceCaseId: serviceCaseId }
    });
  }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    this.getServiceCase(this.userId);
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getServiceCase(this.userId);
    }
    else {
      this.ServiceCaseList = this.ServiceCaseDataList.filter(res => {
        return (
          res.startupDeatailModel.startUpName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.intrestedServiceNames.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.status.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  ///pagination
  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }
  //get all service case on list
  public getServiceCase(userId) {
    this.appService.getAllById("api/Service/GetServiceCaseByServiceUserId/", userId).subscribe(data => {
      this.ServiceCaseDataList = data.filter(res => {
        return (
          res.status == "Accepted")
      });
      this.ServiceCaseList = this.ServiceCaseDataList;
    });
  }
}
