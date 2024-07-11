import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { verify } from 'crypto';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Enum } from './Enum';
import { VerificationFounderModel } from './VerificationFounder.Model';
import { MatDialog } from '@angular/material/dialog';
import { NotapproveComponent } from '../notapprove/notapprove.component';
import { GaugingdemandComponent } from '../gaugingdemand/gaugingdemand.component';
import { DomSanitizer } from '@angular/platform-browser';
import { InvestmentopportunityComponent } from '../investmentopportunity/investmentopportunity.component';


@Component({
  selector: 'app-liststartup',
  templateUrl: './liststartup.component.html',
  styleUrls: ['./liststartup.component.css']
})
export class ListstartupComponent implements OnInit {
  formType: string | any;
  public founderList: [];
  public founderDataList: any = [];
  public investmnetopportunity: boolean;
  public title: any;
  verified: boolean | any;
  live: boolean | any;
  preview: boolean | any;
  isStealth: boolean | any;
  type: string | any;
  public page: any;
  public count = 10;
  constructor(public dialog: MatDialog, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private sanitizer: DomSanitizer) { }

  openDialog(userId, founderVerifyId): void {
    const dialogRef = this.dialog.open(NotapproveComponent, {
      width: '120vh',
      data: { userId: userId, founderVerifyId: founderVerifyId }
    });
  }

  openDialog1(userId, founderVerifyId, gaugingAmount): void {
    const dialogRef = this.dialog.open(GaugingdemandComponent, {
      width: '120vh',
      data: { userId: userId, founderVerifyId: founderVerifyId, gaugingAmount: gaugingAmount }
    });
  }

  openDialog2(userId, founderVerifyId): void {
    const dialogRef = this.dialog.open(InvestmentopportunityComponent, {
      width: '120vh',
      data: { userId: userId, founderVerifyId: founderVerifyId }
    });
  }
  ngOnInit(): void {
    this.getAll();
  }
  ///pagination
  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }
  //Get all Startup Company
  public getAll() {
    this.formType = this.route.snapshot.params['id'];
    if (this.formType == Enum.FormTypeId.Verified) {
      this.type = "VERIFIED";
      this.verified = true;
      this.isStealth = false;
      this.live = false;
      this.preview = true;
      this.getVerifiedNonVerifiedFounders(this.verified);
    }
    else if (this.formType == Enum.FormTypeId.Nonverified) {
      this.type = "NON VERIFIED";
      this.verified = false;
      this.isStealth = false;
      this.getVerifiedNonVerifiedFounders(this.verified);
    }
    else if (this.formType == Enum.FormTypeId.Live) {
      this.type = "LIVE";
      this.live = true;
      this.preview = false;
      this.verified = true;
      this.isStealth = false;
      this.getLivePreviewFounders(this.live, this.preview);
    }
    else if (this.formType == Enum.FormTypeId.Preview) {
      this.type = "PREVIEW";
      this.live = false;
      this.preview = true;
      this.verified = true;
      this.isStealth = false;
      this.getLivePreviewFounders(this.live, this.preview);

    } else {
      this.type = "STEALTH";
      this.isStealth = true;
      this.getStealthFounders();
    }
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getAll();
    }
    else {
      this.founderList = this.founderDataList.filter(res => {
        return (
          res.startupDeatailModel.startUpName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.startupDeatailModel.sectorName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  //Get the Verified/NonVerified founders
  public getVerifiedNonVerifiedFounders(verified) {
    this.appService.getAllById("api/FounderVerification/GetAllVerifiedDetails/", verified).subscribe(data => {
      this.founderDataList = data.map(p => ({
        founderVerifyId: p.founderVerifyId,
        gaugingAmount: p.gaugingAmount,
        verified: p.verified,
        live: p.live,
        preview: p.preview,
        comment: p.comment,
        userId: p.userId,
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
          companyLegalName: p.startupDeatailModel.companyLegalName,
          companyHeadquartersAddress: p.startupDeatailModel.companyHeadquartersAddress,
          companyContact: p.startupDeatailModel.companyContact,
          companyEmailId: p.startupDeatailModel.companyEmailId,
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
          qtherKeyProvisions: y.qtherKeyProvisions,
        })),
        investmnetopportunity: p.investmnetopportunity == null ? true : false,
      }));
      this.founderList = this.founderDataList;
    });
  }
  //Get the Live/Preview founders
  public getLivePreviewFounders(live, preview) {
    this.appService.getAllById("api/FounderVerification/GetAllLivePreViewDetails/", live + "/" + preview).subscribe(data => {
      this.founderDataList = data.map(p => ({
        founderVerifyId: p.founderVerifyId,
        gaugingAmount: p.gaugingAmount,
        verified: p.verified,
        live: p.live,
        preview: p.preview,
        comment: p.comment,
        userId: p.userId,
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
          companyLegalName: p.startupDeatailModel.companyLegalName,
          companyHeadquartersAddress: p.startupDeatailModel.companyHeadquartersAddress,
          companyEmailId: p.startupDeatailModel.companyEmailId,
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
          qtherKeyProvisions: y.qtherKeyProvisions,
        })),
        investmnetopportunity: p.investmnetopportunity == null ? true : false,
      }));
      this.founderList = this.founderDataList;
    });
  }
  //Get the Stealth founders
  public getStealthFounders() {
    this.appService.getAll("api/FounderVerification/GetAllFounderIsStealthDetails").subscribe(data => {
      this.founderDataList = data.map(p => ({
        founderVerifyId: p.founderVerifyId,
        gaugingAmount: p.gaugingAmount,
        verified: p.verified,
        live: p.live,
        preview: p.preview,
        comment: p.comment,
        userId: p.userId,
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
          companyLegalName: p.startupDeatailModel.companyLegalName,
          companyHeadquartersAddress: p.startupDeatailModel.companyHeadquartersAddress,
          companyContact: p.startupDeatailModel.companyContact,
          companyEmailId: p.startupDeatailModel.companyEmailId,
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
          qtherKeyProvisions: y.qtherKeyProvisions,
        })),
      }));
      this.founderList = this.founderDataList;
    });
  }
  //Add Company as live
  public makeLivefounder(userId, founderVerifyId) {
    let verificationFounderModel1: VerificationFounderModel = {
      UserId: userId,
      FounderVerifyId: founderVerifyId,
      SendForVerification: true,
      Verified: true,
      Live: true,
      GaugingAmount: null,
      Preview: false,
      Comment: null,
      IsActive: true,
    }
    this.appService.add('api/FounderVerification/LiveFounder', verificationFounderModel1).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.getAll();
        this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
  //Approve Company
  public approvefounder(userId, founderVerifyId) {
    let verificationFounderModel1: VerificationFounderModel = {
      UserId: userId,
      FounderVerifyId: founderVerifyId,
      SendForVerification: true,
      Verified: true,
      Live: null,
      GaugingAmount: null,
      Preview: null,
      Comment: null,
      IsActive: true,
    }
    this.appService.add('api/FounderVerification/VerificationApprove', verificationFounderModel1).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.getAll();
        this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}
