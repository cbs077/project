import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient , HttpHeaders } from "@angular/common/http"; 

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class WebApiObservableService {
//    headers: Headers;
    headers: HttpHeaders;
//    options: RequestOptions;
    options: any;
    
    constructor(private http: HttpClient     ){
    //
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
    //    this.options = new RequestOptions({ headers: this.headers });
        this.options = this.headers ;
    }
/*
    getService(url: string): Observable<any> {
        return this.http
            .get(url, this.options)
//            .map(this.extractData)
            .catch(this.handleError);
    }

    getServiceWithDynamicQueryTerm(url: string, key: string, val: string): Observable<any> {
        return this.http
            .get(url + "/?" + key + "=" + val, this.options)
//            .map(this.extractData)
            .catch(this.handleError);
    }

    getServiceWithFixedQueryString(url: string, param: any): Observable<any> {
        this.options = new RequestOptions({ headers: this.headers, search: 'query=' + param });
        return this.http
            .get(url, this.options)
 //           .map(this.extractData)
            .catch(this.handleError);
    }

    getServiceWithComplexObjectAsQueryString(url: string, param: any): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (var key in param) {
            if (param.hasOwnProperty(key)) {
                let val = param[key];
                params.set(key, val);
            }
        }
        this.options = new RequestOptions({ headers: this.headers, search: params });
        return this.http
            .get(url, this.options)
//            .map(this.extractData)
            .catch(this.handleError);
    }
*/
    createService(url: string, param: any): Observable<any> {
//      let body = JSON.stringify(param);
        
        console.log( "aa",param, url,  this.options );
//      this.headers = new Headers({   'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8', });

        this.options = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
/*        this.options = new RequestOptions({
             headers: this.headers ,
             method: RequestMethod.Post 
        });
*/         
        return this.http
//          .post(url, body, this.options )
            .post(url, param, this.options )
 //           .map(this.extractData)
            .catch(this.handleError);
    }
    deleteService(url: string ): Observable<any> {
/*        let params: URLSearchParams = new URLSearchParams();
        for (var key in param) {
            if (param.hasOwnProperty(key)) {
                let val = param[key];
                params.set(key, val);
            }
        }
        this.options = new RequestOptions({ headers: this.headers, search: params });
*/        return this.http
            .delete(url, this.options )
//            .map(this.extractData)
            .catch(this.handleError);
    }
    updateService(url: string, param: any): Observable<any> {
        //let body = JSON.stringify(param);
        return this.http
            .put(url, param, this.options)
//            .map(this.extractData)
            .catch(this.handleError);
    }
/*
    patchService(url: string, param: any): Observable<any> {
        let body = JSON.stringify(param);
        return this.http
            .patch(url, body, this.options)
//            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteService(url: string, param: any): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (var key in param) {
            if (param.hasOwnProperty(key)) {
                let val = param[key];
                params.set(key, val);
            }
        }
        this.options = new RequestOptions({ headers: this.headers, search: params });
        return this.http
            .delete(url, this.options)
//            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteServiceWithId(url: string, key: string, val: string): Observable<any> {
        return this.http
            .delete(url + "/?" + key + "=" + val, this.options)
//            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
*/
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
