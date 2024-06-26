import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Enum } from '../../../loginpages/register/Enum';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  role:boolean;
  UserRole:string;

  public userImage = 'assets/images/others/admin.jpg';
  constructor(private _authService: AuthenticationService,private _router: Router) { }
  
  ngOnInit(): void {
    this.UserRole=window.sessionStorage.getItem("role");
    if(this.UserRole==Enum.RoleId.Admin){
     this.role=true
    }
    if(this.UserRole==Enum.RoleId.Satrtup){
      this.role=false;
    }
    if(this.UserRole==Enum.RoleId.Investor){
      this.role=false;
    }
   

  }
   public logout = () => {
    debugger;
    // this._authService.logout();
    // this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this._router.onSameUrlNavigation = 'reload';
    // window.location.href = '#/loginpage/';
     var user = JSON.parse(sessionStorage.getItem("auth-user"));
    if(user.roleName==Enum.RoleName.Admin){
       this._authService.logout();
       this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        window.sessionStorage.clear();
     window.location.href = '#/loginpage/'; }
     else{
       window.location.href = '#/loginpage/';
       window.sessionStorage.clear();
       }
  }
}
