import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TokenStorageService } from '../../shared/services/token-storage.service';
const TOKEN_HEADER_KEY = 'Authorization';    

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor( private spinner: NgxSpinnerService,private token: TokenStorageService) {}
  
    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.spinner.show();

        const token = this.token.getToken();
        let authReq = req;
        if (token != null) {
            // for Spring Boot back-end     
            authReq = req.clone({
              headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
            });
        }

        return next.handle(authReq).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.spinner.hide();
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            const started = Date.now();            
            const elapsed = Date.now() - started;
            console.log(`Request for ${req.urlWithParams} failed after ${elapsed} ms.`);
           // debugger;
           this.spinner.hide();
            return throwError(error);
          })
        );

    }  
}