import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { InvestorVerificationModel } from './InvestorVerification.Model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboardinvestor',
  templateUrl: './dashboardinvestor.component.html',
  styleUrls: ['./dashboardinvestor.component.css'],
  providers: [DecimalPipe],
})
export class DashboardinvestorComponent implements OnInit {
  panelOpenState = false;
  founderTypeName: any | string;
  public FAQList = [];
  public PolicyList = [];
  startupDetails: any = [];
  public ServiceList: any = [];
  public ServiceProviderList: any = [];
  public NotificationList: any = [];
  notificationCount: string | any;
  founderType: any[];
  userId: string | any;
  public serviceName: any;
  verified: boolean;
  buttonDisabled: boolean;
  investmentDisabled: boolean;
  ProfileStatus: string | any;
  investorProfileCompetion: string | any;
  constructor(public appService: AppService, private _authService: AuthenticationService, private sanitizer: DomSanitizer, private snackBar: MatSnackBar, private tokenStorage: TokenStorageService, private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != undefined || this.userId > 0) {
      this.getInvestorProfileCompletion(this.userId);
      this.getAllFounders(this.userId);
      this.getNotification(this.userId);
    }
    this.getFAQMaster();
    this.getPolicyMaster();
    this.getServiceProvider();
    this.GetFounderType();
  }
  //Get FAQ Questions/Ansers
  public getFAQMaster() {
    this.appService.getAll("api/Master/GetAllFAQ").subscribe(data => {
      this.FAQList = data;
    });
  }
  //Get Policy
  public getPolicyMaster() {
    this.appService.getAll("api/Master/GetAllPolicy").subscribe(data => {
      this.PolicyList = data;
    });
  }
  //Search services
  Search() {
    if (this.serviceName == "") {
      this.getServiceProvider();
    }
    else {
      this.ServiceList = this.ServiceProviderList.filter(res => {
        return (
          res.serviceName.toLocaleLowerCase().includes(this.serviceName.toLocaleLowerCase()) ||
          res.serviceDescription.toLocaleLowerCase().includes(this.serviceName.toLocaleLowerCase())
        );
      });
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
  //Get Service provider
  public getServiceProvider() {
    this.appService.getAll("api/Service").subscribe(data => {
      this.ServiceList = data;
      this.ServiceProviderList = data;
    });
  }
  //Get founder type by User
  public GetFounderType() {
    this._authService.getFounderTypeByuserId("api/FounderType/GetFounderTypeByUserId/UserId?userId=" + this.userId).subscribe((data: any) => {
      this.founderTypeName = data.founderName;
    })
    error => {
      console.log(error.error.errors);
    }
  }
  ///Get Investor Profile Completion
  getInvestorProfileCompletion(userId): void {
    this.appService.getAllById('api/InvestorVerification/InvestorProfileCompletion/', userId).subscribe((data: any) => {
      this.investorProfileCompetion = (((data.investorProfileCompletion) * 100) / 4).toFixed(0);
      this.verified = data.verified;
      if (this.verified == null) {
        this.verified = false;
      }
      if (this.investorProfileCompetion == 100) {
        if (data.verified == true) {
          this.buttonDisabled = true;
          this.ProfileStatus = "Verified Profile";
          // this.investmentDisabled = false;
        } else {
          this.buttonDisabled = false;
          this.ProfileStatus = "Non Verified Profile";
          // this.investmentDisabled = true;
        }

      } else {
        this.buttonDisabled = true;
        // this.investmentDisabled = true;
        this.ProfileStatus = "Non Verified Profile";
      }
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //Send Investor for the verification
  public senForVerification() {
    let investorVerificationModel1: InvestorVerificationModel = {
      userId: this.userId,
      sendForVerification: true,
    }
    this.appService.add(`api/InvestorVerification/SendForVerification`, investorVerificationModel1).subscribe(response => {
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

  //Get the All startups By Sector
  public getAllFounders(userId) {
    this.appService.getAllById("api/InvestorVerification/GetAllStartupDetailsBySector/", userId).subscribe(data => {
      this.startupDetails = data.map(p => ({
        userId: p.userId,
        founderVerifyId: p.founderVerifyId,
        lastRoundPrice: p.lastRoundPrice,
        lastValuation: this.decimalPipe.transform((p.lastValuation) / 1000),
        startupDeatailModel: {
          startupId: p.startupDeatailModel.startupId,
          startUpName: p.startupDeatailModel.startUpName,
          address: p.startupDeatailModel.address,
          countryId: p.startupDeatailModel.countryId,
          stateId: p.startupDeatailModel.stateId,
          cityId: p.startupDeatailModel.cityId,
          startYear: p.startupDeatailModel.startYear,
          companyDescription: p.startupDeatailModel.companyDescription,
          websiteUrl: p.startupDeatailModel.websiteUrl,
          previewUrl: this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + p.startupDeatailModel.logo),
          logoFileName: p.startupDeatailModel.logoFileName,
          employeeCount: p.startupDeatailModel.employeeCount,
          sectorId: p.startupDeatailModel.sectorId,
          sectorName: p.startupDeatailModel.sectorName,
          foundingDate: p.startupDeatailModel.foundingDate,
          companyLegalName: p.startupDeatailModel.companyLegalName,
          companyHeadquartersAddress: p.startupDeatailModel.companyHeadquartersAddress,
          companyContact: p.startupDeatailModel.companyContact,
          serviceDescription: p.startupDeatailModel.serviceDescription,
          businessModel: p.startupDeatailModel.businessModel,
          targetCustomerBase: p.startupDeatailModel.targetCustomerBase,
          targetMarket: p.startupDeatailModel.targetMarket,
          managementInfo: p.startupDeatailModel.managementInfo,
          isStealth: p.startupDeatailModel.isStealth,
          isActive: p.startupDeatailModel.isActive,
        },
        founderDeatail: p.founderDeatail.map(x => ({
          founderId: x.founderId,
          firstName: x.firstName,
          lastName: x.lastName,
          emailId: x.emailId,
          mobileNo: x.mobileNo,
          gender: x.gender,
          description: x.description,
        })),
        fundingDetails: p.fundingDetails.map(y => ({
          fundingDetailsId: y.fundingModelDetailsId,
          fundingId: y.fundingId,
          seriesName: y.seriesName,
          shareClass: y.shareClass,
          dateFinancing: y.dateFinancing,
          sharesOutstanding: y.sharesOutstanding,
          issuePrice: y.issuePrice,
          conversionPrice: y.conversionPrice,
          totalFinancingSize: y.totalFinancingSize,
          liquidityRank: y.liquidityRank,
          liquidationPreference: y.liquidationPreference,
          dividendRate: y.dividendRate,
          dividendType: y.dividendType,
          votesPerShare: y.votesPerShare,
          redemptionRights: y.redemptionRights,
          convertibleToOnPublicListing: y.convertibleToOnPublicListing,
          participatingPreferred: y.participatingPreferred,
          qualifiedIpo: y.qualifiedIpo,
          qtherKeyProvisions: y.qtherKeyProvisions,
        })),
      }));
    });
  }
}
