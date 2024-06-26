import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { verify } from 'crypto';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import {saveAs} from 'file-saver/dist/FileSaver';

@Component({
  selector: 'app-viewstartup',
  templateUrl: './viewstartup.component.html',
  styleUrls: ['./viewstartup.component.css']
})
export class ViewstartupComponent implements OnInit {
  panelOpenState = false;
  userId: number;
  founderVerifyId: number;
  founderList: any = [];
  fundingList: any = [];
  investorList: any = [];
  investorOppList: any = [];
  documentList: any = [];
  StartUpName: string;
  Address: string;
  FoundingYear: number;
  CompanyDescription: string;
  WebsiteUrl: string;
  EmployeeCount: number;
  SectorName: number;
  CompanyEmailId: string;
  CompanyLegalName: string;
  CompanyContact: number;
  BusinessModel: string;
  TargetCustomerBase: string;
  TargetMarket: string;
  formType: string | any;
  previewUrl: any;
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.founderVerifyId = this.route.snapshot.params['id2'];
    this.formType = this.route.snapshot.params['id3'];
    if (this.userId != null && this.founderVerifyId != null) {
      this.getFounderDetails(this.userId, this.founderVerifyId);
    }
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
      this.investorOppList = data.investmnetopportunityList;
      this.documentList = data.founderInvestorDocumentList;
    });
  }
  ///download file
  public downloadDocument(userId, documentId,fileName) {
    this.appService.downloadById("api/FounderInvestorDocument/DownloadDocumentByUserId/", userId + '/' + documentId).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: data.type });
      saveAs(blob, fileName); 
    });
  }
}
