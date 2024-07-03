import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { UserEditRegistration, UserForRegistration } from 'src/app/interfaces/user/UserForRegistration.model';
import { RegistrationResponse } from 'src/app/interfaces/Responses/RegistrationResponse.model';
import { UserForAuthenticationDto } from 'src/app/interfaces/user/UserForAuthenticationDto.model';
import { AuthResponseDto } from 'src/app/interfaces/Responses/AuthResponseDto.model';
import { Subject } from 'rxjs/internal/Subject';
import { UserForgotpassword } from 'src/app/interfaces/user/UserForgotpassword.model';
import { ForgotResponse } from 'src/app/interfaces/Responses/ForgotResponse.model';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { IncidentEditRegistration } from 'src/app/interfaces/Incident/IncidentForRegistration.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private formData: FormData = new FormData()
  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService, private token: TokenStorageService) { }

  public registerUser = (route: string, body: UserForRegistration) => {
    return this._http.post<RegistrationResponse>(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  public loginUser = (route: string, body: UserForAuthenticationDto) => {
  
    return this._http.post<AuthResponseDto>(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'json' });
  }

  public loginUserbyemail = (route: string, body: any) => {
   return this._http.post<AuthResponseDto>(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'json' });
   }

  public getUserId = (route: string) => {
    return this._http.get(this.createCompleteRoute(route, this._envUrl.urlAddress));
  }

  public twostepverify = (route: string, body: any) => {
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);}

    public reSentOtp = (route: string, body: any) => {
      return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body,{ responseType: 'text' });}
  //public forgotUser = (route: string, body: UserForgotpassword) => {
  //return this._http.post<ForgotResponse>(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'json' });
  // }

  public forgotUser = (route: string, body: any) => {
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  public resetPassword = (route: string, body: any) => {
    return this._http.post<ForgotResponse>(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }


  ///Users

  public getAllUsers = (route: string) => {
    return this._http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
  }
  public getRoles = (route: string) => {
    return this._http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
  }
  public getUserById = (route: string) => {    
    return this._http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));    
  }

  public getSectorById = (route: string) => {    
    return this._http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));    
  }
  public getRole = (route: string) => {    
    return this._http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));    
  }
  public getFounderType = (route: string) => {    
    return this._http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));    
  }

  public GetUserById = (route: string) => {    
    return this._http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));    
  }
  public getFundingById = (route: string) => {    
    return this._http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));    
  }

  public getFounderTypeById = (route: string) => {    
    return this._http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));    
  }
  public getFounderTypeByuserId = (route: string) => {    
    return this._http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));    
  }

  public getCountryById = (route: string) => { 
    return this._http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress)); 
   }
   public getStateById = (route: string) => { 
       return this._http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress)); 
       }
    public getCityById = (route: string) => { 
    return this._http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress)); 
  }
  public getEditUserById(id): Observable<UserForRegistration> {
    return this._http.get<UserForRegistration>(this._envUrl.urlAddress + id);
  }
  public updateUser = (route: string, body: UserEditRegistration) => {
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
  }
  public deleteUser = (route: string, body: any) => {
    //return this._http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  ///Incident//

  public getAllIncident = (route: string) => {
   
    return this._http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
  }
  public getIncidentById = (route: string) => {
  
    return this._http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
  }

  //    public saveIncident(formData = new FormData()) {
  //   return this.http.post(this.url, formData);
  // }

  public saveIncident = (route: string, formData) => {
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), formData, { responseType: 'text' });
  }
  public getEditIncidentById(id): Observable<IncidentEditRegistration> {
    return this._http.get<IncidentEditRegistration>(this._envUrl.urlAddress + id);
  }

  public updateIncident = (route: string, body: IncidentEditRegistration) => {
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
  }
  public deleteIncident = (route: string, body: any) => {
    //return this._http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  ///End///

  ///Logout ///

  public logout = () => {
    this.token.signOut();
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    window.sessionStorage.clear();
    this.sendAuthStateChangeNotification(false);
  }

  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }

}
