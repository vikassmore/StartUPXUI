import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubmitInterestModel } from './SubmitInterest.Model';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-submitinterest',
  templateUrl: './submitinterest.component.html',
  styleUrls: ['./submitinterest.component.css']
})
export class SubmitinterestComponent implements OnInit {
  public form: FormGroup;
  private sub: any;
  investorUserId: number;
  founderVerifyId: number;
  loggedUserId: number;
  isVisible: boolean = true;
  userId: number;
  uploadForm = new FormGroup({
    indicateInterest: new FormControl('', [Validators.required]),

  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SubmitinterestComponent>, public dialog: MatDialog,private tokenStorage: TokenStorageService, private location: Location, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
   // this.userId = this.route.snapshot.params['id'];
    this.founderVerifyId = this.route.snapshot.params['id1'];
    this.loggedUserId = this.tokenStorage.getUser().userId;
    // this.founderVerifyId = this.route.snapshot.params['id1'];
    this.investorUserId = this.data.investorUserId;
    this.founderVerifyId = this.data.founderVerifyId;
    this.userId = this.data.userId;
   
  }
  closeForm() {
    this.dialogRef.close();
  }

  onButtonClick(value: Object): void {
    this.addIndicateInterest(value);
  }
  private addIndicateInterest = (Watchlistformdata) => {
  
    let submitinterestmodel: SubmitInterestModel = {
      onWatchList: true,
      investorInvestmentId: 0,
      investmentAmount: '',
      indicateInterest:  Watchlistformdata.indicateInterest,//this.form.get('indicateInterest')?.value || '',
      investmentRound: '',
      founderVerifyId: this.founderVerifyId,
      investorUserId: this.userId,
      loggedUserId:   this.loggedUserId,
      isActive: true,
     
    }
    this.appService.add('api/InvestorInvestment/AddIndicateInterest', submitinterestmodel).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open('Your Interest sent Successfully.', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        //this.router.navigate(['../companyinterest'], { relativeTo: this.route });
      }
      else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}
