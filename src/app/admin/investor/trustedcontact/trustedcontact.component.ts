import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { TrustedContectModel } from './Trustedcontact.Model';


@Component({
  selector: 'app-trustedcontact',
  templateUrl: './trustedcontact.component.html',
  styleUrls: ['./trustedcontact.component.css']
})
export class TrustedcontactComponent implements OnInit {
  public form: FormGroup;
  trustedContactId: string | any;
  private sub: any;
  user: any = [];
  buttonDisabled: boolean;
  userId: string | any;
  country: any = [];
  types: any;
  states: any = [];
  cities: any[];
  stateId: string | any;
  countrytId: string | any;
  citiesId: string | any;
  uploadForm = new FormGroup({
    types: new FormControl('', [Validators.required]),
    trustedContactId: new FormControl(''),
    firstName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    emailId: new FormControl('', [Validators.required, Validators.pattern("^[a-zA0-Z9._%+-]+@[a-zA0-Z9.-]+\\.[aA-zZ]{2,4}$"), Validators.maxLength(100)]),
    countryId: new FormControl('', [Validators.required]),
    stateId: new FormControl('', [Validators.required]),
    cityId: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    mobileNo: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    address1: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    address2: new FormControl('', Validators.maxLength(200)),
  })
  isAddMode: boolean;

  constructor(public formBuilder: FormBuilder, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.buttonDisabled = true;
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != undefined || this.userId > 0) {
      this.gettrustedContactById(this.userId);
    }
    this.GetCountry();
  }
  //On Submit
  public ontrustedContactSubmit(value: Object): void {
    if (this.uploadForm.valid && this.types == 'Yes') {
      this.addtrustedContact(value);
    } else {
      this.snackBar.open('You have not select is your trusted contact person Yes...!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
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
  //On change trusted contact type  
  public changeTrusted(e) {
    this.uploadForm.controls['types'].setValue(e.value);
    this.types = e.value;
    if (e.value == 'No') {
      this.buttonDisabled = true;
    } else {
      if (this.uploadForm.valid) {
        this.buttonDisabled = false;
      }
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
  ///Get Trusted Contact By userId
  gettrustedContactById(userId): void {
    this.appService.getAllById('api/TrustedContactPerson/GetTrustedContactByuserId/', userId).subscribe((data: any) => {
      this.uploadForm.controls['trustedContactId'].setValue(data.trustedContactId);
      this.uploadForm.controls['types'].setValue(data.types);
      this.uploadForm.controls['firstName'].setValue(data.firstName);
      this.uploadForm.controls['lastName'].setValue(data.lastName);
      this.uploadForm.controls['emailId'].setValue(data.emailId);
      this.uploadForm.controls['zipCode'].setValue(data.zipCode);
      this.uploadForm.controls['mobileNo'].setValue(data.mobileNo);
      this.uploadForm.controls['address1'].setValue(data.address1);
      this.uploadForm.controls['address2'].setValue(data.address2);
      if (data.countryId != 0) {
        this.uploadForm.controls['countryId'].setValue(data.countryId);
        this.uploadForm.controls['stateId'].setValue(data.stateId);
        this.uploadForm.controls['cityId'].setValue(data.cityId);
        this.GetState(data.countryId);
        this.GetCity(data.stateId);
        this.buttonDisabled = false;
        this.types = data.types;
      }
      this.trustedContactId = data.trustedContactId;
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //Add strusted contact details
  private addtrustedContact = (trustedContactFormData) => {
    let trustedContactmodel1: TrustedContectModel = {
      trustedContactId: trustedContactFormData.trustedContactId,
      types: trustedContactFormData.types,
      firstName: trustedContactFormData.firstName,
      lastName: trustedContactFormData.lastName,
      emailId: trustedContactFormData.emailId,
      countryId: trustedContactFormData.countryId,
      stateId: trustedContactFormData.stateId,
      cityId: trustedContactFormData.cityId,
      zipCode: trustedContactFormData.zipCode,
      mobileNo: trustedContactFormData.mobileNo,
      address1: trustedContactFormData.address1,
      address2: trustedContactFormData.address2,
      isActive: true
    }
    this.appService.add('api/TrustedContactPerson', trustedContactmodel1).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/investor/trustedcontact'], { relativeTo: this.route });
        setTimeout(() => {
          window.location.reload();
        }, 1000);      }
      else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}

