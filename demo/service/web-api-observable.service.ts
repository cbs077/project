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
    headers: HttpHeaders;
    options: any;
    
    constructor(private http: HttpClient     ){
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
    //    this.options = new RequestOptions({ headers: this.headers });
        this.options = this.headers ;
    }
    createService(url: string, param: any): Observable<any> {
        console.log( "aa",param, url,  this.options );
        this.options = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
     
        return this.http
            .post(url, param, this.options )
            .catch(this.handleError);
    }
    deleteService(url: string ): Observable<any> {
      return this.http
            .delete(url, this.options )
            .catch(this.handleError);
    }
    updateService(url: string, param: any): Observable<any> {
        //let body = JSON.stringify(param);
        return this.http
            .put(url, param, this.options)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
