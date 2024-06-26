import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { InvestorDetailModel } from './InvestorDetail.Model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-basicdetails',
  templateUrl: './basicdetails.component.html',
  styleUrls: ['./basicdetails.component.css']
})
export class BasicdetailsComponent implements OnInit {
  public form: FormGroup;
  investorId: string | any;
  private sub: any;
  user: any = [];
  userId: string | any;
  founderTypeId: string | any;
  stateSelected: string | any;
  citySelected: string | any;
  founderType: any[];
  country: any = [];
  states: any = [];
  cities: any[];
  stateId: string | any;
  countrytId: string | any;
  citiesId: string | any;
  uploadForm = new FormGroup({
    investorId: new FormControl(''),
    profileType: new FormControl('Investor'),
    entityType: new FormControl(''),
    firstName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    mobileNo: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    founderTypeId: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    profile: new FormControl(''),
    countryId: new FormControl('', [Validators.required]),
    stateId: new FormControl('', [Validators.required]),
    cityId: new FormControl('', [Validators.required]),
    zipCode: new FormControl(0, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    address1: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    address2: new FormControl('', [Validators.maxLength(200)])

  })
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private sanitizer: DomSanitizer) {


    this.form = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      emailId: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      mobileNo: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      stateId: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      countryId: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      cityId: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      address1: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      profile: new FormControl('', Validators.compose([

      ])),


      zipCode: new FormControl(0, Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)

      ])),
    },);
  }
  isAddMode!: boolean;
  submitted = false;


  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != undefined || this.userId > 0) {
      this.getinvestorById(this.userId);
    }
    this.GetCountry();
    this.GetFounderType();
  }

  ///On Submit 
  public onInvestorSubmit(value: Object): void {
    if (this.uploadForm.valid) {
      this.addInvestor(value);
    }
  }

  //Validation
  keyPressOnlyChar(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  /// Get founder type
  public GetFounderType() {
    this._authService.getFounderTypeById("api/FounderType").subscribe((data: any) => {
      this.founderType = data;
    })
    error => {
      console.log(error.error.errors);
    }
  }
  ///Get Investor By userId
  getinvestorById(userId): void {
    this.appService.getByInvestorId('api/InvestorDetail/GetInvestorById/', userId).subscribe((data: any) => {
      this.uploadForm.controls['investorId'].setValue(data.investorId);
      this.uploadForm.controls['firstName'].setValue(data.firstName);
      this.uploadForm.controls['lastName'].setValue(data.lastName);
      this.uploadForm.controls['emailId'].setValue(data.emailId);
      this.uploadForm.controls['mobileNo'].setValue(data.mobileNo);
      this.uploadForm.controls['founderTypeId'].setValue(data.founderTypeId);
      this.uploadForm.controls['entityType'].setValue(data.founderTypeName);
      this.uploadForm.controls['zipCode'].setValue(data.zipCode);
      this.uploadForm.controls['address1'].setValue(data.address1);
      this.uploadForm.controls['address2'].setValue(data.address2);

      if (data.countryId != 0) {
        this.uploadForm.controls['countryId'].setValue(data.countryId);
        this.uploadForm.controls['stateId'].setValue(data.stateId);
        this.uploadForm.controls['cityId'].setValue(data.cityId);
        this.GetState(data.countryId);
        this.GetCity(data.stateId);
      }
      this.investorId = data.investorId;
    })
    error => {
      console.log(error.error.errors);
    }
  }

  ///Get Country method
  public GetCountry() {
    this._authService.getCountryById("api/Country").subscribe((data: any) => {
      this.country = data;
    }), error => {
      console.log(error.error.errors);
    }
  }
  // on Change Country
  public onChangeCountry(event) {
    if (event.value) {
      let countryId = event.value;
      this._authService.getStateById("api/State/GetStateById/" + countryId).subscribe(
        data => {
          this.states = data;
          this.cities = null;
        }
      );
    } else {
      this.states = null;
      this.cities = null;
    }
  }
  /// Get State Method
  public GetState(countryId) {
    if (countryId == undefined) {
      countryId == 1;
    }
    this._authService.getStateById("api/State/GetStateById/" + countryId).subscribe((data: any) => {
      this.states = data;
    }), error => {
      console.log(error.error.errors);
    }
  }
  // On change State
  public onChangeState(event) {
    if (event.value) {
      let stateId = event.value;
      this._authService.getCityById("api/City/GetCityById/" + stateId).subscribe(
        data => this.cities = data
      );
    } else {
      this.cities = null;
    }
  }
  /// Get City Method   
  public GetCity(stateId) {
    this.stateId = this.uploadForm.value; console.log('s', this.stateId)
    this._authService.getCityById("api/City/GetCityById/" + stateId).subscribe((data: any) => {
      this.cities = data;
    })
    error => {
      console.log(error.error.errors);
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

  //Add user Data startupdetails
  private addInvestor = (investorFormData) => {
    let investorDetailmodel1: InvestorDetailModel = {
      InvestorId: investorFormData.investorId,
      ProfileType: investorFormData.profileType,
      founderTypeName: investorFormData.profileType,
      MobileNo: investorFormData.mobileNo,
      FirstName: investorFormData.firstName,
      LastName: investorFormData.lastName,
      EmailId: investorFormData.emailId,
      FounderTypeId: investorFormData.founderTypeId,
      CountryId: investorFormData.countryId,
      StateId: investorFormData.stateId,
      CityId: investorFormData.cityId,
      ZipCode: investorFormData.zipCode,
      Address1: investorFormData.address1,
      Address2: investorFormData.address2,
      IsActive: true,
      loggedUserId: investorFormData.loggedUserId
    }
    const formData = new FormData();
    formData.append("investormodel", JSON.stringify(investorDetailmodel1));
    this.appService.add('api/InvestorDetail', formData).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/investor/basicdetails'], { relativeTo: this.route });
      }
      else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }

}
