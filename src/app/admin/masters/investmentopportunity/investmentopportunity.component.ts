import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvestmentOpportunityModel } from './InvestmentOpportunity.Model';

@Component({
  selector: 'app-investmentopportunity',
  templateUrl: './investmentopportunity.component.html',
  styleUrls: ['./investmentopportunity.component.css']
})
export class InvestmentopportunityComponent implements OnInit {
  public form: FormGroup;
  private sub: any;
  userId: number;
  IsShowButton: boolean;
  founderVerifyId: number;
  uploadForm = new FormGroup({
    SalesFee: new FormControl('', [Validators.required]),
    ExpectedSharePrice: new FormControl('', [Validators.required]),
    MinimumInvestmentSize: new FormControl('', [Validators.required]),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private location: Location, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }


  closeDialog() {
    this.dialog.closeAll(); // <- Close the mat dialog
  }

  ngOnInit(): void {
    this.userId = this.data.userId;
    this.founderVerifyId = this.data.founderVerifyId;
    this.getOpportunityById(this.userId);
  }
  //On Submit
  public onSubmit(value: Object): void {
    if (this.uploadForm.valid) {
      this.investorOpportunity(value);
    }
  }
  //validation by Number
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  ///Get Investment Opportunity By userId
  getOpportunityById(userId): void {
    this.appService.getById('api/InvestmentOpportunityDetails/GetInvestmentOpportunityById/', userId).subscribe((data: any) => {
      this.uploadForm.controls['SalesFee'].setValue(data.salesFee);
      this.uploadForm.controls['ExpectedSharePrice'].setValue(data.expectedSharePrice);
      this.uploadForm.controls['MinimumInvestmentSize'].setValue(data.minimumInvestmentSize);
      if (data.salesFee != null) {
        this.IsShowButton = false;
      } else {
        this.IsShowButton = true;
      }
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //Add Investment Opportunity
  public investorOpportunity(formdata) {
    let investmentOpportunityModel1: InvestmentOpportunityModel = {
      UserId: this.userId,
      FounderVerifyId: this.founderVerifyId,
      SalesFee: formdata.SalesFee,
      MinimumInvestmentSize: formdata.MinimumInvestmentSize,
      ExpectedSharePrice: formdata.ExpectedSharePrice,
    }
    this.appService.add('api/InvestmentOpportunityDetails/InvestmentOpportunity', investmentOpportunityModel1).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.closeDialog();
        this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}
