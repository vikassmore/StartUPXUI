import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { InvestorDetailModel } from './Investor.Model';

@Component({
  selector: 'app-investordetails',
  templateUrl: './investordetails.component.html',
  styleUrls: ['./investordetails.component.css']
})
export class InvestordetailsComponent implements OnInit {
  public form: FormGroup;
  investorId: string | any;
  private sub:any;
  user:any=[];    
  userId: string | any;

  constructor(public appService: AppService, public snackBar: MatSnackBar,private route: ActivatedRoute, private router: Router,private _authService: AuthenticationService,public formBuilder: FormBuilder) { }
  isAddMode!: boolean;
  submitted = false;

  ngOnInit(): void {
  }

  /// Submit 
  public onInvestorSubmit(value: Object): void {
    if (this.isAddMode) {
      debugger;

      this.addInvestor(value);
    } 
  }

    /// Get method
  // public GetUser() {
  //   this._authService.GetUserById("api/User").subscribe((data: any) => {
  //     this.user = data;
  //   })
  //   error => {
  //     console.log(error.error.errors);
  //   }
  // }
  //Add user Data startupdetails
  private addInvestor= (investorFormData) => { 
    debugger;   
    if (this.investorId == null) 
    {
      investorFormData.investorId = 0;
      let investormodel1: InvestorDetailModel = {
      investorId: investorFormData.startupId,
      firstName: investorFormData.firstName,
      lastName: investorFormData.lastName,
      emailId: investorFormData.emailId,
      logo: investorFormData.logo,
      userId: investorFormData.userId,
      founderId: investorFormData.founderId,  
     isActive: true
    }
    debugger; 
    console.log(investormodel1)    
    this.appService.add('api/InvestorDetail',investormodel1).subscribe((response) => {
      debugger;
     if (!Number.isNaN(response))
     {
      this.snackBar.open('Saved successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.router.navigate(['/admin/dashboard-menu/dash-board'], { relativeTo: this.route });
     }
     else 
     {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
  
  }
  }


