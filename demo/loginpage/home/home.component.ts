import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    template: `
                <div class="col-md-6 col-md-offset-3">
                    <h1>Hi {{currentUser.firstName}}!</h1>
                    <p>You're logged in with Angular 2!!</p>
                    <h3>All registered users:</h3>
                    <ul>
                        <li *ngFor="let user of users">
                            {{user.username}} ({{user.firstName}} {{user.lastName}})
                            - <a (click)="deleteUser(user.id)">Delete</a>
                        </li>
                    </ul>
                    <p><a [routerLink]="['/login']">Logout</a></p>
                </div>
                `
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}