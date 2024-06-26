import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { InvestmentModel } from './Investment.Model';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-investmentdetails',
  templateUrl: './investmentdetails.component.html',
  styleUrls: ['./investmentdetails.component.css']
})
export class InvestmentdetailsComponent implements OnInit {
  private sub: any;
  userId: string | any;
  buttenDisabled: boolean;
  investmentStage: string[] = [];
  investmentSector: string[] = [];
  investmentAmount: any | string;
  SectorList: [];
  sectorname: string | any;
  investmentACheck: string;
  public selectedSector: any;
  uploadForm = new FormGroup({
    investmentStage: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    investmentAmount: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    Seed: new FormControl('', [Validators.required]),
    investSector: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    Preseed: new FormControl('', [Validators.required]),
    Angel: new FormControl('', [Validators.required]),
    EarlyStage: new FormControl('', [Validators.required]),
    GrowthStage: new FormControl('', [Validators.required]),
    LateStage: new FormControl('', [Validators.required]),
    investmentId: new FormControl('', [Validators.required]),
  });
  isAddMode!: boolean;
  submitted = false;
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != 'undefined' || this.userId != 0) {
      this.getprimaryinvestmentDeatails(this.userId);
    }
    this.buttenDisabled = false;
    this.getSectorMaster();
  }

  public onInvestmentSubmit() {
    this.addinvestment();
  }

  //Validation for enter only number for mobile no
  keyPressNumbers($event) {
    var charCode = ($event.which) ? $event.which : $event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      $event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  //Investment stage select
  public onCheckBoxCategory(e) {
    if (e.target.checked) {
      this.investmentStage.push(e.target.value);
      if (this.investmentStage.length != 0 && this.investmentSector.length != 0 && this.investmentACheck != "" && this.investmentACheck != undefined) {
        this.buttenDisabled = false;
      }
    }
    else {
      const index = this.investmentStage.indexOf(e.target.value);
      this.investmentStage.splice(index, 1);
      if (this.investmentStage.length == 0) {
        this.buttenDisabled = true;
      }
    }
  }
  //Investment sector select
  public onSelectionChange(e) {
    this.investmentSector = e.value;
    if (this.investmentStage.length != 0 && this.investmentSector.length != 0 && this.investmentACheck != "" && this.investmentACheck != undefined) {
      this.buttenDisabled = false;
    } else {
      this.buttenDisabled = true;
    }
  }
  //Get sector list
  public getSectorMaster() {
    this.appService.getAllSector("api/Sector").subscribe(data => {
      this.SectorList = data;
    });
  }
  //Investment amount enter
  public onTextChange(e) {
    this.investmentACheck = e.value;
    if (e.value != "" && e.value != undefined) {
      if (this.investmentStage.length != 0 && this.investmentSector.length != 0) {
        this.buttenDisabled = false;
      }
    } else {
      this.buttenDisabled = true;
    }
  }
  //Get Primary investment details by user
  public getprimaryinvestmentDeatails(userId) {
    this.appService.getAllById("api/InvestmentDetail/GetInvestmentDetailByuserId/", userId).subscribe((data: any) => {
      this.uploadForm.controls['investmentId'].setValue(data.investmentId);
      this.uploadForm.controls['investmentStage'].setValue(data.investmentStage);
      this.uploadForm.controls['investmentAmount'].setValue(data.investmentAmount);
      this.uploadForm.controls['investSector'].setValue(data.investmentSector.split(","));
      this.investmentACheck = data.investmentAmount;
      this.investmentSector = data.investmentSector;
      let investmentStag = [];
      investmentStag = data.investmentStage.split(',');
      for (let i = 0; i < investmentStag.length; i++) {
        this.uploadForm.controls[investmentStag[i]].setValue(true);
        this.investmentStage.push(investmentStag[i]);
      }
    });
  }
  //upadte InvestmentDetail
  private addinvestment() {
    var formData = new FormData();
    formData.append('investmentId', this.uploadForm.value.investmentId);
    formData.append('investmentStage', this.investmentStage.toString());
    formData.append('investmentSector', this.investmentSector.toString());
    formData.append('investmentAmount', this.uploadForm.value.investmentAmount);
    formData.append('loggedUserId', this.userId);
    this.appService.edit('api/InvestmentDetail/Edit', formData).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open('Investment Details Updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/investor/investmentprofile'], { relativeTo: this.route });
      }
      else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

    });
  }
}

