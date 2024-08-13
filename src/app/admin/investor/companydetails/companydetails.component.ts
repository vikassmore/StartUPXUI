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
import { OtherCompaniespopupComponent } from '../other-companiespopup/other-companiespopup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-companydetails',
  templateUrl: './companydetails.component.html',
  styleUrls: ['./companydetails.component.css'],
  providers: [DecimalPipe],
})
export class CompanydetailsComponent implements OnInit {
  myInvestShow: boolean;
  dashBoardShow: boolean;
  myWatchShow: boolean;
  panelOpenState = false;
  userId: number;
  founderVerifyId: number;
  founderList: any = [];
  fundingList: any = [];
  investorList: any = [];
  compitetorFounderList: any = [];
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
  MinimumInvestmentSize: string;
  formType: string | any;
  previewUrl: any;

  openDialog(): void {
    const dialogRef = this.dialog.open(OtherCompaniespopupComponent, {
      width: '60vh',
    });
  }
  constructor(public dialog: MatDialog,public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private sanitizer: DomSanitizer, private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['id'] == 1) {
      this.myInvestShow = true;
      this.dashBoardShow = false;
      this.myWatchShow = false;
    } else if (this.route.snapshot.params['id'] == 0) {
      this.dashBoardShow = true;
      this.myInvestShow = false;
      this.myWatchShow = false;
    } else {
      this.myWatchShow = true;
      this.dashBoardShow = false;
      this.myInvestShow = false;
    }
    
    this.userId = this.route.snapshot.params['id1'];
    this.founderVerifyId = this.route.snapshot.params['id2'];
    if (this.userId != null && this.founderVerifyId != null) {
      this.getFounderDetails(this.userId, this.founderVerifyId);
    }
  }
  //Scroll
  public scrollToDiv(target: HTMLElement) {
    target.scrollIntoView({ behavior: "smooth" });
  }

  //Get the founder detials
  public getFounderDetails(userId, founderVerifyId) {
    this.appService.getAllById("api/FounderVerification/GetAllDetailsById/", userId + "/" + founderVerifyId).subscribe(data => {
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
}
