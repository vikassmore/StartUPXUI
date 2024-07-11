import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { verify } from 'crypto';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Enum } from './Enum';
import { VerificationInvestorModel } from './VerificationInvestor.Model';
import { MatDialog } from '@angular/material/dialog';
import { Notapprove1Component } from '../notapprove1/notapprove1.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-listinvestor',
  templateUrl: './listinvestor.component.html',
  styleUrls: ['./listinvestor.component.css']
})
export class ListinvestorComponent implements OnInit {
  formType: string | any;
  public investorList: [];
  public investorDataList: any = [];
  public title: any;
  verified: boolean | any;
  type: string | any;
  public page: any;
  public count = 10;
  constructor(public dialog: MatDialog, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private sanitizer: DomSanitizer) { }


  openDialog(userId, investorVerifyId): void {
    const dialogRef = this.dialog.open(Notapprove1Component, {
      width: '120vh',
      data: { userId: userId, investorVerifyId: investorVerifyId }
    });
  }

  ngOnInit(): void {
    this.getAll();
  }
  ///pagination
  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }
  //Get All Investor
  public getAll() {
    this.formType = this.route.snapshot.params['id'];
    if (this.formType == Enum.FormTypeId.Verified) {
      this.type = "VERIFIED";
      this.verified = true;
      this.getVerifiedNonVerifiedInvestor(this.verified);
    }
    else if (this.formType == Enum.FormTypeId.Nonverified) {
      this.type = "NON VERIFIED";
      this.verified = false;
      this.getVerifiedNonVerifiedInvestor(this.verified);
    }
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getAll();
    }
    else {
      this.investorList = this.investorDataList.filter(res => {
        return (
          res.investorDetailModel.firstName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.investorDetailModel.emailId.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  //Get the Verified/NonVerified investor
  public getVerifiedNonVerifiedInvestor(verified) {
    this.appService.getAllById("api/InvestorVerification/GetAllVerifiedDetails/", verified).subscribe(data => {
      this.investorDataList = data.map(p => ({
        investorVerifyId: p.investorVerifyId,
        verified: p.verified,
        isActive: p.isActive,
        userId: p.userId,
        sendForVerification: p.sendForVerification,
        investorDetailModel: {
          investorId: p.investorDetailModel.investorId,
          profileType: p.investorDetailModel.profileType,
          firstName: p.investorDetailModel.firstName,
          lastName: p.investorDetailModel.lastName,
          emailId: p.investorDetailModel.emailId,
          mobileNo: p.investorDetailModel.mobileNo,
          logoFileName: p.investmentDeatail.profilePhotoFileName,
          founderTypeId: p.investorDetailModel.founderTypeId,
          countryId: p.investorDetailModel.countryId,
          stateId: p.investorDetailModel.stateId,
          cityId: p.investorDetailModel.cityId,
          zipCode: p.investorDetailModel.zipCode,
          address1: p.investorDetailModel.address1,
          address2: p.investorDetailModel.address2,
          isActive: p.investorDetailModel.isActive,
        },
        investmentDeatail: {
          investmentId: p.investmentDeatail.investmentId,
          investmentStage: p.investmentDeatail.investmentStage,
          investmentSector: p.investmentDeatail.investmentSector,
          investmentAmount: p.investmentDeatail.investmentAmount,
        }
      }));
      this.investorList = this.investorDataList;
    });
  }
  //Approve investor
  public approveInvestor(userId, investorVerifyId) {
    let verificationInvestorModel1: VerificationInvestorModel = {
      UserId: userId,
      InvestorVerifyId: investorVerifyId,
      SendForVerification: true,
      Verified: true,
      Comment: null,
      IsActive: true,
    }
    this.appService.add('api/InvestorVerification/VerificationApprove', verificationInvestorModel1).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.getAll();
        this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}
