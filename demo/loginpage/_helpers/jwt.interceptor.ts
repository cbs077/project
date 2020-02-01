

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
       
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("JwtInterceptor:", currentUser );
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
 //                 Authorization: `Bearer ${currentUser.token}`
                    Authorization: `${currentUser.token}`
                            
                }
            });
        }
        return next.handle(request).do(event => {}, err => {
            if(err instanceof HttpErrorResponse){
                console.log("Error Caught By Interceptor", err);
                //Observable.throw(err);
            }
        });
    //    return next.handle(request);
    }
    

}

/*
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
//import { MsalService } from '../services/msal.service';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.fromPromise(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
      Promise<HttpEvent<any>> {
 //   const token = await this.msalService.getAccessToken();
    let changedRequest = request;
    // HttpHeader object immutable - copy values
    const headerSettings: {[name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    if (true) {
      var username =  JSON.parse(localStorage.getItem("currentUser")) ;
  
      headerSettings['Authorization'] = 'Bearer ' + username['token'];
  //      headerSettings['mycode'] = 'Bearer ' + "aa";
    }
    headerSettings['Content-Type'] = 'application/json';
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader});
    return next.handle(changedRequest).toPromise();
  }

}
*/