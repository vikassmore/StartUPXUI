import { Component, OnInit } from '@angular/core';
import { AppService, Data } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PolicyModel } from '../listpolicy/Policy.Model';

@Component({
  selector: 'app-editpolicy',
  templateUrl: './editpolicy.component.html',
  styleUrls: ['./editpolicy.component.css']
})
export class EditpolicyComponent implements OnInit {
  public form: FormGroup;
  policyId: string | any;
  private sub: any;
  policyName: string | any;
  policyDescription: string | any;
  uploadForm = new FormGroup({
    policyName: new FormControl('', [Validators.required]),
    policyDescription: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.policyId = params['id'];
      if (this.policyId != undefined || this.policyId > 0) {
        this.getPolicyById(this.policyId);
      }
    });
  }
  ///Get policy By policyId
  getPolicyById(policyId): void {
    this.appService.getById('api/Master/GetPolicyById/', policyId).subscribe((data: any) => {
      this.uploadForm.controls['policyName'].setValue(data.policyName);
      this.uploadForm.controls['policyDescription'].setValue(data.policyDescription);
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //On Submit
  public onPolicySubmit(value: Object): void {
    if (this.uploadForm.valid) {
      this.updatePolicy(value);
    }
  }

  ////Update Policy Record
  private updatePolicy = (policyFormData) => {
    var policyId = Number(this.policyId);
    let PolicyModel1: PolicyModel = {
      policyId: policyId,
      policyName: policyFormData.policyName,
      policyDescription: policyFormData.policyDescription,
    }
    this.appService.edit('api/Master/AddPolicy', PolicyModel1).subscribe((response: any) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open('Updated Successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/masters/listpolicy'], { relativeTo: this.route });
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }

}
