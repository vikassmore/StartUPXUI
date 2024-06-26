import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-fundingdetails',
  templateUrl: './fundingdetails.component.html',
  styleUrls: ['./fundingdetails.component.css'],
  providers: [DecimalPipe],
})
export class FundingdetailsComponent implements OnInit {
  public fundingList: any = [];
  public fundingDataList: any = [];
  public title: any;
  userId: string | any;
  panelOpenState = false;
  public page: any;
  public count = 10;
  constructor(public appService: AppService, private snackBar: MatSnackBar, private tokenStorage: TokenStorageService, private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != 'undefined' || this.userId != 0) {
      this.getFundingDeatails(this.userId);
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
      this.getFundingDeatails(this.userId);
    }
    else {
      this.fundingList = this.fundingDataList.filter(res => {
        return (
          res.seriesName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.shareClass.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  //Get funding list by user
  public getFundingDeatails(userId) {
    this.appService.getAllById("api/FundingDetails/GetAllFundingbyuserId/", userId).subscribe(data => {
      this.fundingDataList = data.map((y, index) => ({
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
      this.fundingList = this.fundingDataList;
    });

  }
}
