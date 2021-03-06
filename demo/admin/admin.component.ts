import { Component, OnInit, Input, OnChanges, AfterViewChecked, SimpleChange,
 ViewChild, AfterViewInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import {Person} from '../mock-data.service';
import { MockDataService} from '../mock-data.service';
import { WebApiObservableService } from '../service/web-api-observable.service';
import { environment } from '../environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-admin',
  template: `  
      <div class="input-group mx-auto col-10 mt-4">    
          <input type="text"  [(ngModel)]="firstCategory" class="form-control" placeholder="1차 추가">         
          <input type="text"  [(ngModel)]="secondCategory" class="form-control" placeholder="2차 추가">
          <span class="input-group-btn">
            <button class="btn btn-secondary" type="button" (click)="add()" > 추가  </button>
          </span>
          <span class="col-1"></span>
          </div>
          <div>
          <table class="table table-bordered mt-5">
            <tbody>
                <tr *ngFor="let item of categorylist; let i=index" >
                    <td> {{item.firstCategory}} </td>
                    <td> {{item.secondCategory}} </td>
                </tr>
            </tbody>
          </table> 
      </div>
        `,
//    styleUrls: ['./dashboard.component.css']
})
export class AdminComponent implements OnInit, OnChanges {
  
  firstCategory : string ;
  secondCategory : string ;
  categorylist : any ;
  contents: any;
//  reqlist : 
  constructor(
          private movieObservableService: WebApiObservableService,
          private _http: HttpClient
  ) { }
   
  ngOnInit() {
      this._http.get( environment.IP + '/admin/category' )
      .subscribe( data => {
          console.log( "get data:", data );
          this.categorylist = data ;
      })
  }
  
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
  
  }
  add(): void { 
      this.contents = {  "firstCategory": this.firstCategory, "secondCategory": this.secondCategory  };  

      console.log( "contents" , this.contents );
      this.movieObservableService
             .createService( environment.IP + '/admin/category', this.contents )
             .subscribe(
                 result => console.log("5. createService: " , result)
     //            error => this.errorMessage = <any>error
     );   
   }
    
}
