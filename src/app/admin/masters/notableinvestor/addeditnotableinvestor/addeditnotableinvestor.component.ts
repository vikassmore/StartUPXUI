import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
//import { Router } from 'express';
import { Router, ActivatedRoute } from '@angular/router';
import { notableInvestorModel } from '../notableInvestor.Model';

@Component({
  selector: 'app-addeditnotableinvestor',
  templateUrl: './addeditnotableinvestor.component.html',
  styleUrls: ['./addeditnotableinvestor.component.css']
})
export class AddeditnotableinvestorComponent implements OnInit {

  public form: FormGroup;
  notableInvestorId: any;
  private sub: any;
  uploadForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    isActive: new FormControl(true)
  });
  isAddMode!: boolean;
  submitted = false;
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.notableInvestorId = this.route.snapshot.params['id'];
    this.isAddMode = !this.notableInvestorId;
    this.sub = this.route.params.subscribe(params => {
      this.notableInvestorId = params['id'];
      if (this.notableInvestorId != undefined || this.notableInvestorId > 0) {
        this.getNotableInvestorById(this.notableInvestorId);
      }
    });

    this.uploadForm = new FormGroup({
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
      ])),

      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
      ])),
      emailId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA0-Z9._%+-]+@[a-zA0-Z9.-]+\\.[aA-zZ]{2,4}$"),
      ])),
      mobileNo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ])),
      gender: new FormControl('', Validators.compose([
        Validators.required,

      ])),

      description: new FormControl('', Validators.compose([
        Validators.required,

      ])),
    })
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
  //Validation
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
  public onNotableInvestorSubmit(value: Object): void {
    if (this.isAddMode) {
      this.addNotableInvestor(value);
    }
    else {
      this.UpdateNotableInvestor(value);
    }
  }
  //Add Notable investor
  private addNotableInvestor = (notableinvestorFormData) => {
    if (this.notableInvestorId == null) {
      notableinvestorFormData.notableInvestorId = 0;
      let notableModel1: notableInvestorModel = {
        notableInvestorId: notableinvestorFormData.notableInvestorId,
        firstName: notableinvestorFormData.firstName,
        lastName: notableinvestorFormData.lastName,
        emailId: notableinvestorFormData.emailId,
        mobileNo: notableinvestorFormData.mobileNo,
        gender: notableinvestorFormData.gender,
        description: notableinvestorFormData.description,
        isActive: true
      }
      this.appService.addnotableinvestor('api/NotableInvestor', notableModel1).subscribe((response) => {
        if (!Number.isNaN(response)) {
          this.snackBar.open('Saved successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/admin/masters/listnotableinvestor'], { relativeTo: this.route });
        } else {
          this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      }, error => {
        this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });
    }
  }
  //Get Notable investor by Id
  getNotableInvestorById(notableInvestorId): void {
    this.appService.getById('api/NotableInvestor/GetNotableInvestorById/', notableInvestorId).subscribe((data: any) => {
      this.uploadForm.controls['firstName'].setValue(data.firstName);
      this.uploadForm.controls['lastName'].setValue(data.lastName);
      this.uploadForm.controls['emailId'].setValue(data.emailId);
      this.uploadForm.controls['mobileNo'].setValue(data.mobileNo);
      this.uploadForm.controls['gender'].setValue(data.gender);
      this.uploadForm.controls['description'].setValue(data.description)
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //update notable investor
  private UpdateNotableInvestor = (notableinvestorFormData) => {
    var notableInvestorId = Number(this.notableInvestorId);
    let notableModel1: notableInvestorModel = {
      notableInvestorId: notableInvestorId,
      firstName: notableinvestorFormData.firstName,
      lastName: notableinvestorFormData.lastName,
      emailId: notableinvestorFormData.emailId,
      mobileNo: notableinvestorFormData.mobileNo,
      gender: notableinvestorFormData.gender,
      description: notableinvestorFormData.description,
      isActive: true
    }
    this.appService.editnotableinvestor('api/NotableInvestor/Edit', notableModel1).subscribe((response: any) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open('Updated Successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/masters/listnotableinvestor'], { relativeTo: this.route });
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}

