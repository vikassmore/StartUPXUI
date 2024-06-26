import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BankdetailModel } from './BankDetail.Model';

@Component({
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.component.html',
  styleUrls: ['./bankdetails.component.css']
})
export class BankdetailsComponent implements OnInit {
  public form: FormGroup;
  bankId: string | any;
  private sub: any;
  user: any = [];
  userId: string | any;
  uploadForm = new FormGroup({
    bankId: new FormControl(''),
    ifsccode: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    bankName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    branchName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    accountNumber: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    isActive: new FormControl(true)

  })
  isAddMode: boolean;
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder, private tokenStorage: TokenStorageService) {
    this.form = this.formBuilder.group({
      accountNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ])),
    },);
  }

  ngOnInit(): void {
    this.bankId = this.route.snapshot.params['id'];
    this.isAddMode = !this.bankId;
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != undefined || this.userId > 0) {
      this.getBankDetailsById(this.userId);
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
  ///Get Bank details By userId
  getBankDetailsById(userId): void {
    this.appService.getByInvestorId('api/Bankdetail/GetBankDetailByuserId/', userId).subscribe((data: any) => {
      this.uploadForm.controls['bankId'].setValue(data.bankId);
      this.uploadForm.controls['ifsccode'].setValue(data.ifsccode);
      this.uploadForm.controls['bankName'].setValue(data.bankName);
      this.uploadForm.controls['branchName'].setValue(data.branchName);
      this.uploadForm.controls['accountNumber'].setValue(data.accountNumber);
      this.bankId = data.bankId;
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //On Submit
  public onbankDetailSubmit(value: Object): void {
    if (this.uploadForm.valid) {
      if (this.isAddMode) {
        this.addbankDetail(value);
      }
    }
  }

  //Add user Data addbankDetail
  private addbankDetail = (bankDetailFormData) => {
    let bankdetailmodel1: BankdetailModel = {
      bankId: bankDetailFormData.bankId,
      ifsccode: bankDetailFormData.ifsccode,
      bankName: bankDetailFormData.bankName,
      branchName: bankDetailFormData.branchName,
      accountNumber: bankDetailFormData.accountNumber,
      isActive: true,

    }
    this.appService.add('api/Bankdetail', bankdetailmodel1).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/investor/bankdetails'], { relativeTo: this.route });
      }
      else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}
