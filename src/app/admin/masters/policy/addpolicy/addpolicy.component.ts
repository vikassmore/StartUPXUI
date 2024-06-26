import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyModel } from '../listpolicy/Policy.Model';

@Component({
  selector: 'app-addpolicy',
  templateUrl: './addpolicy.component.html',
  styleUrls: ['./addpolicy.component.css']
})
export class AddpolicyComponent implements OnInit {
  public form: FormGroup;
  policyId: string | any;
  private sub: any;
  uploadForm = new FormGroup({
    policyName: new FormControl('', [Validators.required]),
    policyDescription: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  isAddMode!: boolean;
  submitted = false;
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  //On Submit
  public onPolicySubmit(value: Object): void {
    if (this.uploadForm.valid) {
      this.createPolicy(value);
    }
  }
  ////Add Policy record
  private createPolicy = (policyFormData) => {
    if (this.policyId == null) {
      policyFormData.policyId = 0;
      let PolicyModel1: PolicyModel = {
        policyId: policyFormData.policyId,
        policyName: policyFormData.policyName,
        policyDescription: policyFormData.policyDescription,
      }
      this.appService.add('api/Master/AddPolicy', PolicyModel1).subscribe((response) => {
        if (!Number.isNaN(response)) {
          this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/admin/masters/listpolicy'], { relativeTo: this.route });
        } else {
          this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      }, error => {
        this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });
    }
  }
}
