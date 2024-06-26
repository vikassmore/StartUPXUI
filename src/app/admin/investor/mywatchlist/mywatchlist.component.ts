import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-mywatchlist',
  templateUrl: './mywatchlist.component.html',
  styleUrls: ['./mywatchlist.component.css'],
  providers: [DecimalPipe],
})
export class MywatchlistComponent implements OnInit {
  watchList: any = [];
  public watchDataList: any = [];
  public title: any;
  onWatchList: boolean;
  userId: any;
  public page: any;
  public count = 10;
  constructor(public appService: AppService, public snackBar: MatSnackBar, private tokenStorage: TokenStorageService, private route: ActivatedRoute, private sanitizer: DomSanitizer, public dialog: MatDialog,private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != undefined || this.userId > 0) {
      this.onWatchList = true;
      this.getinvestorInvestmentById(this.onWatchList, this.userId);
    }
  }
  ///pagination
  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getinvestorInvestmentById(this.onWatchList, this.userId);
    }
    else {
      this.watchList = this.watchDataList.filter(res => {
        return (
          res.startupDeatailModel.startUpName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.startupDeatailModel.sectorName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  //Get comapnise added as on Watch by User
  public getinvestorInvestmentById(onWatchList, userId) {
    this.appService.getAllByonwatch("api/InvestorInvestment/GetAllInvestmentOnWatch/" + onWatchList + "/" + userId).subscribe(data => {
      this.watchDataList = data.map(p => ({
        investorInvestmentId: p.investorInvestmentId,
        founderVerifyId: p.founderModelDetails.founderVerifyId,
        investorUserId: p.investorUserId,
        onWatchList: p.onWatchList,
        gaugingAmount: p.founderModelDetails.gaugingAmount,
        userId: p.founderModelDetails.userId,
        lastRoundPrice: this.decimalPipe.transform(p.founderModelDetails.lastRoundPrice),
        lastValuation: this.decimalPipe.transform(p.founderModelDetails.lastValuation),
        addedOn: p.cretedDate,
        startupDeatailModel: {
          startupId: p.founderModelDetails.startupDeatailModel.startupId,
          startUpName: p.founderModelDetails.startupDeatailModel.startUpName,
          address: p.founderModelDetails.startupDeatailModel.address,
          countryId: p.founderModelDetails.startupDeatailModel.countryId,
          stateId: p.founderModelDetails.startupDeatailModel.stateId,
          cityId: p.founderModelDetails.startupDeatailModel.cityId,
          foundingYear: p.founderModelDetails.startupDeatailModel.foundingYear,
          companyDescription: p.founderModelDetails.startupDeatailModel.companyDescription,
          websiteUrl: p.founderModelDetails.startupDeatailModel.websiteUrl,
          previewUrl: this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + p.founderModelDetails.startupDeatailModel.logo),
          logoFileName: p.founderModelDetails.startupDeatailModel.logoFileName,
          employeeCount: p.founderModelDetails.startupDeatailModel.employeeCount,
          sectorId: p.founderModelDetails.startupDeatailModel.sectorId,
          sectorName: p.founderModelDetails.startupDeatailModel.sectorName,
          companyEmailId: p.founderModelDetails.startupDeatailModel.companyEmailId,
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
        //   fundingDetail:p.founderModelDetails.fundingModelDetails.map(y=>({
        //     fundingDetailsId : y.fundingModelDetailsId,
        //     fundingId : y.fundingId,
        //     seriesName : y.seriesName,
        //     shareClass : y.shareClass,
        //     dateFinancing : y.dateFinancing,
        //     sharesOutstanding : y.sharesOutstanding,
        //     issuePrice : y.issuePrice,
        //     conversionPrice : y.conversionPrice,
        //     totalFinancingSize : y.totalFinancingSize,
        //     liquidityRank : y.liquidityRank,
        //     liquidationPreference : y.liquidationPreference,
        //     dividendRate : y.dividendRate,
        //     dividendType : y.dividendType,
        //     votesPerShare : y.votesPerShare,
        //     redemptionRights : y.redemptionRights,
        //     convertibleToOnPublicListing : y.convertibleToOnPublicListing,
        //     participatingPreferred : y.participatingPreferred,
        //     qualifiedIpo : y.qualifiedIpo,
        //     qtherKeyProvisions : y.qtherKeyProvisions,
        //   })),
      }));
      this.watchList = this.watchDataList;
    });
  }
  //Remove company from watch list
  public deletefromwatchList(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want remove this?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const index: number = this.watchList.indexOf(item);
        if (index !== -1) {
          this.watchList.splice(index, 1);
          this.appService.deleteById(`api/InvestorInvestment?investorInvestmentId=${item.investorInvestmentId}`, {}).subscribe(data => {
          });
        }
      }
    });
  }
}
