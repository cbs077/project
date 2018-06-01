﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    template: `
                <div class="col-md-6 col-md-offset-3 mx-auto">
                    <h2>Register</h2>
                    <form name="form" (ngSubmit)="f.form.valid && register()" #f="ngForm" novalidate>
                        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !firstName.valid }">
                            <label for="firstName">First Name</label>
                            <input type="text" class="form-control" name="firstName" [(ngModel)]="model.firstName" #firstName="ngModel" required />
                            <div *ngIf="f.submitted && !firstName.valid" class="help-block">First Name is required</div>
                        </div>
                        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !lastName.valid }">
                            <label for="lastName">Last Name</label>
                            <input type="text" class="form-control" name="lastName" [(ngModel)]="model.lastName" #lastName="ngModel" required />
                            <div *ngIf="f.submitted && !lastName.valid" class="help-block">Last Name is required</div>
                        </div>
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
                            <button [disabled]="loading" class="btn btn-primary">Register</button>
                            <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            <a [routerLink]="['/login']" class="btn btn-link">Cancel</a>
                        </div>
                    </form>
                </div>
                `
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    console.log("success");
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['login']);
                },
                error => {
                    console.log("error");
                    alert(" 중복된 사용자가 있습니다.");
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
