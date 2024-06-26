import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService, Data } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent implements OnInit {
serviceCaseId:any;
StartUpName: string;
Address:string;
FoundingYear:number;
CompanyDescription:string;
WebsiteUrl:string;
EmployeeCount:number;	
SectorName:number;
CompanyEmailId:string;
CompanyLegalName:string;
CompanyContact:number;
BusinessModel:string;
TargetCustomerBase:string;
TargetMarket:string;	
ServiceDescription:string;
ManagementInfo:string;
IsStealth:string;
formType:string | any;
previewUrl:any;
serviceleadShow:boolean;
serviceworkShow:boolean;
  constructor(public dialog: MatDialog,public appService:AppService,private tokenStorage:TokenStorageService,public snackBar: MatSnackBar,private route: ActivatedRoute, private router: Router,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.serviceCaseId = this.route.snapshot.params['id'];
    if(this.route.snapshot.params['id1'] == 1){
      this.serviceleadShow = true;
      this.serviceworkShow = false;
    }else if(this.route.snapshot.params['id1'] == 0){
      this.serviceworkShow = true;
      this.serviceleadShow = false;
    }
    this.getServiceCasedetails(this.serviceCaseId);
  }
  public getServiceCasedetails(serviceCaseId) {
    this.appService.getAllById("api/Service/GetServiceCaseById/",serviceCaseId).subscribe(data => {   
      this.StartUpName = data.startupDeatailModel.startUpName;
      this.Address = data.startupDeatailModel.address;
      this.FoundingYear = data.startupDeatailModel.foundingYear;
      this.WebsiteUrl = data.startupDeatailModel.websiteUrl;
      this.CompanyDescription = data.startupDeatailModel.companyDescription;
      this.EmployeeCount = data.startupDeatailModel.employeeCount;
      this.SectorName = data.startupDeatailModel.sectorName;
      this.CompanyLegalName = data.startupDeatailModel.companyLegalName;
      this.CompanyContact = data.startupDeatailModel.companyContact;
      this.CompanyEmailId = data.startupDeatailModel.companyEmailId;
      this.BusinessModel = data.startupDeatailModel.businessModel;
      this.TargetCustomerBase = data.startupDeatailModel.targetCustomerBase;
      this.TargetMarket = data.startupDeatailModel.targetMarket;
      this.ManagementInfo = data.startupDeatailModel.managementInfo;
      this.ServiceDescription = data.startupDeatailModel.serviceDescription;
      this.IsStealth = data.startupDeatailModel.isStealth;
      this.previewUrl  = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + data.startupDeatailModel.logo);
    });
 
}
}
