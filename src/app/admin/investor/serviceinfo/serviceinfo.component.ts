import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-serviceinfo',
  templateUrl: './serviceinfo.component.html',
  styleUrls: ['./serviceinfo.component.css']
})
export class ServiceinfoComponent implements OnInit {
  serviceId: number;
  serviceName: string;
  serviceDescription: string;
  category: string;
  subcategory: string;
  private sub: any;
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.serviceId = params['serviceId'];
      if (this.serviceId != undefined || this.serviceId > 0) {
        this.getservicedetails(this.serviceId);
      }
    });
  }
  //Get Service founder dtails by id
  public getservicedetails(serviceId) {
    this.appService.getAllById("api/Service/GetServiceById/", serviceId).subscribe(data => {
      this.serviceId = data.serviceId;
      this.serviceName = data.serviceName;
      this.serviceDescription = data.serviceDescription;
      this.category = data.category;
      this.subcategory = data.subCategory;
    });

  }
}
