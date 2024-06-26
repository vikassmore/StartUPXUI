import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-dashboardserviceuser',
  templateUrl: './dashboardserviceuser.component.html',
  styleUrls: ['./dashboardserviceuser.component.css']
})
export class DashboardserviceuserComponent implements OnInit {
  public NotificationList: any = [];
  notificationCount: string | any;
  userId: string | any;
  constructor(public appService: AppService, private _authService: AuthenticationService, private snackBar: MatSnackBar, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != undefined || this.userId > 0) {
      this.getNotification(this.userId);
    }
  }
 ///Get Notification By user
 getNotification(userId): void {
  this.appService.getAllById('api/Master/GetNotificationByUserId/', userId).subscribe((data: any) => {
   this.NotificationList = data;
   this.notificationCount = data.length;
  })
  error => {
    console.log(error.error.errors);
  }
}
}
