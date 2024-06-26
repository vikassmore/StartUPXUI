import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FundingModel } from '../../masters/funding/listfunding/Funding.Model';
import { FundingDetailsModel } from './FundingDetailsetails.Model';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-addfundingdetails',
  templateUrl: './addfundingdetails.component.html',
  styleUrls: ['./addfundingdetails.component.css'],
  providers: [DatePipe],
})
export class AddfundingdetailsComponent implements OnInit {

  gridsize: number = 30;
  updateSetting(event) {
    this.gridsize = event.value;
  }

  public form: FormGroup;
  fundingDetailsId: string | any;
  private sub: any;
  funding: any = [];
  uploadForm = new FormGroup({
    fundingId: new FormControl('', [Validators.required]),
    //seriesName:new FormControl('', [Validators.required]),
    shareClass: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    dateFinancing: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    sharesOutstanding: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    issuePrice: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    conversionPrice: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    totalFinancingSize: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    liquidationPreference: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    liquidityRank: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    dividendRate: new FormControl(''),
    dividendType: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    votesPerShare: new FormControl('', [Validators.maxLength(100)]),
    redemptionRights: new FormControl('', [Validators.maxLength(100)]),
    convertibleToOnPublicListing: new FormControl('', Validators.maxLength(100)),
    participatingPreferred: new FormControl('', [Validators.maxLength(100)]),
    qualifiedIpo: new FormControl('', [Validators.maxLength(200)]),
    otherKeyProvisions: new FormControl('', [Validators.maxLength(200)]),
    isActive: new FormControl(true)
  });
  isAddMode!: boolean;
  submitted = false;

  constructor(public datepipe: DatePipe, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.isAddMode = !this.fundingDetailsId;
    this.GetFunding();

  }
  //validation by Number
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (((charCode != 46 && charCode < 48) || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  //On Submit
  public onSubmit(value: Object): void {
    if (this.uploadForm.valid) {
      if (this.isAddMode) {
        this.addfundingdetails(value);
      }
    }
  }
  // Get Funding 
  public GetFunding() {
    this._authService.getFundingById("api/Funding").subscribe((data: any) => {
      this.funding = data;
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //Add user in startupdetails
  private addfundingdetails = (fundingDetailsFormData) => {
    if (this.fundingDetailsId == null) {
      fundingDetailsFormData.FundingDetailsId = 0;
      let fundingDetailsmodel1: FundingDetailsModel = {
        FundingDetailsId: fundingDetailsFormData.FundingDetailsId,
        FundingId: fundingDetailsFormData.fundingId,
        ShareClass: fundingDetailsFormData.shareClass,
        DateFinancing: fundingDetailsFormData.dateFinancing,
        SharesOutstanding: fundingDetailsFormData.sharesOutstanding,
        IssuePrice: fundingDetailsFormData.issuePrice,
        ConversionPrice: fundingDetailsFormData.conversionPrice,
        TotalFinancingSize: fundingDetailsFormData.totalFinancingSize,
        LiquidationPreference: fundingDetailsFormData.liquidationPreference,
        LiquidityRank: fundingDetailsFormData.liquidityRank,
        DividendRate: this.gridsize.toString(),
        DividendType: fundingDetailsFormData.dividendType,
        VotesPerShare: fundingDetailsFormData.votesPerShare,
        RedemptionRights: fundingDetailsFormData.redemptionRights,
        ConvertibleToOnPublicListing: fundingDetailsFormData.convertibleToOnPublicListing,
        ParticipatingPreferred: fundingDetailsFormData.participatingPreferred,
        QualifiedIpo: fundingDetailsFormData.qualifiedIpo,
        OtherKeyProvisions: fundingDetailsFormData.otherKeyProvisions,
        IsActive: true,

      }
      this.appService.add('api/FundingDetails/AddFunding', fundingDetailsmodel1).subscribe((response) => {
        if (!Number.isNaN(response)) {
          if (response == "Record Saved Successfully.") {
            this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['/admin/startup/fundingdetails'], { relativeTo: this.route });
          } else {
            this.snackBar.open(response, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          }
        } else {
          this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      }, error => {
        this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });
    }
  }
}
