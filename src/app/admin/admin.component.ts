import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AppSettings, Settings } from '../app.settings';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService } from './components/menu/menu.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AppService } from '../app.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public userInfo: any = [];
  @ViewChild('sidenav') sidenav: any;
 // public userImage = 'assets/images/others/admin.jpg';
  //public userImage = '';
  public settings: Settings;
  public menuItems: Array<any>;
  public toggleSearchBar: boolean = false;
  verified: boolean;
  buttonDisabled: boolean;
  investmentDisabled: boolean;
  raisebuttonDisabled: boolean;
  ProfileStatus: string | any;
  investorProfileCompetion: string | any;
  founderProfileCompetion: string | any;
  FounderDetailCount:number;
  FundingDetailCount:number;
  userId:number;
  roleId:string | any;
  constructor(public appSettings: AppSettings,
    public router: Router,
    private menuService: MenuService, private appService: AppService,private tokenStorage: TokenStorageService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    if (window.innerWidth <= 960) {
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false;      
    };
   
    this.userId = this.tokenStorage.getUser().userId;
    this.roleId = this.tokenStorage.getUser().roleName;
    if (this.userId && this.userId > 0) {
      if (this.roleId === 'Startup') {
        this.getFounderProfileCompletion(this.userId);
      } else if (this.roleId === 'Investor') {
        this.getInvestorProfileCompletion(this.userId);
      }
    }
    // if (!this.tokenStorage.getToken())
    //             {this.router.onSameUrlNavigation = 'reload';
    //             this.router.navigate(['/']);}
    setTimeout(() => {
      this.settings.theme = 'blue';
    });
    this.menuItems = this.menuService.getMenuItems();
   this.getInfo();
   
  }
  public getInfo() {
    var user = JSON.parse(sessionStorage.getItem("userID"))
     this.appService.getUserId("api/User/" + user).subscribe((data: any) => {
      this.userInfo = data;
      
    });
  

  // public getInfo() {
 
  //  this.appService.getUserById("api/User/GetUserById").subscribe(data => {
  //   this.userInfo = data;
  //  });
}

  ngAfterViewInit() {
    if (document.getElementById('preloader')) {
      document.getElementById('preloader').classList.add('hide');
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
      if (window.innerWidth <= 960) {
        this.sidenav.close();
      }
    });
    this.menuService.expandActiveSubMenu(this.menuService.getMenuItems());
  }

  public toggleSidenav() {
    this.sidenav.toggle();
  }

  public scrollToTop() {
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset / (scrollDuration / 20);
    var scrollInterval = setInterval(() => {
      if (window.pageYOffset != 0) {
        window.scrollBy(0, scrollStep);
      }
      else {
        clearInterval(scrollInterval);
      }
    }, 10);
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      });
    }
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    if (window.innerWidth <= 960) {
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false;
    }
    else {
      this.settings.adminSidenavIsOpened = true;
      this.settings.adminSidenavIsPinned = true;
    }
  }
  getInvestorProfileCompletion(userId): void {
  
    this.appService.getAllById('api/InvestorVerification/InvestorProfileCompletion/', userId).subscribe((data: any) => {
      this.investorProfileCompetion = (((data.investorProfileCompletion) * 100) / 4).toFixed(0);
      this.verified = data.verified;
      if (this.verified == null) {
        this.verified = false;
      }
      if (this.investorProfileCompetion == 100) {
        if (data.verified == true) {
          this.buttonDisabled = true;
          this.ProfileStatus = "Verified Profile";
          // this.investmentDisabled = false;
        } else {
          this.buttonDisabled = false;
          this.ProfileStatus = "Non Verified Profile";
          // this.investmentDisabled = true;
        }

      } else {
        this.buttonDisabled = true;
        // this.investmentDisabled = true;
        this.ProfileStatus = "Non Verified Profile";
      }
    })
    error => {
      console.log(error.error.errors);
    }
  }

  getFounderProfileCompletion(userId): void {
    this.appService.getAllById('api/FounderVerification/FounderProfileCompletion/', userId).subscribe((data: any) => {
      this.founderProfileCompetion = (((data.founderProfileCompletion) * 100) / 5).toFixed(0);
      this.verified = data.verified;
      this.FounderDetailCount = data.founderDetailCount;
      this.FundingDetailCount = data.fundingDetailCount;
      if (this.verified == null) {
        this.verified = false;
      }
      if (this.founderProfileCompetion == 100) {
        if (data.verified == true) {
          this.buttonDisabled = true;
          this.ProfileStatus = "Verified Profile";
        } else {
          this.buttonDisabled = false;
          this.ProfileStatus = "Non Verified Profile";
        }
        this.raisebuttonDisabled = false;
      } else {
        this.buttonDisabled = true;
        this.raisebuttonDisabled = true;
        this.ProfileStatus = "Non Verified Profile";
      }
    })
    error => {
      console.log(error.error.errors);
    }
  }
}
