import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FundingModel } from '../listfunding/Funding.Model';

@Component({
  selector: 'app-addfunding',
  templateUrl: './addfunding.component.html',
  styleUrls: ['./addfunding.component.css']
})
export class AddfundingComponent implements OnInit {
  public form: FormGroup;
  fundingId: string | any;
  private sub: any;

  uploadForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    isActive: new FormControl(true)
  });

  isAddMode!: boolean;
  submitted = false;

  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.fundingId = this.route.snapshot.params['id'];
    this.isAddMode = !this.fundingId;
  }
  //On Submit
  public onfundingSubmit(value: Object) {
    if (this.isAddMode) {
      this.addFunding(value);
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
  ////Add Funding record
  private addFunding = (fundingFormData) => {
    if (this.fundingId == null) {
      fundingFormData.serviceId = 0;
      let fundingModel1: FundingModel = {
        fundingId: fundingFormData.fundingId,
        name: fundingFormData.name,
        description: fundingFormData.description,
        isActive: true
      }
      this.appService.add('api/Funding', fundingModel1).subscribe((response) => {
        if (!Number.isNaN(response)) {
          this.snackBar.open('Saved successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/admin/masters/listfunding'], { relativeTo: this.route });
        } else {
          this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      }, error => {
        this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });
    }
  }

}
