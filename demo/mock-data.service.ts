import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {TableResultsPage} from './component-wrapper/src/app/table-results-page';
import {ColumnOrder} from './component-wrapper/src/app/column-order';

//import { Http} from '@angular/http';
import {HttpClient} from "@angular/common/http";
export class Board {
    author: number;
    category: string;
    contents: string;
    title: string;
    published_date: string;
}

@Injectable()
export class MockDataService {

    private board: Board[] = [{
        'author': 1,
        'title': 'Evelyn',
        'contents': 'Burns',
        'category': 'eburns0@amazon.co.uk'
    } ];

    constructor( private _http: HttpClient ) {

    }

    public listboard(from: number, count: number, orderBy: ColumnOrder[] ): Observable<TableResultsPage> {
            
            const result = this.board.slice(from, from + count);
            
            const pr = new TableResultsPage();
            pr.count = count;
            pr.from = from;
            pr.total = this.board.length;
            pr.results = result;
        
            console.log( "result", result );
    //      pr.results = data;
    
    //      console.log("pr", pr);
            return Observable.of(pr);
    }
    public setdata(data){
        console.log( "setdata", data );
        this.board = data ;
               
    }
    private sortFunction(order) {
        return (board1: board, board2: board) => {
            if ('asc' === order.direction) {
                if (board1[order.property] > board2[order.property]) {
                    return 1;
                }
                if (board1[order.property] < board2[order.property]) {
                    return -1;
                }
            } else {
                if (board1[order.property] < board2[order.property]) {
                    return 1;
                }
                if (board1[order.property] > board2[order.property]) {
                    return -1;
                }
            }
            return 0;
        };
    }

}
