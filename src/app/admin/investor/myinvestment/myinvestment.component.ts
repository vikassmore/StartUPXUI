import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { DecimalPipe } from '@angular/common';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Enum } from './Enum';

@Component({
  selector: 'app-myinvestment',
  templateUrl: './myinvestment.component.html',
  styleUrls: ['./myinvestment.component.css'],
  providers: [DecimalPipe],
})
export class MyinvestmentComponent implements OnInit {
  selected = "Latest First";
  userId: string | any;
  investmentList: any = [];
  public investmentDataList: any = [];
  public title: any;
  ongoingInvestmentAmountSum: string;
  closedInvestmentAmountSum: string;
  exitedInvestmentAmountSum: string;
  ongoingCount: string;
  closedCount: string;
  exitedCount: string;
  value = '';
  labelIndex: number;
  isExisted: boolean;
  constructor(public appService: AppService, public snackBar: MatSnackBar, private tokenStorage: TokenStorageService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != undefined || this.userId > 0) {
      this.getinvestorInvestmentById(this.userId);
    }
  }
  //Tab change
  selectedTabValue(changeEvent: MatTabChangeEvent) {
    this.labelIndex = changeEvent.index;
    if (this.labelIndex == Enum.StateName.Ongoing) {
      this.investmentList = this.investmentDataList;
      this.ongoingCount = this.investmentList.length;
      this.ongoingInvestmentAmountSum = this.investmentList.map(a => a.investmentAmount).reduce(function (a, b) {
        return Number(a) + Number(b);
      });
    }
    else if (this.labelIndex == Enum.StateName.Closed) {
      this.investmentList = this.investmentDataList;
      this.closedCount = this.investmentList.length;
      this.closedInvestmentAmountSum = this.investmentList.map(a => a.investmentAmount).reduce(function (a, b) {
        return Number(a) + Number(b);
      });
    }
    else if (this.labelIndex == Enum.StateName.Exited) {
      this.investmentList = this.investmentDataList;
      this.exitedCount = this.investmentList.length;
      if (this.exitedCount != null) {
        this.isExisted = true;
      } else {
        this.isExisted = false;
      }
      this.exitedInvestmentAmountSum = this.investmentList.map(a => a.investmentAmount).reduce(function (a, b) {
        return Number(a) + Number(b);
      });
    }
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.investmentList = this.investmentDataList;
    }
    else {
      this.investmentList = this.investmentDataList.filter(res => {
        return (
          res.startupDeatailModel.startUpName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.startupDeatailModel.sectorName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  //Clear searxh text box
  myClearFunction() {
    this.investmentList = this.investmentDataList;
  }
  //Sorting filters
  public onSortChange(e) {
    if (e.value === "Oldest") {
      this.investmentList.sort((a, b) => {
        return Number(b.discountValuation) - Number(a.discountValuation);
      })
    } else if (e.value === "High Invest Amount") {
      this.investmentList.sort((a, b) => {
        return Number(b.investmentAmount) - Number(a.investmentAmount);
      })
    }
    else if (e.value === "Low Invest Amount") {
      this.investmentList.sort((a, b) => {
        return Number(a.investmentAmount) - Number(b.investmentAmount);
      })
    }
    else {
      this.getinvestorInvestmentById(this.userId);
    }
  }
  //Get the Live/Preview startups
  public getinvestorInvestmentById(userId) {
    this.appService.getAllById("api/InvestorInvestment/GetAllInvestmentById/", userId).subscribe(data => {
      this.investmentDataList = data.map(p => ({
        investorInvestmentId: p.investorInvestmentId,
        investmentAmount: p.investmentAmount,
        investmentRound: p.investmentRound,
        indicateInterest: p.indicateInterest,
        founderVerifyId: p.founderVerifyId,
        investorUserId: p.investorUserId,
        investmentDate: p.cretedDate,
        isActive: p.isActive,
        onWatchList: p.onWatchList,
        gaugingAmount: this.decimalPipe.transform((p.founderModelDetails.gaugingAmount) / 1000000),
        verified: p.founderModelDetails.verified,
        live: p.founderModelDetails.live,
        preview: p.founderModelDetails.preview,
        comment: p.founderModelDetails.comment,
        userId: p.founderModelDetails.userId,
        gaugingPercentage: (p.founderModelDetails.gaugingPercentage * 100) / p.founderModelDetails.gaugingAmount,
        lastRoundPrice: p.founderModelDetails.lastRoundPrice,
        lastValuation: this.decimalPipe.transform((p.founderModelDetails.lastValuation) / 1000000),
        startupDeatailModel: {
          startupId: p.founderModelDetails.startupDeatailModel.startupId,
          startUpName: p.founderModelDetails.startupDeatailModel.startUpName,
          address: p.founderModelDetails.startupDeatailModel.address,
          countryId: p.founderModelDetails.startupDeatailModel.countryId,
          stateId: p.founderModelDetails.startupDeatailModel.stateId,
          cityId: p.founderModelDetails.startupDeatailModel.cityId,
          startYear: p.founderModelDetails.startupDeatailModel.startYear,
          companyDescription: p.founderModelDetails.startupDeatailModel.companyDescription,
          websiteUrl: p.founderModelDetails.startupDeatailModel.websiteUrl,
          previewUrl: this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + p.founderModelDetails.startupDeatailModel.logo),
          logoFileName: p.founderModelDetails.startupDeatailModel.logoFileName,
          employeeCount: p.founderModelDetails.startupDeatailModel.employeeCount,
          sectorId: p.founderModelDetails.startupDeatailModel.sectorId,
          sectorName: p.founderModelDetails.startupDeatailModel.sectorName,
          foundingDate: p.founderModelDetails.startupDeatailModel.foundingDate,
          companyLegalName: p.founderModelDetails.startupDeatailModel.companyLegalName,
          companyHeadquartersAddress: p.founderModelDetails.startupDeatailModel.companyHeadquartersAddress,
          companyContact: p.founderModelDetails.startupDeatailModel.companyContact,
          serviceDescription: p.founderModelDetails.startupDeatailModel.serviceDescription,
          businessModel: p.founderModelDetails.startupDeatailModel.businessModel,
          targetCustomerBase: p.founderModelDetails.startupDeatailModel.targetCustomerBase,
          targetMarket: p.founderModelDetails.startupDeatailModel.targetMarket,
          managementInfo: p.founderModelDetails.startupDeatailModel.managementInfo,
          isStealth: p.founderModelDetails.startupDeatailModel.isStealth,
          isActive: p.founderModelDetails.startupDeatailModel.isActive,
        },
        founderDeatail: p.founderModelDetails.founderDeatail.map(x => ({
          founderId: x.founderId,
          firstName: x.firstName,
          lastName: x.lastName,
          emailId: x.emailId,
          mobileNo: x.mobileNo,
          gender: x.gender,
          description: x.description,
        })),
        fundingDetails: {
          fundingDetailsId: p.founderModelDetails.fundingModelDetails.fundingModelDetailsId,
          fundingId: p.founderModelDetails.fundingModelDetails.fundingId,
          seriesName: p.founderModelDetails.fundingModelDetails.seriesName,
          shareClass: p.founderModelDetails.fundingModelDetails.shareClass,
          dateFinancing: p.founderModelDetails.fundingModelDetails.dateFinancing,
          sharesOutstanding: p.founderModelDetails.fundingModelDetails.sharesOutstanding,
          issuePrice: p.founderModelDetails.fundingModelDetails.issuePrice,
          conversionPrice: p.founderModelDetails.fundingModelDetails.conversionPrice,
          totalFinancingSize: p.founderModelDetails.fundingModelDetails.totalFinancingSize,
          liquidityRank: p.founderModelDetails.fundingModelDetails.liquidityRank,
          liquidationPreference: p.founderModelDetails.fundingModelDetails.liquidationPreference,
          dividendRate: p.founderModelDetails.fundingModelDetails.dividendRate,
          dividendType: p.founderModelDetails.fundingModelDetails.dividendType,
          votesPerShare: p.founderModelDetails.fundingModelDetails.votesPerShare,
          redemptionRights: p.founderModelDetails.fundingModelDetails.redemptionRights,
          convertibleToOnPublicListing: p.founderModelDetails.fundingModelDetails.convertibleToOnPublicListing,
          participatingPreferred: p.founderModelDetails.fundingModelDetails.participatingPreferred,
          qualifiedIpo: p.founderModelDetails.fundingModelDetails.qualifiedIpo,
          qtherKeyProvisions: p.founderModelDetails.fundingModelDetails.qtherKeyProvisions,
        },
      }));
      this.investmentList = this.investmentDataList;
      this.ongoingCount = this.investmentList.length;
      this.ongoingInvestmentAmountSum = this.investmentList.map(a => a.investmentAmount).reduce(function (a, b) {
        return Number(a) + Number(b);
      });
    });
  }
}
