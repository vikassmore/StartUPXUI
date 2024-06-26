import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listprofilemanagement',
  templateUrl: './listprofilemanagement.component.html',
  styleUrls: ['./listprofilemanagement.component.css']
})
export class ListprofilemanagementComponent implements OnInit {
  public ServiceProfileList: any = [];
  public ServiceProfileDataList: any = [];
  public title: any;
  constructor(public appService: AppService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getServiceProfile();
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getServiceProfile();
    }
    else {
      this.ServiceProfileList = this.ServiceProfileDataList.filter(res => {
        return (
          res.serviceProviderName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.category.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  //Get Service provider list
  public getServiceProfile() {
    this.appService.getAll("api/Service/GetAllAdminService").subscribe(data => {
      this.ServiceProfileDataList = data;
      this.ServiceProfileList = data;
    });
  }
  ///download file
  public downloadDocument(serviceId) {
    this.appService.downloadById("api/Service/DownloadAllPortfolioById/", serviceId).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: data.type });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
