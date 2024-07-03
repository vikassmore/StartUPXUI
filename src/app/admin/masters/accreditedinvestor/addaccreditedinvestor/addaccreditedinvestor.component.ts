import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { accreditedModel } from './addacreditedInvestor.Model';
//import { accreditedModel } from './addacreditedInvestor.Model';


@Component({
  selector: 'app-addaccreditedinvestor',
  templateUrl: './addaccreditedinvestor.component.html',
  styleUrls: ['./addaccreditedinvestor.component.css']
})
export class AddaccreditedinvestorComponent implements OnInit {
  public form: FormGroup;
  accreditedInvestorId1: string | any;
  accreditedInvestorId: string | any;
  private sub: any;

  uploadForm = new FormGroup({
    accreditedInvestorName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    isActive: new FormControl(true),
    accreditedInvestorId: new FormControl('', []) 
  });

  isAddMode!: boolean;
  submitted = false;

  constructor(public appService: AppService, private cd: ChangeDetectorRef, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.accreditedInvestorId = params['id'];
      console.log('Route Params:', params); // Log route params
      this.isAddMode = !this.accreditedInvestorId;
      if (this.accreditedInvestorId) {
        this.getAccreditedById(this.accreditedInvestorId);
      }
    });
  }
  navigateToList(): void {
    this.router.navigate(['/admin/masters/listaccreditedinvestor']);
  }
  public onAccreditedInvestorSubmit(value: Object): void {
    console.log('Form Value on Submit:', value); 

    if (this.isAddMode) {
      this.AddAccreditedInvestor(value);
    }
    else{
      this.updateCategory(value);
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
  getAccreditedById(accreditedInvestorId): void {
    console.log('Fetching Accredited Investor with ID:', accreditedInvestorId); // Log fetching ID
    this.appService.getById('api/AccreditedInvestor/GetAccreditdInvestorById/', accreditedInvestorId).subscribe(
      (data: any) => {
        console.log('Fetched Data:', data); // Log fetched data
        this.uploadForm.patchValue({
          accreditedInvestorName: data.accreditedInvestorName,
          description: data.description,
          isActive: data.isActive,
          accreditedInvestorId: data.accreditedInvestorId  // Set the accreditedInvestorId
        });
        // Manually trigger change detection
        this.cd.detectChanges();
      },
      error => {
        console.log('Error Fetching Data:', error); // Log error
      }
    );
  }
  private updateCategory = (AccreditedInvestorFormData) => {
   
    
      let AccreditedModel: accreditedModel = {
        accreditedInvestorId:AccreditedInvestorFormData.accreditedInvestorId,
        accreditedInvestorName: AccreditedInvestorFormData.accreditedInvestorName,
        description: AccreditedInvestorFormData.description,
        isActive: true
      }
      this.appService.add('api/AccreditedInvestor/Edit', AccreditedModel).subscribe((response) => {
        if (!Number.isNaN(response)) {
          this.snackBar.open('Record Updated Successfully. ', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/admin/masters/listaccreditedinvestor'], { relativeTo: this.route });
        } else {
          this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      }, error => {
        this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });
    }
  ////Add Category record
  private AddAccreditedInvestor = (AccreditedInvestorFormData) => {
    if (this.accreditedInvestorId == null) {
      AccreditedInvestorFormData.accreditedInvestorId = 0;
      let AccreditedModel: accreditedModel = {
        accreditedInvestorId: AccreditedInvestorFormData.accreditedInvestorId,
        accreditedInvestorName: AccreditedInvestorFormData.accreditedInvestorName,
        description: AccreditedInvestorFormData.description,
        isActive: true
      }
      this.appService.add('api/AccreditedInvestor', AccreditedModel).subscribe((response) => {
        if (!Number.isNaN(response)) {
          this.snackBar.open('Record Saved Successfully.', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/admin/masters/listaccreditedinvestor'], { relativeTo: this.route });
        } else {
          this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      }, error => {
        this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });
    }
  }
}
