import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeclineserviceComponent } from '../declineservice/declineservice.component';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceleadModel } from '../serviceleads/ServiceLead.Model';
import { debug } from 'console';
import { DeclineServiceModel } from '../declineservice/DeclineService.Model';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-serviceleads',
  templateUrl: './serviceleads.component.html',
  styleUrls: ['./serviceleads.component.css']
})
export class ServiceleadsComponent implements OnInit {
  ServiceCaseList: any = [];
  ServiceCaseAllList: any = [];
  ServiceCaseAllDataList: any = [];
  public title: any;
  userId: any;
  public page: any;
  public count = 10;
  constructor(public dialog: MatDialog, private tokenStorage: TokenStorageService, public appService: AppService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    this.getServiceCase(this.userId);
  }
  ///pagination
  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getServiceCase(this.userId);
    }
    else {
      this.ServiceCaseList = this.ServiceCaseAllList.filter(res => {
        return (
          res.startupDeatailModel.startUpName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.intrestedServiceNames.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.status.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  //method for decline order of founder
  public openDialog(serviceCaseId, serviceId) {
    const dialogRef = this.dialog.open(DeclineserviceComponent, {  //<==open popup for add comment for decline order
      width: '100vh',
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const comment = dialogRef.componentInstance.comment;
        let ServicedeclineModel1: DeclineServiceModel = {
          founderUserId: this.userId,
          ServiceCaseId: serviceCaseId,
          ServiceId: serviceId,
          Status: 'Declined',
          IsActive: true,
          comment: comment
        }
        this.appService.add('api/Service/ServiceDeny', ServicedeclineModel1).subscribe(data => {
        });
      }
    });
  }

  //get all service case on list
  public getServiceCase(userId) {
    this.appService.getAllById("api/Service/GetServiceCaseByServiceUserId/", userId).subscribe(data => {
      this.ServiceCaseAllDataList = data;
      this.ServiceCaseAllList = this.ServiceCaseAllDataList.filter(res => {
        return (
          res.status != "Accepted")
      });
      this.ServiceCaseList = this.ServiceCaseAllList;
    });
  }

  //method for accept the service order from founder
  public acceptOrder(serviceCaseId, serviceId, founderUserId) {
    let ServiceleadModel1: ServiceleadModel = {
      founderUserId: founderUserId,
      ServiceCaseId: serviceCaseId,
      ServiceId: serviceId,
      Status: 'Accepted',
      IsActive: true,
    }
    this.appService.add('api/Service/ServiceAccept', ServiceleadModel1).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.getServiceCase(this.userId);
        this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}
