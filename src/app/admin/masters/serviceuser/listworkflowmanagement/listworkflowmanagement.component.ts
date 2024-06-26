import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {saveAs} from 'file-saver/dist/FileSaver';

@Component({
  selector: 'app-listworkflowmanagement',
  templateUrl: './listworkflowmanagement.component.html',
  styleUrls: ['./listworkflowmanagement.component.css']
})
export class listworkflowmanagement implements OnInit {
  public ServiceCaseList: any = [];
  public ServiceCaseDataList: any = [];
  public title: any;
  public page: any;
  public count = 10;
  constructor(public appService: AppService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getServiceCase();
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getServiceCase();
    }
    else {
      this.ServiceCaseList = this.ServiceCaseDataList.filter(res => {
        return (
          res.startupDeatailModel.startUpName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.serviceModel.serviceProviderName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.intrestedServiceNames.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.status.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
    ///pagination
    public onPageChanged(event) {
      this.page = event;
      window.scrollTo(0, 0);
    }
  //Get Service case
  public getServiceCase() {
    this.appService.getAll("api/Service/GetAllServiceCase").subscribe(data => {
      this.ServiceCaseDataList = data;
      this.ServiceCaseList = data;
    });
  }
  ///download file
  public downloadDocument(serviceCaseId,serviceProviderName) {
    this.appService.downloadById("api/Service/DownloadInvoiceById/", serviceCaseId).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: data.type });
      saveAs(blob, serviceProviderName); 
    });
  }
}
