import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { StartdetailModel } from './Startdetail.Model';
import { DateAdapter } from '@angular/material/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Byte } from '@angular/compiler/src/util';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-startupdetails',
  templateUrl: './startupdetails.component.html',
  styleUrls: ['./startupdetails.component.css'],
  providers: [DatePipe],
})
export class StartupdetailsComponent implements OnInit {
  public form: FormGroup;
  today = new Date().toISOString().split('T')[0];
  startupId: string | any;
  userId: string | any;
  private sub: any;
  WhetherInStealth: boolean;
  employeeCount: any = [];
  country: any = [];
  states: any = [];
  cities: any[];
  stateId: string | any;
  countrytId: string | any;
  citiesId: string | any;
  previewUrl: any;
  placeholderImage = 'assets/images/placeholder.png';
  logofile: File = null;
  sectorId: string | any;
  imagefile: string;
  sectors: any = [];
  buttenDisabled: boolean;
  role: string;
  name: string;
  managementInfoData: string = "Management Info.";
  public selectedSector: any;

  uploadForm = new FormGroup({
    startupId: new FormControl('', [Validators.required]),
    startUpName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    countryId: new FormControl('', [Validators.required]),
    stateId: new FormControl('', [Validators.required]),
    cityId: new FormControl('', [Validators.required]),
    foundingYear: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    companyDescription: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    websiteUrl: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    logo: new FormControl(''),
    isActive: new FormControl(true),
    employeeCount: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    sectorId: new FormControl('', [Validators.required]),
    companyEmailId: new FormControl('', [Validators.required, Validators.pattern("^[a-zA0-Z9._%+-]+@[a-zA0-Z9.-]+\\.[aA-zZ]{2,4}$"), Validators.maxLength(100)]),
    companyLegalName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    companyHeadquartersAddress: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    companyContact: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]),
    serviceDescription: new FormControl('', [Validators.maxLength(500)]),
    businessModel: new FormControl('', [Validators.maxLength(500)]),
    targetCustomerBase: new FormControl('', [Validators.maxLength(500)]),
    targetMarket: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    managementInfo: new FormControl('', [Validators.required]),
    isStealth: new FormControl(''),

  });
  isAddMode!: boolean;
  submitted = false;
  @ViewChild('name') inputName;
  @ViewChild('role') inputRole;
  constructor(private dateAdapter: DateAdapter<Date>, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private datePipe: DatePipe, private sanitizer: DomSanitizer) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.form = this.formBuilder.group({
      startupId: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      startUpName: new FormControl('', Validators.compose([
        Validators.required, Validators.maxLength(100)
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),

      ])),
      countryId: new FormControl('', Validators.compose([
        Validators.required
      ])),
      stateId: new FormControl('', Validators.compose([
        Validators.required
      ])),
      cityId: new FormControl('', Validators.compose([
        Validators.required
      ])),
      foundingYear: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(4),
        Validators.pattern(/^\d{4}$/),
        Validators.maxLength(10)
      ])),
      companyDescription: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(500)
      ])),
      websiteUrl: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/),
        Validators.maxLength(100)
      ])),
      logo: new FormControl('', Validators.compose([
      ])),

      employeeCount: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      sectorId: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      companyEmailId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      companyLegalName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      companyHeadquartersAddress: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      companyContact: new FormControl('', Validators.compose([
        Validators.required
      ])),
      serviceDescription: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(500)
      ])),
      businessModel: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(500)
      ])),
      targetCustomerBase: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(500)
      ])),
      targetMarket: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(500)
      ])),
      managementInfo: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      isStealth: new FormControl('', Validators.compose([

      ])),
    },);
  }
  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != undefined || this.userId > 0) {
      this.getStartupById(this.userId);
    }
    this.GetCountry();
    this.GetSector();
    this.getEmployeeCount();
    this.buttenDisabled = true;
  }
  //validation by Character
  keyPressOnlyChar(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  /// image select
  onFileSelected(event: any) {
    this.logofile = event.target.files[0];
    this.imagefile = event.target.files[0].name;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewUrl = event.target.result;
    }
    reader.readAsDataURL(this.logofile);
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
  //validation for role
  public onTextChangeRole(e) {
    this.role = e.value;
    if (e.value != "" && e.value != undefined) {
      if (this.role != "" && this.name != "") {
        this.buttenDisabled = false;
      }
    } else {
      this.buttenDisabled = true;
    }
  }
  //validation for name
  public onTextChangeName(e) {
    this.name = e.value;
    if (e.value != "" && e.value != undefined) {
      if (this.role != "" && this.name != "") {
        this.buttenDisabled = false;
      }
    } else {
      this.buttenDisabled = true;
    }
  }
  //Assign management value
  public onTextChangeMan(e) {
    if (e.value != "" && e.value != undefined) {
      this.managementInfoData = e.value;
    } else {
      this.managementInfoData = '';
    }
  }
  //Add management info
  public addManagementInfo() {
    this.uploadForm.controls['managementInfo'].setValue(this.managementInfoData.trim() + "\n" + (this.role + " " + "-" + " " + this.name).trim());
    this.managementInfoData = (this.managementInfoData.trim() + "\n" + (this.role + " " + "-" + " " + this.name).trim());
    this.inputName.nativeElement.value = ' ';
    this.inputRole.nativeElement.value = ' ';
    event.preventDefault();
  }
  ///On Submit 
  public onSartupdetailSubmit(value: Object): void {
    if (this.uploadForm.valid) {
      this.addstartup(value);
    }
  }
  /// Get method
  public GetSector() {
    this._authService.getSectorById("api/Sector").subscribe((data: any) => {
      this.sectors = data;
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
    if (countryId != undefined) {
      this._authService.getStateById("api/State/GetStateById/" + countryId).subscribe((data: any) => {
        this.states = data;
      }), error => {

      }
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
    this._authService.getCityById("api/City/GetCityById/" + stateId).subscribe((data: any) => {
      this.cities = data;
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //On Change whether is stealth
  public onCheckBoxChange(e) {
    if (e.checked) {
      this.WhetherInStealth = true;
    }
    else {
      this.WhetherInStealth = false;
    }
  }
  /// Get Employee Count
  public getEmployeeCount() {
    this.appService.getAll("api/Master/GetAllEmployeeCount").subscribe((data: any) => {
      this.employeeCount = data;
    })
    error => {
      console.log(error.error.errors);
    }
  }
  /////getbyuserid
  getStartupById(userId): void {
    this.appService.getAllById('api/StartupDetails/GetStartupByuserId/', userId).subscribe((data: any) => {
      this.uploadForm.controls['startupId'].setValue(data.startupId);
      this.uploadForm.controls['startUpName'].setValue(data.startUpName);
      this.uploadForm.controls['address'].setValue(data.address);
      this.uploadForm.controls['foundingYear'].setValue(data.foundingYear);
      this.uploadForm.controls['companyDescription'].setValue(data.companyDescription);
      this.uploadForm.controls['websiteUrl'].setValue(data.websiteUrl);
      this.uploadForm.controls['employeeCount'].setValue(data.employeeCount);
      this.uploadForm.controls['companyEmailId'].setValue(data.companyEmailId);
      this.uploadForm.controls['companyLegalName'].setValue(data.companyLegalName);
      this.uploadForm.controls['companyHeadquartersAddress'].setValue(data.companyHeadquartersAddress);
      this.uploadForm.controls['companyContact'].setValue(data.companyContact);
      this.uploadForm.controls['serviceDescription'].setValue(data.serviceDescription);
      this.uploadForm.controls['businessModel'].setValue(data.businessModel);
      this.uploadForm.controls['targetCustomerBase'].setValue(data.targetCustomerBase);
      this.uploadForm.controls['targetMarket'].setValue(data.targetMarket);
      this.uploadForm.controls['managementInfo'].setValue(data.managementInfo);
      this.uploadForm.controls['isStealth'].setValue(data.isStealth);
      if (data.managementInfo != null) {
        this.managementInfoData = data.managementInfo;
      } else {
        this.managementInfoData = '';
      }

      if (data.countryId != 0) {
        this.uploadForm.controls['countryId'].setValue(data.countryId);
        this.uploadForm.controls['stateId'].setValue(data.stateId);
        this.uploadForm.controls['cityId'].setValue(data.cityId);
        this.uploadForm.controls['sectorId'].setValue(data.sectorId);
        this.GetState(data.countryId);
        this.GetCity(data.stateId);
      }
      this.imagefile = data.logoFileName;
      this.WhetherInStealth = data.isStealth;
      let objectURL = 'data:image/jpeg;base64,' + data.logo;
      this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this.logofile = data.logo;
      this.startupId = data.startupId;
      if (this.imagefile == "" || this.imagefile == null) {
        this.uploadForm.get('logo').setValidators([Validators.required]);
      } else {
        this.uploadForm.get('logo').clearValidators();
      }
    })
    error => {
      console.log(error.error.errors);
    }
  }

  //Add user Data startupdetails
  private addstartup = (startupFormData) => {
    let startupmodel1: StartdetailModel = {
      StartupId: startupFormData.startupId,
      StartUpName: startupFormData.startUpName,
      Address: startupFormData.address,
      CountryId: startupFormData.countryId,
      StateId: startupFormData.stateId,
      CityId: startupFormData.cityId,
      FoundingYear: startupFormData.foundingYear,
      CompanyDescription: startupFormData.companyDescription,
      WebsiteUrl: startupFormData.websiteUrl,
      //logo: this.logofile,
      EmployeeCount: startupFormData.employeeCount,
      SectorId: startupFormData.sectorId,
      CompanyEmailId: startupFormData.companyEmailId,
      CompanyLegalName: startupFormData.companyLegalName,
      CompanyHeadquartersAddress: startupFormData.companyHeadquartersAddress,
      CompanyContact: startupFormData.companyContact,
      ServiceDescription: startupFormData.serviceDescription,
      BusinessModel: startupFormData.businessModel,
      TargetCustomerBase: startupFormData.targetCustomerBase,
      TargetMarket: startupFormData.targetMarket,
      ManagementInfo: startupFormData.managementInfo,
      IsStealth: this.WhetherInStealth,
      IsActive: true
    }
    const formData = new FormData();
    formData.append("statupmodel", JSON.stringify(startupmodel1));
    formData.append("logo", this.logofile);
    this.appService.add('api/StartupDetails', formData).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/startup/startupdetails'], { relativeTo: this.route });
      }
      else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}
