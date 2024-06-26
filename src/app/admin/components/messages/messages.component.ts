import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MessagesService } from './messages.service';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ActivatedRoute, Data, Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessagesService]
})
export class MessagesComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public selectedTab: number = 1;
  public NotificationList: any = [];
  public files: Array<Object>;
  public meetings: Array<Object>;
  userId: string | any;
  notificationCount: string | any;
  constructor(public appService: AppService, private _authService: AuthenticationService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != undefined || this.userId > 0) {
      this.getNotification(this.userId);
    }
  }

  openMessagesMenu() {
    this.trigger.openMenu();
    this.selectedTab = 0;
  }

  onMouseLeave() {
    this.trigger.closeMenu();
  }

  stopClickPropagate(event: any) {
    event.stopPropagation();
    event.preventDefault();
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
