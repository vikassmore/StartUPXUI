import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { FounderVerificationModel } from './FounderVerification.Model';
import { response } from 'express';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-dashboardstartup',
  templateUrl: './dashboardstartup.component.html',
  styleUrls: ['./dashboardstartup.component.css']
})
export class DashboardstartupComponent implements OnInit {

  founderTypeName: any | string;
  panelOpenState = false;
  public roleId: string;
  verified: boolean;
  userId: string | any;
  public serviceName: any;
  buttonDisabled: boolean;
  raisebuttonDisabled: boolean;
  founderProfileCompetion: string | any;
  FounderDetailCount: number;
  FundingDetailCount: number;
  public PolicyList = [];
  public ServiceList: any = [];
  public ServiceProviderList: any = [];
  public FAQList = [];
  value = '';
  ProfileStatus: string | any;
  public NotificationList: any = [];
  notificationCount: string | any;
  constructor(public appService: AppService, private _authService: AuthenticationService, private snackBar: MatSnackBar, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    // this.founderTypeName=sessionStorage.getItem("founderName");
    this.roleId = sessionStorage.getItem("userID");
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != undefined || this.userId > 0) {
      this.getFounderProfileCompletion(this.userId);
      this.getNotification(this.userId);
    }
    this.getFAQMaster();
    this.getPolicyMaster();
    this.getServiceProvider();
    this.GetFounderType();
  }
  //Get policy list
  public getPolicyMaster() {
    this.appService.getAll("api/Master/GetAllPolicy").subscribe(data => {
      this.PolicyList = data;
    });
  }
  //Get Founder type by user
  public GetFounderType() {
    this._authService.getFounderTypeByuserId("api/FounderType/GetFounderTypeByUserId/UserId?userId=" + this.userId).subscribe((data: any) => {
      this.founderTypeName = data.founderName;
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //Search
  Search() {
    if (this.serviceName == "") {
      this.ServiceList = this.ServiceProviderList;
    }
    else {
      this.ServiceList = this.ServiceProviderList.filter(res => {
        return (
          res.serviceProviderName.toLocaleLowerCase().includes(this.serviceName.toLocaleLowerCase()) ||
          res.tagsKeywords.toLocaleLowerCase().includes(this.serviceName.toLocaleLowerCase()) ||
          res.category.toLocaleLowerCase().includes(this.serviceName.toLocaleLowerCase())
        );
      });
    }
  }
  //Clear searxh text box
  myClearFunction() {
    this.ServiceList = this.ServiceProviderList;
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
  //Get service provider list
  public getServiceProvider() {
    this.appService.getAll("api/Service").subscribe(data => {
      this.ServiceList = data;
      this.ServiceProviderList = data;
    });
  }
  ///Get Founder Profile Completion
  getFounderProfileCompletion(userId): void {
    this.appService.getAllById('api/FounderVerification/FounderProfileCompletion/', userId).subscribe((data: any) => {
      this.founderProfileCompetion = (((data.founderProfileCompletion) * 100) / 5).toFixed(0);
      this.verified = data.verified;
      this.FounderDetailCount = data.founderDetailCount;
      this.FundingDetailCount = data.fundingDetailCount;
      if (this.verified == null) {
        this.verified = false;
      }
      if (this.founderProfileCompetion == 100) {
        if (data.verified == true) {
          this.buttonDisabled = true;
          this.ProfileStatus = "Verified Profile";
        } else {
          this.buttonDisabled = false;
          this.ProfileStatus = "Non Verified Profile";
        }
        this.raisebuttonDisabled = false;
      } else {
        this.buttonDisabled = true;
        this.raisebuttonDisabled = true;
        this.ProfileStatus = "Non Verified Profile";
      }
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //Get FAQ list
  public getFAQMaster() {
    this.appService.getAll("api/Master/GetAllFAQ").subscribe(data => {
      this.FAQList = data;
    });
  }
  //Founder Send for verification
  public senForVerification() {
    let founderVerificationModel1: FounderVerificationModel = {
      userId: this.userId,
      sendForVerification: true,
      raiseFunding: false,
    }
    this.appService.add(`api/FounderVerification/SendForVerification`, founderVerificationModel1).subscribe(response => {
      if (!Number.isNaN(response)) {
        this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
      else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    },
      (error) => {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      });
  }
  //Add as a raise funding
  public raiseFunding() {
    let founderVerificationModel1: FounderVerificationModel = {
      userId: this.userId,
      sendForVerification: false,
      raiseFunding: true
    }
    this.appService.add(`api/FounderVerification/RequestRaiseFunding`, founderVerificationModel1).subscribe(response => {
      if (!Number.isNaN(response)) {
        this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
      else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    },
      (error) => {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      });
  }
}
