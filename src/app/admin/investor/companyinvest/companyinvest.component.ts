import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { verify } from 'crypto';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DecimalPipe } from '@angular/common';
import { InvestorInvestmentModel } from './InvestorInvestment.Model';
import { Chart, registerables } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-companyinvest',
  templateUrl: './companyinvest.component.html',
  styleUrls: ['./companyinvest.component.css'],
  providers: [DecimalPipe],
})
export class CompanyinvestComponent implements OnInit {
  chart1: any;
  ngAfterViewInit() {
    let ctx1: any = document.getElementById('lineChart1') as HTMLElement;

    var data1 = {
      labels: this.fundingList.map(x => x.dateFinancing),
      datasets: [
        {
          label: 'Series A',
          data: this.fundingIssuelist,
          backgroundColor: 'blue',
          borderColor: 'lightblue',
          fill: false,
          lineTension: 0,
          radius: 5,
        },

      ],
    };

    //options
    var options1 = {
      responsive: true,
      title: {
        display: true,
        position: 'top',
        text: 'Line Graph',
        fontSize: 18,
        fontColor: '#111',
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: '#333',
          fontSize: 16,
        },
      },
    };

    var chart1 = new Chart(ctx1, {
      type: 'line',
      data: data1,
      options: options1,
    });

  }
  panelOpenState = false;
  userId: number;
  founderVerifyId: number;
  compitetorFounderList: any = [];
  fundingIssuelist: any = [];
  founderList: any = [];
  fundingList: any = [];
  investorList:any= [];
  LastValuation: string;
  StartUpName: string;
  Address: string;
  FoundingYear: number;
  CompanyDescription: string;
  WebsiteUrl: string;
  EmployeeCount: number;
  SectorName: number;
  CompanyLegalName: string;
  CompanyContact: number;
  CompanyEmailId: string
  BusinessModel: string;
  TargetCustomerBase: string;
  TargetMarket: string;
  ServiceDescription: string;
  ManagementInfo: string;
  FundName: string;
  FundStrategy: string;
  SalesFee: string;
  ExpectedSharePrice: string;
  SecurityType: string;
  ImpliedCompanyValuation: string;
  LatestPostMoneyValuation: string;
  Discount: string;
  MinimumInvestmentSize: number;
  formType: string | any;
  previewUrl: any;
  investorProfileCompetion: string | any;
  verified: boolean;
  MidInvestmentSize: number;
  MaxInvestmentSize: number;
  investorUserId: number;
  investmentAmount: string;
  NotableInvestorName:string;
  FundingModelDetails: string | any;
  uploadForm = new FormGroup({
    onWatchList: new FormControl(),
  });
  constructor(public dialog: MatDialog, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private sanitizer: DomSanitizer, private decimalPipe: DecimalPipe) { Chart.register(...registerables); }

  ngOnInit(): void {
    this.investorUserId = this.tokenStorage.getUser().userId;
    this.userId = this.route.snapshot.params['id'];
    this.founderVerifyId = this.route.snapshot.params['id1'];
    if (this.userId != null && this.founderVerifyId != null) {
      this.getFounderDetails(this.userId, this.founderVerifyId);
      this.getInvestorProfileCompletion(this.investorUserId);
    }
  }
  //Scroll
  public scrollToDiv(target: HTMLElement) {
    target.scrollIntoView({ behavior: "smooth" });
  }

  //Get the founder detials
  public getFounderDetails(userId, founderVerifyId) {
    this.appService.getAllById("api/FounderVerification/GetAllDetailsById/", userId + "/" + founderVerifyId).subscribe(data => {
      this.LastValuation = this.decimalPipe.transform((data.lastValuation) / 1000);
      this.StartUpName = data.startupDeatailModel.startUpName;
      this.Address = data.startupDeatailModel.address;
      this.FoundingYear = data.startupDeatailModel.foundingYear;
      this.WebsiteUrl = data.startupDeatailModel.websiteUrl;
      this.EmployeeCount = data.startupDeatailModel.employeeCount;
      this.SectorName = data.startupDeatailModel.sectorName;
      this.CompanyEmailId = data.startupDeatailModel.companyEmailId;
      this.CompanyLegalName = data.startupDeatailModel.companyLegalName;
      this.CompanyContact = data.startupDeatailModel.companyContact;
      this.BusinessModel = data.startupDeatailModel.businessModel;
      this.TargetCustomerBase = data.startupDeatailModel.targetCustomerBase;
      this.TargetMarket = data.startupDeatailModel.targetMarket;
      this.CompanyDescription = data.startupDeatailModel.companyDescription;
      this.ServiceDescription = data.startupDeatailModel.serviceDescription;
      this.ManagementInfo = data.startupDeatailModel.managementInfo;
      this.previewUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + data.startupDeatailModel.logo),
      this.NotableInvestorName = data.notableInvestorName;
        this.founderList = data.founderDeatail.map((x, index) => ({
          Id: index + 1,
          founderId: x.founderId,
          firstName: x.firstName,
          lastName: x.lastName,
          emailId: x.emailId,
          mobileNo: x.mobileNo,
          gender: x.gender,
          description: x.description
        }));
      this.fundingList = data.fundingDetails.map((y, index) => ({
        Id: index + 1,
        fundingDetailsId: y.fundingDetailsId,
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
        otherKeyProvisions: y.otherKeyProvisions,
      }));
      this.investorList = data.investorInvestmentList;
      this.FundName = data.investmnetopportunity?.fundName;
      this.FundStrategy = data.investmnetopportunity?.fundStrategy;
      this.SalesFee = data.investmnetopportunity?.salesFee;
      this.ExpectedSharePrice = data.investmnetopportunity?.expectedSharePrice;
      this.SecurityType = data.investmnetopportunity?.securityType;
      this.ImpliedCompanyValuation = data.investmnetopportunity?.impliedCompanyValuation;
      this.LatestPostMoneyValuation = data.investmnetopportunity?.latestPostMoneyValuation;
      this.Discount = data.investmnetopportunity?.discount;
      this.MinimumInvestmentSize = data.investmnetopportunity?.minimumInvestmentSize;
      this.MidInvestmentSize = +(this.MinimumInvestmentSize) + +300000;
      this.MaxInvestmentSize = +(this.MidInvestmentSize) + +500000;
      this.fundingIssuelist = this.fundingList.map(x => x.issuePrice);
      this.FundingModelDetails = data.fundingModelDetails;
      this.compitetorFounderList = data.compitetorFounders.map(p => ({
        lastRoundPrice: p.lastRoundPrice,
        lastValuation: this.decimalPipe.transform((p.lastValuation) / 1000),
        startupDeatailModel: {
          startupId: p.startupDeatailModel.startupId,
          startUpName: p.startupDeatailModel.startUpName,
          address: p.startupDeatailModel.address,
          countryId: p.startupDeatailModel.countryId,
          stateId: p.startupDeatailModel.stateId,
          cityId: p.startupDeatailModel.cityId,
          foundingYear: p.startupDeatailModel.foundingYear,
          companyDescription: p.startupDeatailModel.companyDescription,
          websiteUrl: p.startupDeatailModel.websiteUrl,
          previewUrl: this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + p.startupDeatailModel.logo),
          logoFileName: p.startupDeatailModel.logoFileName,
          employeeCount: p.startupDeatailModel.employeeCount,
          sectorId: p.startupDeatailModel.sectorId,
          sectorName: p.startupDeatailModel.sectorName,
          companyEmailId: p.startupDeatailModel.companyEmailId,
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
        }))
      }));
    });
  }
  //Add company to watch list
  onButtonClick(value: Object): void {
    this.addonwatchList(value);
  }
  ///Get Investor Profile Completion
  getInvestorProfileCompletion(userId): void {
    this.appService.getAllById('api/InvestorVerification/InvestorProfileCompletion/', userId).subscribe((data: any) => {
      this.investorProfileCompetion = (((data.investorProfileCompletion) * 100) / 3).toFixed(0);
      this.verified = data.verified;
      if (this.verified == null) {
        this.verified = false;
      }
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //Add Investment
  public startInvestment() {
    if (this.verified == true) {
      if (this.investmentAmount != "" && this.investmentAmount != undefined) {
        let investorinvestmentModel: InvestorInvestmentModel = {
          onWatchList: false,
          investorInvestmentId: 0,
          investmentAmount: this.investmentAmount,
          indicateInterest: null,
          investmentRound: this.FundingModelDetails.liquidityRank,
          founderVerifyId: this.founderVerifyId,
          investorUserId: this.investorUserId,
          loggedUserId: 0,
          isActive: true,
        }
        this.appService.add('api/InvestorInvestment/AddInvestorInvestment', investorinvestmentModel).subscribe((response) => {
          if (!Number.isNaN(response)) {
            this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['../companyinvest'], { relativeTo: this.route });
          }
          else {
            this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          }
        }, error => {
          this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        });
      } else {
        const dialogRef = this.dialog.open(DialogComponent, {
          maxWidth: "400px",
          data: {
            message: "Please select or enter investment amount."
          }
        });
      }
    } else {
      const dialogRef = this.dialog.open(DialogComponent, {
        maxWidth: "400px",
        data: {
          message: "Profile details are not completed or user not verified, Please complete the profile."
        }
      });
      //this.snackBar.open('Profile details are not completed or user not verified, Please complete the profile', '×', { panelClass: 'error', verticalPosition: 'top', duration: 6000 });
    }
  }
  //Investment value select
  public onItemChange(value) {
    this.investmentAmount = value;
  }
  //Investment value add
  public onInvestmentChange(value) {
    this.investmentAmount = value;
  }
  //Add company to watch list
  private addonwatchList = (Watchlistformdata) => {
    let investorinvestmentModel: InvestorInvestmentModel = {
      onWatchList: true,
      investorInvestmentId: Watchlistformdata.investorInvestmentId,
      investmentAmount: Watchlistformdata.investmentAmount,
      indicateInterest: Watchlistformdata.indicateInterest,
      investmentRound: Watchlistformdata.investmentRound,
      founderVerifyId: this.founderVerifyId,
      investorUserId: this.investorUserId,
      loggedUserId: Watchlistformdata.loggedUserId,
      isActive: true,

    }
    this.appService.add('api/InvestorInvestment/AddOnWatch', investorinvestmentModel).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open('Company successfuly add to your watchlist!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['../companyinvest'], { relativeTo: this.route });
      }
      else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}
