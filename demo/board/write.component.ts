import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of, pipe } from 'rxjs';
import { mergeMap, switchMap, retry, 
         map, catchError, filter, scan } from 'rxjs/operators';
import {Router} from '@angular/router';

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
    template:`
         <div class="mx-auto" style="width:80% ; margin-top:30px; margin-left:auto; margin-right:auto;">
        <!-- <div class="form-group">
          <label for="category">분류1:</label>
          <input [(ngModel)]="category" class="form-control" (blur)="updateTitle()" >
        </div> -->
        <div class="form-group">
          <label for="title">제목:</label>
          <input [(ngModel)]="title" class="form-control" (blur)="updateTitle()" >
        </div>
        <!--
        <div>
          <ul class="list-group">
		        <li class="list-group-item"  *ngFor="let item of itemsList">
		          <input type="radio"  name="list_name" value="{{item.value}}" /> 
		          {{item.name}}
		          
		        </li>
		  </ul>
		</div>
		-->
		<!-- Default unchecked -->
		<div class="custom-control custom-radio"  *ngFor="let item of itemsList">
		  <input type="radio" class="custom-control-input" id="{{item.name}}" name="defaultExampleRadios" value="{{item.value}}" (change)="onItemChange( item.value )" mdbInput>
		  <label class="custom-control-label" for="{{item.name}}">{{item.value}}</label>
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

    styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

    category: string;
    title: string;
    ckeditorContent: string;
    categorylist: any;

	radioSel:any;
	radioSelected:string;
	radioSelectedString:string;
	itemsList:  any;
	
    @ViewChild(TableComponent) table: TableComponent;
    dataSource: (requestPageData: PageRequestData) => Observable<TableResultsPage>;
    
    searchMovieModel: SearchMovieModel;
    contents: any;
    
    constructor(private mockDataService: MockDataService,
                private activatedRoute: ActivatedRoute,
                private movieObservableService: WebApiObservableService,
                private _http: HttpClient, 
                private router: Router) {
    }

    ngOnInit(): void {
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
	onItemChange(value){
	   console.log(" Value is : ", value );
	   this.category = value
	}	
	updateTitle(): void{
	  var query = { "analyzer":  "nori_analyzer", "text": this.title }
	  
	  this.movieObservableService
	  .createService( "http://175.195.151.203:9200/korean_analyzer/_analyze", query )
	  .pipe(
          switchMap( wordlist => {
              let category = wordlist;
              return this._http.get( environment.IP + '/api/service/keyword?keyword='+ '대출' );
          }),
          catchError(err => of([]))
      )
	  .subscribe(
	        result => {  
	           this.itemsList = []	
	           /*result.forEach((key) => {
			      this.itemsList.push({ "name": key.root, "value": key.root })
			   })
			   console.log("updateTitle: " , result)*/
		    }
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
            result => {
            	this.router.navigateByUrl('/main');
            	console.log("5. createService: " , result)
            }
  	 );   
  }

}
