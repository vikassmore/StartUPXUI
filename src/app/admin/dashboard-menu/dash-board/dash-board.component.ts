import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent {
  userInfo : any;
  VerifiedCount:number | any;
  NonVerifiedCount:string | any;
  LiveCount:string | any;
  PreviewCount:string | any;
  StealthCount:string | any;
  RaiseCount:string | any;
  InvestorVerifiedCount:number | any;
  InvestorNonVerifiedCount:string | any;
  RequestOfferingCount:string | any;
  InvestorsInvestedCount:string | any;
  IndicateInvestmentCount:string | any;
  public FAQList= [];
  public PolicyList= [];
  public ServiceUserList= [];
  ServiceUserCount:number;
  public ServiceList= [];
  userId: string | any;
  ServiceCount:number;
  public ServiceCaseList= [];
  ServiceCaseCount:number;
  public NotificationList: any = [];
  notificationCount: string | any;
  multi = [
    {
      "name": "Total Budget",
      "series": [
        {
          "name": "Budget",
          "value": 100000
        },
      ]
    },
  
    {
      "name": "12/02/22",
      "series": [
        {
          "name": "Production",
          "value": 18000
        },
        {
          "name": "Light",
          "value": 12000
        },
        {
          "name": "Makeup",
          "value": 19000
        },
        {
          "name": "Rent",
          "value": 10000
        },
        {
          "name": "Food",
          "value": 8000
        }
      ]
    },
  
    {
      "name": "13/02/22",
      "series": [
        {
          "name": "Production",
          "value": 13000
        },
        {
          "name": "Light",
          "value": 10000
        },
        {
          "name": "Food",
          "value": 14000
        },
        {
          "name": "Rent",
          "value": 12000
        }
      ]
    },

    {
      "name": "14/02/22",
      "series": [
        {
          "name": "Production",
          "value": 17000
        },
        {
          "name": "Light",
          "value": 15000
        },
        {
          "name": "Food",
          "value": 8000
        },
        {
          "name": "Rent",
          "value": 16000
        },
        {
          "name": "Makeup",
          "value": 7000
        }
      ]
    },

    {
      "name": "15/02/22",
      "series": [
        {
          "name": "Production",
          "value": 11000
        },
        {
          "name": "Light",
          "value": 13000
        },
        {
          "name": "Food",
          "value": 9000
        },
        {
          "name": "Rent",
          "value": 10000
        }
      ]
    },

    {
      "name": "16/02/22",
      "series": [
        {
          "name": "Production",
          "value": 17000
        },
        {
          "name": "Light",
          "value": 11000
        },
        {
          "name": "Food",
          "value": 12000
        },
        {
          "name": "Rent",
          "value": 11000
        }
      ]
    },

    {
      "name": "17/02/22",
      "series": [
        {
          "name": "Production",
          "value": 10000
        },
        {
          "name": "Light",
          "value": 18000
        },
        {
          "name": "Food",
          "value": 15000
        },
        {
          "name": "Rent",
          "value": 12000
        }
      ]
    },
  
    {
      "name": "18/02/22",
      "series": [
        {
          "name": "Production",
          "value": 13000
        },
        {
          "name": "Light",
          "value": 12000
        },
        {
          "name": "Food",
          "value": 15000
        },
        {
          "name": "Rent",
          "value": 11000
        },
        {
          "name": "Makeup",
          "value": 4000
        }
      ]
    },

    {
      "name": "19/02/22",
      "series": [
        {
          "name": "Production",
          "value": 17000
        },
        {
          "name": "Light",
          "value": 15000
        },
        {
          "name": "Food",
          "value": 11000
        },
        {
          "name": "Rent",
          "value": 16000
        }
      ]
    },

    {
      "name": "20/02/22",
      "series": [
        {
          "name": "Production",
          "value": 11000
        },
        {
          "name": "Light",
          "value": 16000
        },
        {
          "name": "Food",
          "value": 19000
        },
        {
          "name": "Rent",
          "value": 15000
        }
      ]
    },

    {
      "name": "21/02/22",
      "series": [
        {
          "name": "Production",
          "value": 7000
        },
        {
          "name": "Light",
          "value": 21000
        },
        {
          "name": "Food",
          "value": 19000
        },
        {
          "name": "Rent",
          "value": 16000
        },
        {
          "name": "Makeup",
          "value": 10000
        }
      ]
    }
  ];

  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Expense';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Amount';

  colorScheme = {
    domain: ['#0cad00', '#f1da33', '#ff5f5f', '#f729ff', '#5fbfff', '#1936d5', '#4ef226', '#f27414', '#b4ff5f', '#ff0000']
  };

  panelOpenState = false;
  
  constructor(public appService : AppService, private tokenStorage: TokenStorageService) {
    // Object.assign(this, { this.multi });
  }

  ngOnInit() {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != undefined || this.userId > 0) {
      this.getNotification(this.userId);
    }
    this.getFAQMaster();
    this.getPolicyMaster();
    this.getFounderStatusCount();
    this.getInvestorStatusCount();
    this.getServiceProvider();
    this.getService();
    this.getServiceCase();
 }
 public getFAQMaster() {
  this.appService.getAll("api/Master/GetAllFAQ").subscribe(data => {
    this.FAQList = data;
  });
}
public getPolicyMaster() {
  this.appService.getAll("api/Master/GetAllPolicy").subscribe(data => {
    this.PolicyList = data;
  });
}
  onSelect(event) {
    console.log(event);
  }
 ///Get Founder Status Count
 getFounderStatusCount(): void {
  this.appService.getAll('api/FounderVerification/FounderStatusCount').subscribe((data: any) => {
this.VerifiedCount = data.verifiedCount;
this.NonVerifiedCount = data.nonVerifiedCount;
this.LiveCount = data.liveCount;
this.PreviewCount = data.previewCount;
this.StealthCount = data.stealthCount;
this.RaiseCount = data.founderRaiseCount;
  })
  error => {
    console.log(error.error.errors);
  }
}
///Get Investor Status Count
getInvestorStatusCount(): void {
  this.appService.getAll('api/InvestorVerification/InvestorStatusCount').subscribe((data: any) => {
this.InvestorVerifiedCount = data.verifiedCount;
this.InvestorNonVerifiedCount = data.nonVerifiedCount;
this.RequestOfferingCount = data.requestFundingCount;
this.InvestorsInvestedCount = data.investorsInvestedCount;
this.IndicateInvestmentCount = data.indicateInvestmentCount;
  })
  error => {
    console.log(error.error.errors);
  }
}
 ///Get Notification By user
 getNotification(userId): void {
  this.appService.getAllById('api/Master/GetNotificationByUserId/', userId).subscribe((data: any) => {
   this.NotificationList = data;
   this.notificationCount = data.length;
  })
  error => {
    console.log(error.error.errors);
  }
}
///Get service provider
public getServiceProvider() {
  this.appService.getAll("api/User/GetAllServiceProviderUser").subscribe(data => {
    this.ServiceUserList = data;
    this.ServiceUserCount = this.ServiceUserList.length;
  });
}
///Get services
public getService() {
  this.appService.getAll("api/Service/GetAllAdminService").subscribe(data => {
    this.ServiceList = data;
    this.ServiceCount = this.ServiceList.length;
  });
}
///Get service case
public getServiceCase() {
  this.appService.getAll("api/Service/GetAllServiceCase").subscribe(data => {
    this.ServiceCaseList = data;
    this.ServiceCaseCount = this.ServiceCaseList.length;
  });
}
}
