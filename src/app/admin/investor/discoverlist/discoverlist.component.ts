import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Enum } from './Enum';
import { DomSanitizer } from '@angular/platform-browser';
import { DecimalPipe } from '@angular/common';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-discoverlist',
  templateUrl: './discoverlist.component.html',
  styleUrls: ['./discoverlist.component.css'],
  providers: [DecimalPipe, DatePipe],
})
export class DiscoverlistComponent implements OnInit {
  value = '';
  searchText: any;
  labelName: string;
  public IsShow1: boolean = true;
  live: boolean;
  preview: boolean;
  public IsShow2: boolean;
  public IsShow3: boolean;
  public StartUpName: any;
  public SectorName: any;
  public InvestorName: any;
  hide = true;
  userId: any;
  onWatchList: boolean;
  showDiv = {
    previous: false,
    current: false,
    next: false
  }
  public items: any;
  startupId: string | any;
  isAddMode!: boolean;
  startupDetails: any = [];
  startupDetailsData: any = [];
  watchList: any = [];
  investmentDataList: any = [];
  today: any;
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private decimalPipe: DecimalPipe, private tokenStorage: TokenStorageService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.today = new Date();
    this.isAddMode = !this.startupId;
    this.live = true;
    this.preview = false;
    this.getLivePreviewFounders(this.live, this.preview);
    this.userId = this.tokenStorage.getUser().userId;
    this.onWatchList = true;
    this.getinvestorwatchById(this.onWatchList, this.userId);
    this.getinvestorInvestmentById(this.userId);

  }

  //******************Filters**************************************************************//
  //Search filter
  Search() {
    if (this.StartUpName == "") {
      this.startupDetails = this.startupDetailsData;
    }
    else {
      this.startupDetails = this.startupDetailsData.filter(res => {
        return res.startupName.toLocaleLowerCase().includes(this.StartUpName.toLocaleLowerCase());
      });
    }
  }
  //Clear searxh text box
  myClearFunction() {
    this.startupDetails = this.startupDetailsData;
  }
  //Industory search filter
  SearchIndustoryGroup() {
    if (this.SectorName == "") {
      this.startupDetails = this.startupDetailsData;
    }
    else {
      this.startupDetails = this.startupDetailsData.filter(res => {
        return res.startupDeatailModel.sectorName.toLocaleLowerCase().includes(this.SectorName.toLocaleLowerCase());
      });
    }
  }
  //Watch list filter
  public onCheckBoxwatch(e) {
    if (e.checked) {
      this.startupDetails = this.startupDetailsData.filter(o1 => {
        return (this.watchList.some(element => o1.founderVerifyId === element.founderVerifyId))
      });
    }
    else {
      this.startupDetails = this.startupDetailsData;
    }
  }
  //Portfolio list filter
  public onCheckBoxPortfolio(e) {
    if (e.checked) {
      this.startupDetails = this.startupDetailsData.filter(o1 => {
        return (this.investmentDataList.some(element => o1.founderVerifyId === element.founderVerifyId))
      });
    }
    else {
      this.startupDetails = this.startupDetailsData;
    }
  }
  //New Founder list filter
  public onCheckBoxNewFounder(e) {
    if (e.checked) {
      this.startupDetails = this.startupDetailsData.filter(res => {
        return res.newFounder == true
      })
    }
    else {
      this.startupDetails = this.startupDetailsData;
    }
  }
  //Sorting filters
  public onSortChange(e) {
    if (e.value === "Discount High") {
      this.startupDetails.sort((a, b) => {
        return Number(b.discountValuation) - Number(a.discountValuation);
      })
    } else if (e.value === "Valuation High") {
      this.startupDetails.sort((a, b) => {
        return Number(b.lastValuation) - Number(a.lastValuation);
      })
    }
    else if (e.value === "Valuation Low") {
      this.startupDetails.sort((a, b) => {
        return Number(a.lastValuation) - Number(b.lastValuation);
      })
    }
    else if (e.value === "Age High") {
      this.startupDetails.sort((a, b) => {
        return Number(a.startupDeatailModel.foundingYear) - Number(b.startupDeatailModel.foundingYear);
      })
    } else if (e.value === "Age Low") {
      this.startupDetails.sort((a, b) => {
        return Number(b.startupDeatailModel.foundingYear) - Number(a.startupDeatailModel.foundingYear);
      })
    } else if (e.value === "A-Z") {
      this.startupDetails.sort((a, b) => {
        return a.startupDeatailModel.startUpName.localeCompare(b.startupDeatailModel.startUpName);
      })
    } else if (e.value === "Z-A") {
      this.startupDetails.sort((a, b) => {
        return b.startupDeatailModel.startUpName.localeCompare(a.startupDeatailModel.startUpName);
      })
    }
    else {
      this.getData();
    }
  }
  //Filters data by Discount on last Valuation
  public onCheckBoxDiscountLast(e) {
    if (e.checked) {
      if (e.source.value == "40") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return (Number(res.lastValuation) - Number(res.secondLastValuation)) * 100 > 40
        })
      } else if (e.source.value == "20 to 40") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return ((Number(res.lastValuation) - Number(res.secondLastValuation)) * 100 >= 20 &&
            (Number(res.lastValuation) - Number(res.secondLastValuation)) * 100 <= 40)
        })
      } else if (e.source.value == "0 to 20") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return ((Number(res.lastValuation) - Number(res.secondLastValuation)) * 100 >= 0 &&
            (Number(res.lastValuation) - Number(res.secondLastValuation)) * 100 <= 20)
        })
      } else if (e.source.value == "0") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return (Number(res.lastValuation) - Number(res.secondLastValuation)) * 100 == 0
        })
      }
    }
    else {
      this.startupDetails = this.startupDetailsData;
    }
  }
  //Filters data by last valuation
  public onCheckBoxLast(e) {
    if (e.checked) {
      if (e.source.value == "500") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return Number(res.lastValuation) == Number(0.5)
        })
      } else if (e.source.value == "500 to 1") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return ((Number(res.lastValuation) >= Number(0.5)) &&
            (Number(res.lastValuation) <= Number(1)))
        })
      } else if (e.source.value == "1 to 5") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return ((Number(res.lastValuation) >= Number(1)) &&
            (Number(res.lastValuation) <= Number(5)))
        })
      } else if (e.source.value == "5") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return (Number(res.lastValuation) > Number(5))
        })
      }
    }
    else {
      this.startupDetails = this.startupDetailsData;
    }
  }
  //Filters data by Security Type
  public onCheckBoxSecurityType(e) {
    if (e.checked) {
      if (e.source.value == "Common Stock") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return res.fundingModelDetails.shareClass == "Common Stock"
        })
      } else if (e.source.value == "Preferred Stock") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return res.fundingModelDetails.shareClass == "Preferred Stock"
        })
      }
    }
    else {
      this.startupDetails = this.startupDetailsData;
    }
  }
  //Filters data by Total funding
  public onCheckBoxTotalFunding(e) {
    if (e.checked) {
      if (e.source.value == "Less than 50") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return Number(res.gaugingAmount) < Number(50)
        })
      } else if (e.source.value == "50 to 100") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return ((Number(res.gaugingAmount) >= Number(50)) &&
            (Number(res.gaugingAmount) <= Number(100)))
        })
      } else if (e.source.value == "100 to 250") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return ((Number(res.lastValuation) >= Number(100)) &&
            (Number(res.lastValuation) <= Number(250)))
        })
      } else if (e.source.value == "Greater than 250") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return Number(res.lastValuation) > Number(250)
        })
      }
    }
    else {
      this.startupDetails = this.startupDetailsData;
    }
  }
  //Filters data by Company age
  public onCheckBoxCompanyAge(e) {
    var today = new Date();
    if (e.checked) {
      if (e.source.value == "Less than 5") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return (Number(today.getFullYear()) - Number(res.startupDeatailModel.foundingYear)) < 5
        })
      } else if (e.source.value == "5 to 8") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return ((Number(today.getFullYear()) - Number(res.startupDeatailModel.foundingYear)) >= 5 &&
            (Number(today.getFullYear()) - Number(res.startupDeatailModel.foundingYear)) <= 8)
        })
      } else if (e.source.value == "8 to 10") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return ((Number(today.getFullYear()) - Number(res.startupDeatailModel.foundingYear)) >= 8 &&
            (Number(today.getFullYear()) - Number(res.startupDeatailModel.foundingYear)) <= 10)
        })
      } else if (e.source.value == "Greater than 10") {
        this.startupDetails = this.startupDetailsData.filter(res => {
          return (Number(today.getFullYear()) - Number(res.startupDeatailModel.foundingYear)) > 10
        })
      }
    }
    else {
      this.startupDetails = this.startupDetailsData;
    }
  }
  //Investor search filter
  SearchInvestorName() {
    if (this.InvestorName == "") {
      this.startupDetails = this.startupDetailsData;
    }
    else {
      this.startupDetails = this.startupDetailsData.filter(res => {
        return res.NotableInvestorName?.toLocaleLowerCase().includes(this.InvestorName.toLocaleLowerCase());
      });
    }
  }
  //Get the Live/Preview startups
  public getLivePreviewFounders(live, preview) {
    this.appService.getAllById("api/InvestorVerification/GetAllLivePreviewStartupDetails/", live + "/" + preview).subscribe(data => {
      this.startupDetailsData = data.map(p => ({
        founderVerifyId: p.founderVerifyId,
        startupName: p.startupName,
        gaugingAmount: p.gaugingAmount != null ? this.decimalPipe.transform((p.gaugingAmount) / 1000000) : p.gaugingAmount,
        verified: p.verified,
        live: p.live,
        preview: p.preview,
        comment: p.comment,
        userId: p.userId,
        newFounder: p.newFounder,
        raiseFunding: p.raiseFunding,
        gaugingPercentage: (p.gaugingPercentage * 100) / p.gaugingAmount,
        lastRoundPrice: p.lastRoundPrice,
        lastValuation: this.decimalPipe.transform((p.lastValuation) / 1000),
        secondLastValuation: this.decimalPipe.transform((p.secondLastValuation) / 1000),
        discountValuation: this.decimalPipe.transform((p.lastValuation - p.secondLastValuation) / 1000),
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
        })),
        invOpportunityModel: p.investmnetopportunity,
        fundingModelDetails: p.fundingModelDetails,
        investorList: p.investorInvestmentList,
        NotableInvestorName: p.notableInvestorName,
      }));
      this.startupDetails = this.startupDetailsData;
    });
  }
  //Tab change
  selectedTabValue(changeEvent: MatTabChangeEvent) {
    this.labelName = changeEvent.tab.textLabel;
    if (this.labelName == Enum.StateName.Live) {
      this.live = true;
      this.preview = false;
      this.getLivePreviewFounders(this.live, this.preview);
    }
    else if (this.labelName == Enum.StateName.Preview) {
      this.live = false;
      this.preview = true;
      this.getLivePreviewFounders(this.live, this.preview);
    }
    else if (this.labelName == Enum.StateName.All) {
      this.live = true;
      this.preview = true;
      this.getLivePreviewFounders(this.live, this.preview);
    }
  }
  //Get investor watch list by UserId
  public getinvestorwatchById(onWatchList, userId) {
    this.appService.getAllByonwatch("api/InvestorInvestment/GetAllInvestmentOnWatch/" + onWatchList + "/" + userId).subscribe(data => {
      this.watchList = data;
    });
  }
  //Get investor invested by UserId
  public getinvestorInvestmentById(userId) {
    this.appService.getAllById("api/InvestorInvestment/GetAllInvestmentById/", userId).subscribe(data => {
      this.investmentDataList = data;
    });
  }
  //Comman function for the get data
  public getData() {
    if (this.labelName == Enum.StateName.Live) {
      this.live = true;
      this.preview = false;
      this.getLivePreviewFounders(this.live, this.preview);
    }
    else if (this.labelName == Enum.StateName.Preview) {
      this.live = false;
      this.preview = true;
      this.getLivePreviewFounders(this.live, this.preview);
    }
    else if (this.labelName == Enum.StateName.All) {
      this.live = true;
      this.preview = true;
      this.getLivePreviewFounders(this.live, this.preview);
    } else {
      this.live = true;
      this.preview = false;
      this.getLivePreviewFounders(this.live, this.preview);
    }
  }
}
