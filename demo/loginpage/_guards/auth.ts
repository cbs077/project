/*import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { MsalService } from '../services/msal.service';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  constructor(private msalService: MsalService) {}
  
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
 //   if (token) {
 //     headerSettings['Authorization'] = 'Bearer ' + token;
 //   }
    headerSettings['Authorization'] = 'Bearer ' ;
    headerSettings['Content-Type'] = 'application/json';
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader});
    return next.handle(changedRequest).toPromise();
  }
}
*/
/*
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

   //     const idToken = localStorage.getItem("id_token");

        if ( true) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + "as")
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}
*/
 
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const changedReq = req.clone({
        setHeaders:{
            Authorization:  "Bearer " + "as"
         }
    });

    return next.handle(changedReq);
  }
}

