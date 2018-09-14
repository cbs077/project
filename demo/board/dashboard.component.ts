import { Component, OnInit, Input, OnChanges, AfterViewChecked, SimpleChange,
 ViewChild, AfterViewInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import {Person} from '../mock-data.service';
import { MockDataService} from '../mock-data.service';
import { WebApiObservableService } from './web-api-observable.service';
import { environment } from '../environment';

@Component({
  selector: 'app-dashboard',
  template: `  
           <table  *ngIf="detail_exists === true" class="table table-bordered mx-auto col-12" >
                <thead>
                  <tr>
                    <td style="width: 20%">{{username}}</td>
                    <td style="width: 40%">Lastname</td>
                    <td style="width: 40%">Email</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                     <td colspan="100%" [innerHTML]="myHtml"></td>                        
                  </tr>
                </tbody>
           </table>
           <div class="float-right" *ngIf="detail_exists === true">
 <!--               <button type="button" class="btn btn-primary">수정</button>  -->
                <button type="button" class="btn btn-primary" (click)="deleteContent($event)">삭제</button>
           </div>
              
   <!--      <button type="button" class="btn btn-info">1</button>
   </div> -->
   
     <!--         <app-test-component></app-test-component>
              <router-outlet></router-outlet> -->`,
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  
  constructor(
//    private renderer:Renderer
  //  private route: ActivatedRoute,
      private mockDataService: MockDataService,
      private boardObservableService: WebApiObservableService
  ) { }

  test : number ;
  myHtml : any;
  username : string;
  detail_exists = false ;
  _id : number;
    
  @Input() curcontents : any ;
  prenpendHtml: string = '<div><b>this prepended html</b></div>';
    
  ngOnInit() {
  //    const id = +this.route.snapshot.paramMap.get('id') ;
  //    console.log( "dash", id , this.person );
  //    this.test = id ;
  }
  
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
    }
  }/*
  ngAfterViewInit() {
    console.log('AfterViewInit');
  }*/
  setcontents( val ): void {
      this.detail_exists = true;
      this.myHtml = this.curcontents[val].contents;
      this.username = this.curcontents[val].username ;
      this._id = this.curcontents[val]._id ;        
  }
  deleteContent(){  
      this.boardObservableService
            .deleteService( environment.IP + "/api/board/"+ this._id  )
            .subscribe(
                result => console.log("deleteService: " , result)
    //            error => this.errorMessage = <any>error
     ); 
  }
    
}
