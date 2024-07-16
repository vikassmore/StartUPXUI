import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FunderdetailModel } from './Funderdetail.Model';


@Component({
  selector: 'app-founderdetails',
  templateUrl: './founderdetails.component.html',
  styleUrls: ['./founderdetails.component.css']
})
export class FounderdetailsComponent implements OnInit {
  isAddMode!: boolean;
  submitted = false;
  founderId: string | any;
  public items: any;
  userId: string | any;
  founderdetail: any = [];
  founderModel: string[] | any = [];
  uploadForm = new FormGroup({
    founderId: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required, Validators.pattern("^[a-zA0-Z9._%+-]+@[a-zA0-Z9.-]+\\.[aA-zZ]{2,4}$")]),
    mobileNo: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  })

  constructor(public appService: AppService, public snackBar: MatSnackBar,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    public formBuilder: FormBuilder) {
    this.uploadForm = this.fb.group({
      lands: this.fb.array([this.fb.group({ firstName: '', lastName: '', emailId: '', mobileNo: '', gender: '', description: '' })]),
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.founderId;
    this.uploadForm = this.fb.group({
      lands: this.fb.array([this.fb.group({ firstName: '', lastName: '', emailId: '', mobileNo: '', gender: '', description: '' })]),
    });
  }

  get lands() {
    return this.uploadForm.get('lands') as FormArray;
  }
  // Add row
  add() {
    console.log('a3', this.lands)
    this.lands.push(this.fb.group({ firstName: '', lastName: '', emailId: '', mobileNo: '', gender: '', description: '' }));
  }
  // Delete row
  deleteRow(index: number) {
    const control = this.uploadForm.get('lands') as FormArray;
    control.removeAt(index);
  }
  //Validation for enter only char
  keyPressOnlyChar(event): boolean {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  //Validation for enter only number for mobile no
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
  public onSubmit(value: Object): void {
    const ar = this.uploadForm.get('lands') as FormArray;
    if (this.uploadForm.valid && ar.controls.length != 0) {
      if (this.isAddMode) {
        this.addFounder();
      }
    }
  }
  //Add founder details
  private addFounder() {
    if (this.uploadForm.valid) {
      const ar = this.uploadForm.get('lands') as FormArray;
      this.uploadForm.setControl('lands', ar);
      console.log('a2', this.uploadForm.setControl('lands', ar))
      var landarray = this.uploadForm.value.lands;
      for (var i = 0; i < landarray.length; i++) {
        let model = new FunderdetailModel();
        model.firstName = landarray[i].firstName;
        model.lastName = landarray[i].lastName;
        model.emailId = landarray[i].emailId;
        model.gender = landarray[i].gender;
        model.mobileNo = landarray[i].mobileNo;
        model.description = landarray[i].description;
        model.isActive = true;
        model.founderId = 0;
        this.founderModel.push(model);
      }
      this.appService.addfounder('api/FounderDetail', this.founderModel).subscribe(data => {
       
        this.snackBar.open('Saved successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/startup/listfounderdetails'], { relativeTo: this.route });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      
        error => {
          this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        });
    }
  }
}




