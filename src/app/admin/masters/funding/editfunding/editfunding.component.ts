import { Component, OnInit } from '@angular/core';
import { AppService, Data } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FundingModel } from '../listfunding/Funding.Model';

@Component({
  selector: 'app-editfunding',
  templateUrl: './editfunding.component.html',
  styleUrls: ['./editfunding.component.css']
})
export class EditfundingComponent implements OnInit {
  private sub: any;
  fundingId: string | any;
  name: string | any;
  description: string | any;
  uploadForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    isActive: new FormControl(true)
  });
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.fundingId = params['id'];
      if (this.fundingId != undefined || this.fundingId > 0) {
        this.getfundingById(this.fundingId);
      }
    });
  }

  ///Get funding By fundingId
  getfundingById(fundingId): void {
    this.appService.getfundingId('api/Funding/GetFundingById/', fundingId).subscribe((data: any) => {
      this.uploadForm.controls['name'].setValue(data.name);
      this.uploadForm.controls['description'].setValue(data.description);
      this.uploadForm.controls['isActive'].setValue(data.isActive);
      this.uploadForm.controls['fundingId'].setValue(data.fundingId);
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //On Submit
  public onFundingSubmit(value: Object): void {
    this.updateFunding(value);
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

  ////Update funding Record
  private updateFunding = (fundingFormData) => {
    var fundingId = Number(this.fundingId);
    let fundingModel1: FundingModel = {
      fundingId: fundingId,
      name: fundingFormData.name,
      description: fundingFormData.description,
      isActive: true
    }
    this.appService.edit('api/Funding/Edit', fundingModel1).subscribe((response: any) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open('Updated Successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/masters/listfunding'], { relativeTo: this.route });
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }

}
