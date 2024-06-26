import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService, Data } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceInfoModel } from './serviceInfo.Model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ServiceshowinterestComponent } from '../serviceshowinterest/serviceshowinterest.component';
import {saveAs} from 'file-saver/dist/FileSaver';

@Component({
  selector: 'app-serviceinfo',
  templateUrl: './serviceinfo.component.html',
  styleUrls: ['./serviceinfo.component.css']
})
export class ServiceinfoComponent implements OnInit {
  userId: number;
  serviceId: any;
  myServiceShow: boolean;
  dashBoardShow: boolean;
  serviceProviderName: string;
  serviceDescription: string;
  category: string;
  tagsKeywords: string;
  portfolio: string;
  portfolioDocument: any = [];
  contactInformation: string;
  intrestedServiceNames: string;
  private sub: any;
  serviceCaseId: number;
  status: string;
  comment: string;
  flag: any;
  flag2: any;
  constructor(public dialog: MatDialog, public appService: AppService, private tokenStorage: TokenStorageService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.route.snapshot.params['id'] == 1) {
      this.myServiceShow = false;
      this.dashBoardShow = true;
    } else if (this.route.snapshot.params['id'] == 0) {
      this.dashBoardShow = false;
      this.myServiceShow = true;
    }
    this.sub = this.route.params.subscribe(params => {
      this.serviceId = params['serviceId'];
      if (this.serviceId != undefined || this.serviceId > 0) {
        this.getservicedetails(this.serviceId);
      }
    });
  }
  //Get service details by Id
  public getservicedetails(serviceId) {
    this.appService.getAllById("api/Service/GetServiceById/", serviceId).subscribe(data => {
      this.serviceId = data.serviceId;
      this.serviceProviderName = data.serviceProviderName;
      this.contactInformation = data.contactInformation;
      this.category = data.category;
      this.tagsKeywords = data.tagsKeywords;
      this.portfolioDocument = data.servicePortfolioModel;
    });

  }
  //Add interested
  ServiceAdd(serviceId): void {
    const dialogRef = this.dialog.open(ServiceshowinterestComponent, {
      width: '100vh',
      data: { serviceId: serviceId }
    });
  }
  ///download file
  public downloadDocument(serviceId, servicePortFolioId,fileName) {
    this.appService.downloadById("api/Service/DownloadPortfolioById/", serviceId + '/' + servicePortFolioId).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: data.type });
      saveAs(blob, fileName); 
    });
  }
}
