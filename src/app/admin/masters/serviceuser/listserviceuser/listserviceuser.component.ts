import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { ServiceProviderUserModel2 } from './serviceUser2.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { saveAs } from 'file-saver/dist/FileSaver';
import { DenyserviceuserComponent } from '../denyserviceuser/denyserviceuser.component';

@Component({
  selector: 'app-listserviceuser',
  templateUrl: './listserviceuser.component.html',
  styleUrls: ['./listserviceuser.component.css']

})
export class ListserviceuserComponent implements OnInit {
  public ServiceUserList: any = [];
  roleId: any;
  public ServiceUserDataList: any = [];
  public title: any;
  public page: any;
  public count = 10;
  constructor(public appService: AppService, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getServiceProvider();
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getServiceProvider();
    }
    else {
      if (this.title.toLocaleLowerCase() == "active") {
        this.ServiceUserList = this.ServiceUserDataList.filter(res => {
          return (
            res.serviceStatus == true
          );
        });
      } else if (this.title.toLocaleLowerCase() == "blocked") {
        this.ServiceUserList = this.ServiceUserDataList.filter(res => {
          return (
            res.serviceStatus == false
          );
        });
      } else if (this.title.toLocaleLowerCase() == "inactive") {
        this.ServiceUserList = this.ServiceUserDataList.filter(res => {
          return (
            res.serviceStatus == null
          );
        });
      } else {
        this.ServiceUserList = this.ServiceUserDataList.filter(res => {
          return (
            res.firstName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
            res.lastName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
            res.serviceDataModel.serviceProviderName?.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
            res.emailId.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
            res.category.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
          );
        });
      }
    }
  }
  ///pagination
  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }
  //Activate Service user
  public active(id) {
    let ServiceStatus: ServiceProviderUserModel2 = {
      userId: id,
      isActive: true,
      serviceStatus: true
    }
    this.appService.add('api/User/EditServiceStatus', ServiceStatus).subscribe((response: any) => {
      if (!Number.isNaN(response)) {
        this.getServiceProvider();
        this.snackBar.open('Activated Successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/masters/listserviceuser'], { relativeTo: this.route });
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });

  }
  //Block Service user
  public blocked(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure want to Block this Service User?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const index: number = this.ServiceUserList.indexOf(item);
        if (index !== -1) {
          this.ServiceUserList.splice(index, 1);
          this.openDialog(item.userId);
          this.getServiceProvider();
        }
      }
    });
  }
  openDialog(userId): void {
    const dialogRef = this.dialog.open(DenyserviceuserComponent, {
      width: '100vh',
      data: { userId: userId }
    });
  }
  //Get service user list
  public getServiceProvider() {
    this.appService.getAll("api/User/GetAllServiceProviderUser").subscribe(data => {
      this.ServiceUserDataList = data;
      this.ServiceUserList = data;
    });
  }
  ///download file
  public downloadDocument(serviceId, serviceProviderName) {
    this.appService.downloadById("api/Service/DownloadAllPortfolioById/", serviceId).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: data.type });
      saveAs(blob, serviceProviderName);
    });
  }
}
