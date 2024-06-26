import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Enum } from './Enum';

@Component({
  selector: 'app-listnotification',
  templateUrl: './listnotification.component.html',
  styleUrls: ['./listnotification.component.css']
})
export class ListnotificationComponent implements OnInit {
  public NotificationList: any = [];
  notificationCount: string | any;
  userId: string | any;
  roleId: string | any;
  constructor(public appService: AppService, private _authService: AuthenticationService, private tokenStorage: TokenStorageService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    this.roleId = this.tokenStorage.getUser().roleId;
    if (this.userId != undefined || this.userId > 0) {
      this.getNotification(this.userId);
    }
  }
  ///Get Notification By user
  getNotification(userId): void {
    this.appService.getAllById('api/Master/GetNotificationByUserId/', userId).subscribe((data: any) => {
      this.NotificationList = data;
    })
    error => {
      console.log(error.error.errors);
    }
  }
  public backButtonClick() {
    if (this.roleId == Enum.RoleId.Satrtup) {
      this.router.navigate(['/admin/startup/dashboardstartup']);
    }
    else if (this.roleId == Enum.RoleId.Investor) {
      this.router.navigate(['/admin/investor/dashboardinvestor']);
    }
    else if (this.roleId == Enum.RoleId.Admin) {
      this.router.navigate(['/admin/dashboard-menu/dash-board']);
    }
    else if (this.roleId == Enum.RoleId.Service) {
      this.router.navigate(['/admin/serviceuser/dashboardserviceuser']);
    }
  }
  //Delete Notification
  public deleteNotification(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want delete this?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const index: number = this.NotificationList.indexOf(item);
        if (index !== -1) {
          this.NotificationList.splice(index, 1);
          this.appService.deleteById(`api/Master/DeleteNotification?notificationId=${item.notificationId}`, {}).subscribe(data => {

          });
        }
      }
    });
  }
}
