import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MockDataService} from '../mock-data.service';
import {PageRequestData} from '../component-wrapper/src/app/page-request-data';
import {TableResultsPage} from '../component-wrapper/src/app/table-results-page';
import {TableColumn} from '../component-wrapper/src/app/table-column';
import {ActivatedRoute} from '@angular/router';
import {TableComponent} from '../component-wrapper/src/app/table/table.component';

import { SearchMovieModel } from './search-movie.model';
import { WebApiObservableService } from '../service/web-api-observable.service';
import { environment } from '../environment';
import { HttpClient } from "@angular/common/http";

@Component({
//    selector: 'app-test-component',
//  templateUrl: './test.component.html',
    template:`
         <div class="mx-auto" style="width:80% ; margin-top:30px; margin-left:auto; margin-right:auto;">
<!--         
         <ul>    
            <span style="width:30%">분류
            <input [(ngModel)]="category"  class="form-control col-3"></span>
        
            <span style="width:30%">제목</span>   
            <input [(ngModel)]="title"  class="form-control col-9">
         </ul>
-->
        <div class="form-group">
          <label for="category">분류1:</label>
          <input [(ngModel)]="category" class="form-control" (blur)="updateTitle()" >
        </div>
        <div class="form-group">
          <label for="title">제목:</label>
          <input [(ngModel)]="title" (ngModelChange)="valuechange($event)" class="form-control" >
        </div>

         <ckeditor
                  [(ngModel)]="ckeditorContent">
                    <ckbutton [name]="'saveButton'"
                      [command]="'saveCmd'"
                      (click)="save($event)"
                      [icon]="'save.png'"
                      [label]="'Save Document'"
                      [toolbar]="'clipboard,1'">
                    </ckbutton>
         </ckeditor>
         <button type="button" class="btn btn-primary centered"  (click)="save()">저장</button> 
             
        <!--    <button class="btn btn-sm" [routerLink]="['/test2']">Navegar</button> -->
     </div>
`,

    styleUrls: ['./main.component.css']
})
export class WriteComponent implements OnInit {

    category: string;
    title: string;
    ckeditorContent: string;
    categorylist: any;

    @ViewChild(TableComponent) table: TableComponent;
    dataSource: (requestPageData: PageRequestData) => Observable<TableResultsPage>;
    
    searchMovieModel: SearchMovieModel;
    contents: any;
    
    constructor(private mockDataService: MockDataService,
                private activatedRoute: ActivatedRoute,
                private movieObservableService: WebApiObservableService,
                private _http: HttpClient ) {
    }

    ngOnInit(): void {
        /*this.dataSource = (rpd => this.mockDataService.listboard(rpd.from, rpd.count, rpd.orderBy));
        const currentPage = this.activatedRoute.snapshot.queryParams['currentPage'];

        if (currentPage) {
            this.table.currentPage = Number(currentPage);
        }*/
        
        console.log('ELASTICSEARCH_URL: ', process.env.ELASTICSEARCH_URL); // 'local'
 
        this._http.get( environment.IP + '/admin/category' )
        .subscribe( data => {
            console.log( "get data:", data );
            this.categorylist = data ;
        })
    }

	valuechange(newValue): void {
	  //mymodel = newValue;
	  console.log(newValue)
	  this._http.get( environment.IP + '/api/service/translate?title='+ newValue )
	        .subscribe( data => {
	        //this.board = data;
	        //this.mockDataService.setdata( data );
	        //this.table.onPageClicked( 0 );
	        //this.curcontents = this.board;
	        console.log( "get data:", data );
      },
      err => {
          console.log( 'error:', err.error.message)
        
      })
	}
	updateTitle(): void{
	  var query = { "analyzer":  "nori", "text": "여행 저렴하게 가는 방법." }
	  
	  this.movieObservableService
	  .createService( "http://175.195.151.203:9200/_analyze", query )
	  .subscribe(
	        result => console.log("updateTitle: " , result)
	        error => this.errorMessage = <any>error
	  );   		
	}
    save(): void {
     var contents = this.ckeditorContent ;
     var username = JSON.parse(localStorage.getItem("currentUser")) ; 
     
     this.contents = {"username": username["username"], "category": this.category , "title": this.title , "contents": contents};  

     console.log( "contents" , contents );
     
     this.movieObservableService
     .createService( environment.IP + '/api/board', this.contents )
     .subscribe(
            result => console.log("5. createService: " , result)
            error => this.errorMessage = <any>error
  	 );   
  }

}
