import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VerificationInvestorModel } from '../listinvestor/VerificationInvestor.Model';

@Component({
  selector: 'app-notapprove1',
  templateUrl: './notapprove1.component.html',
  styleUrls: ['./notapprove1.component.css']
})
export class Notapprove1Component implements OnInit {
  public form: FormGroup;
  private sub: any;
  userId: number;
  investorVerifyId: number;
  uploadForm = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private location: Location, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  closeDialog() {
    this.dialog.closeAll(); // <- Close the mat dialog
  }

  ngOnInit(): void {
    this.userId = this.data.userId;
    this.investorVerifyId = this.data.investorVerifyId;
  }
  //On Submit
  public onSubmit(value: Object): void {
    if (this.uploadForm.valid) {
      this.notApproveInvestor(value);
    }
  }
  //Not Approve Investor
  public notApproveInvestor(formdata) {
    let verificationInvestorModel1: VerificationInvestorModel = {
      UserId: this.userId,
      InvestorVerifyId: this.investorVerifyId,
      SendForVerification: true,
      Verified: false,
      Comment: formdata.comment,
      IsActive: true,
    }
    this.appService.add('api/InvestorVerification/VerificationApprove', verificationInvestorModel1).subscribe((response) => {
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
