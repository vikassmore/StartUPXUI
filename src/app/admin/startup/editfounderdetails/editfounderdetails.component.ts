import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FunderdetailModel } from '../founderdetails/Funderdetail.Model';


@Component({
  selector: 'app-editfounderdetails',
  templateUrl: './editfounderdetails.component.html',
  styleUrls: ['./editfounderdetails.component.css']
})
export class EditfounderdetailsComponent implements OnInit {
  private sub: any;
  isAddMode!: boolean;
  submitted = false;
  founderId: string | any;
  public items: any;
  userId: string | any;
  founderdetail: any = [];
  uploadForm = new FormGroup({
    founderId: new FormControl(''),
    firstName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    emailId: new FormControl('', [Validators.required, Validators.pattern("^[a-zA0-Z9._%+-]+@[a-zA0-Z9.-]+\\.[aA-zZ]{2,4}$"), Validators.maxLength(100)]),
    mobileNo: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.maxLength(15)]),
    gender: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  })
  constructor(public appService: AppService, public snackBar: MatSnackBar,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.founderId = this.route.snapshot.params['id'];
    this.sub = this.route.params.subscribe(params => {
      this.founderId = params['id'];
      if (this.founderId != undefined || this.founderId > 0) {
        this.getfounderById(this.founderId);

      }
    });
  }
  //On Submit
  public onfounderSubmit(value: Object): void {
    this.updateUser(value);
  }
  //Get founder by id
  getfounderById(founderId): void {
    this.appService.getfounderById('api/FounderDetail/GetFounderById/' + founderId).subscribe((data: any) => {
      this.uploadForm.controls['firstName'].setValue(data.firstName);
      this.uploadForm.controls['lastName'].setValue(data.lastName);
      this.uploadForm.controls['emailId'].setValue(data.emailId);
      this.uploadForm.controls['mobileNo'].setValue(data.mobileNo);
      this.uploadForm.controls['gender'].setValue(data.gender);
      this.uploadForm.controls['description'].setValue(data.description);
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //update founder details
  private updateUser = (founderFormData) => {
    var founderId = Number(this.founderId);
    let founderModel1: FunderdetailModel = {
      founderId: founderId,
      firstName: founderFormData.firstName,
      lastName: founderFormData.lastName,
      emailId: founderFormData.emailId,
      mobileNo: founderFormData.mobileNo,
      gender: founderFormData.gender,
      description: founderFormData.description,
      isActive: true
    }
    this.appService.edit('api/FounderDetail/Edit', founderModel1).subscribe((response: any) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open('Updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/startup/listfounderdetails'], { relativeTo: this.route });
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}
