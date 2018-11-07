import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/index';
import { Observable} from 'rxjs/Observable';

import { WebApiObservableService } from '../../service/web-api-observable.service';
import { environment } from '../../environment';

@Injectable()
export class UserService {
    constructor(    
            private http: HttpClient,
            private movieObservableService: WebApiObservableService
   ) { }

    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    create(user: User) {
//        console.log("regester", user);
//          return this.http.post('http://121.157.55.240:8080/api/users', user);
     
        return this.movieObservableService
                    .createService( environment.IP + '/api/user', user );
                    

    }


    update(user: User) {
        return this.http.put('/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
}
