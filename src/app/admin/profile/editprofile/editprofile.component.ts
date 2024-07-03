import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray,FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FunderdetailModel } from '../../startup/founderdetails/Funderdetail.Model';
import { Enum } from './Enum';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
   private sub:any;
  isAddMode!: boolean;
  submitted = false;   
 password:string;
  userId: string | any;
  founderTypeList: any = [];
  roleId:string;
  uploadForm = new FormGroup({ 
 
	firstName:new FormControl('', [Validators.required]),
	lastName:new FormControl('', [Validators.required]),
	emailId:new FormControl('', [Validators.required]),
	founderTypeId:new FormControl('', [Validators.required]),})
  constructor(public appService: AppService, public snackBar: MatSnackBar,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
  
    var userId = JSON.parse(sessionStorage.getItem("userID"));
    this.sub = this.route.params.subscribe(params => {
    this.userId =userId; //params['id'];
    if (this.userId != undefined || this.userId > 0) {
    
      this.getuserById(this.userId);
     
    }
    });
    this.getallfounders();
  }

  public onfounderSubmit(value: Object): void {

    this.updateUser();
  }

getallfounders():void{
  this.appService.getAll("api/FounderType").subscribe(data => {

    this.founderTypeList = data;
  });
}
public backButtonClick(){
  if (this.roleId == Enum.RoleId.Satrtup)
  {
    this.router.navigate(['/admin/startup/dashboardstartup']);
  }
  else if(this.roleId== Enum.RoleId.Investor)
  {
    this.router.navigate(['/admin/investor/dashboardinvestor']);
  }
  else if(this.roleId== Enum.RoleId.Admin)
  {
    this.router.navigate(['/admin/dashboard-menu/dash-board']);
 }
}
  getuserById(userId): void {

    this.appService.getuserById('api/User/'+userId).subscribe((data: any) => {
      console.log('f',data);
      this.uploadForm.controls['firstName'].setValue(data.firstName);    
      this.uploadForm.controls['lastName'].setValue(data.lastName);  
      this.uploadForm.controls['emailId'].setValue(data.emailId);  
      this.uploadForm.controls['founderTypeId'].setValue(data.founderTypeId);   
     this.password=data.password;
     this.roleId = data.roleId;
    })
    error => {
      console.log(error.error.errors);
    }
  }

  private updateUser() {
  
    var roleId=window.sessionStorage.getItem("role")
    var formData = new FormData();
    formData.append('firstName', this.uploadForm.value.firstName);
    formData.append('lastName', this.uploadForm.value.lastName);
    formData.append('userId', this.userId);
    formData.append('emailId', this.uploadForm.value.emailId);
    formData.append('founderTypeId', this.uploadForm.value.founderTypeId);
    formData.append('roleId', roleId);
   formData.append('password',this.password);
console.log("aa",formData);
    this.appService.edituser('api/User/Edit',formData).subscribe((response:any) => {
   
      if (!Number.isNaN(response)) {
      this.snackBar.open('Updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
     // this.router.navigate([''], { relativeTo: this.route });
  
      }
      else{
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}

