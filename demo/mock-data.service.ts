import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {TableResultsPage} from './component-wrapper/src/app/table-results-page';
import {ColumnOrder} from './component-wrapper/src/app/column-order';

//import { Http} from '@angular/http';
import {HttpClient} from "@angular/common/http";
export class Person {
    author: number;
    category: string;
    contents: string;
    title: string;
}

@Injectable()
export class MockDataService {

    private persons: Person[] = [{
        'author': 1,
        'title': 'Evelyn',
        'contents': 'Burns',
        'category': 'eburns0@amazon.co.uk'
    } ];

    constructor( private _http: HttpClient ) {

    }

    public listPersons(from: number, count: number, orderBy: ColumnOrder[] ): Observable<TableResultsPage> {
            
    
            const result = this.persons.slice(from, from + count);
    //      const result = data.slice(from, from + count);
    //      console.log( "persons", this.persons ) ;  
            
            const pr = new TableResultsPage();
            pr.count = count;
            pr.from = from;
            pr.total = this.persons.length;
            pr.results = result;
        
            console.log( "result", result );
    //      pr.results = data;
    
    //      console.log("pr", pr);
            return Observable.of(pr);
    }
    public setdata(data){
        console.log( "setdata", data );
        this.persons = data ;
               
    }
    private sortFunction(order) {
        return (person1: Person, person2: Person) => {
            if ('asc' === order.direction) {
                if (person1[order.property] > person2[order.property]) {
                    return 1;
                }
                if (person1[order.property] < person2[order.property]) {
                    return -1;
                }
            } else {
                if (person1[order.property] < person2[order.property]) {
                    return 1;
                }
                if (person1[order.property] > person2[order.property]) {
                    return -1;
                }
            }
            return 0;
        };
    }

}
