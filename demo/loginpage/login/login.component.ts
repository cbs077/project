﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    template: `
            <div class="col-md-6 col-md-offset-3 mx-auto">
                <h2>Login</h2>
                <form name="form" (ngSubmit)="f.form.valid && login()" #f="ngForm" novalidate>
                    <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !username.valid }">
                        <label for="username">Username</label>
                        <input type="text" class="form-control" name="username" [(ngModel)]="model.username" #username="ngModel" required />
                        <div *ngIf="f.submitted && !username.valid" class="help-block">Username is required</div>
                    </div>
                    <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !password.valid }">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" name="password" [(ngModel)]="model.password" #password="ngModel" required />
                        <div *ngIf="f.submitted && !password.valid" class="help-block">Password is required</div>
                    </div>
                    <div class="form-group">
                        <button [disabled]="loading" class="btn btn-primary">Login</button>
                        <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        <a [routerLink]="['/register']" class="btn btn-link">Register</a>
                          <router-outlet></router-outlet>
                    </div>
                </form>
            </div>
            `
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
//,     private mainService: MainComponent
        
        ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password, this.returnUrl)
        .subscribe(
                    result => {
 //                         var temp ;
                          var temp = JSON.stringify(result) ;
 //                         temp.push({"name":"2"});
//                          console.log("login: " , result );
                          result.username = this.model.username ;
                          console.log("login1: " , result);
                          localStorage.setItem('currentUser', JSON.stringify(result));
 //                         console.log( "token:", result.json().token);
 //                         this.authenticationService.token = result.json().token ;
                          //                        this.open.emit(null);                         
                          this.router.navigate([ this.returnUrl]);
                    },
                    error => {
                          console.log("error", error);
                          this.alertService.error(error);
                          this.loading = false;
                    }
        ); 
 
        
        /*            .subscribe(
                result => {
                    this.router.navigate([this.
        returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
  */      
    }
}
