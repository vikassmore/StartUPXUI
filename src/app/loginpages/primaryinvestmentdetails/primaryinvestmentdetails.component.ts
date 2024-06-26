import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Enum } from './Enum';
import { PrimaryinvestmentDetailModel } from './PrimaryinvestmentDetail.Model';

@Component({
  selector: 'app-primaryinvestmentdetails',
  templateUrl: './primaryinvestmentdetails.component.html',
  styleUrls: ['./primaryinvestmentdetails.component.css']
})
export class PrimaryinvestmentdetailsComponent implements OnInit {
  private sub: any;
  buttenDisabled: boolean;
  buttenDisabled1: boolean;
  investmentStage: string[] = [];
  investmentSector: string[] = [];
  SectorList: [];
  investmentAmount: any | string;
  userId: any;
  uploadForm = new FormGroup({
    investmentAmount: new FormControl('', [Validators.required]),

  });
  isAddMode: boolean;
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      if (params['userId']) {
        this.userId = params['userId'];
      }
    });
    this.buttenDisabled = true;
    this.buttenDisabled1 = true;
    this.getSectorMaster();
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
  //On Submit
  public onSubmit() {
    this.primaryInvDetailAdd();
  }
  //Change investment stage
  private onCheckBoxCategory(e) {
    if (e.target.checked) {
      this.investmentStage.push(e.target.value);
      this.buttenDisabled = false;
      this.buttenDisabled1 = true;
    }
    else {
      const index = this.investmentStage.indexOf(e.target.value);
      this.investmentStage.splice(index, 1);
      if (this.investmentStage.length == 0) {
        this.buttenDisabled = true;
      }
    }
  }
  //Change investment sector
  private onSelectionChange(e) {
    this.investmentSector = e.value;
    if (this.investmentSector.length == 0) {
      this.buttenDisabled1 = true;
    } else {
      this.buttenDisabled1 = false;
    }
  }
  //Get sector list
  public getSectorMaster() {
    this.appService.getAllSector("api/Sector").subscribe(data => {
      this.SectorList = data;
    });
  }
  // Add Primary Investment Details
  private primaryInvDetailAdd() {
    var formData = new FormData();
    formData.append('investmentStage', this.investmentStage.toString());
    formData.append('investmentSector', this.investmentSector.join(",").toString());
    formData.append('investmentAmount', this.uploadForm.value.investmentAmount);
    formData.append('loggedUserId', this.userId);
    if (this.uploadForm.valid) {
      this.appService.addprimaryinvestmentdetails('api/InvestmentDetail/', formData).subscribe((response) => {
        if (!Number.isNaN(response)) {
          this.snackBar.open("Activation link is sent to your email address.Please check your inbox to activate account.", '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/']);
        } else {
          this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      }, error => {
        this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });
    }
  }
}

