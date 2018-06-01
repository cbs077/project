import { Injectable, EventEmitter , Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { WebApiObservableService } from '../../board/web-api-observable.service';

import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private userObservableService: WebApiObservableService
    ) { }
  
    @Output() open: EventEmitter<any> = new EventEmitter();

    login(username: string, password: string, returnuri: string) {
       console.log("login1", username);
       
       // createService -> checkID
       return this.userObservableService
            .createService('http://121.157.55.240:8080/user/authen',  {"username": username, "password": password } ) ;      
            /*.subscribe(
                    result => {
                          console.log("5. createService: " , result);
                          localStorage.setItem('currentUser', JSON.stringify(result));
                          this.open.emit(null);

                          this.router.navigate([returnuri]);
                    }
              );
           */
               
 /*          
            map(user => {
                // login successful if there's a jwt token in the response
                console.log("login2", user, user.token );
                if (user && user.token) {
                    console.log("login");
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }                
                return "aa";
            }); 
            return "aa";*/
     }  
          
  /*      return this.http.post<any>('http://121.157.55.240:8080/api/authen', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                console.log("login2", user, user.token );
                if (user && user.token) {
                    console.log("login");
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                
                return user;
            });
 */

    

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
          
    }
}