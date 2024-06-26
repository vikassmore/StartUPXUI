import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-listmyservices',
  templateUrl: './listmyservices.component.html',
  styleUrls: ['./listmyservices.component.css']
})
export class ListmyservicesComponent implements OnInit {
  userId: any;
  public ServiceList: any = [];
  public ServiceDataList: any = [];
  public title: any;
  public page: any;
  public count = 10;
  uploadForm = new FormGroup({
    serviceName: new FormControl('', [Validators.required]),
    serviceDescription: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    subCategory: new FormControl('', [Validators.required]),
    contactInformation: new FormControl('', [Validators.required]),
    portfolio: new FormControl('', [Validators.required]),
    isActive: new FormControl(true),
    status: new FormControl('', [Validators.required]),
    serviceInterestDate: new FormControl('', [Validators.required])

  });
  constructor(private appService: AppService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != undefined || this.userId > 0) {
      this.getserviceByuserId(this.userId);
    }
  }
  ///pagination
  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getserviceByuserId(this.userId);
    }
    else {
      this.ServiceList = this.ServiceDataList.filter(res => {
        return (
          res.serviceModel.serviceProviderName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.intrestedServiceNames.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.status.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  //Get service case by user
  getserviceByuserId(userId): void {
    this.appService.getById('api/Service/GetServiceCaseByUserId/', userId).subscribe((data: any) => {
      this.ServiceDataList = data;
      this.ServiceList = data;
    })
    error => {
      console.log(error.error.errors);
    }
  }
}
