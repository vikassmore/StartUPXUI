import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { verify } from 'crypto';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { NotapproveComponent } from '../notapprove/notapprove.component';
import { GaugingdemandComponent } from '../gaugingdemand/gaugingdemand.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-listraisefunding',
  templateUrl: './listraisefunding.component.html',
  styleUrls: ['./listraisefunding.component.css']
})
export class ListraisefundingComponent implements OnInit {
  founderList: [];
  formType: string | any;
  public page: any;
  public count = 10;
  constructor(public dialog: MatDialog, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.formType = this.route.snapshot.params['id'];
    this.getAllFounderRaiseDetails();
  }
  ///pagination
  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }
  //Get the raise funding
  public getAllFounderRaiseDetails() {
    this.appService.getAll("api/FounderVerification/GetAllFounderRaiseDetails").subscribe(data => {
      this.founderList = data.map(p => ({
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
    });
  }
}
