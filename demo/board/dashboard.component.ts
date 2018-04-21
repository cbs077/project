import { Component, OnInit, Input, OnChanges, AfterViewChecked, SimpleChange,
 ViewChild, AfterViewInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Person} from '../mock-data.service';

@Component({
  selector: 'app-dashboard',
  template: ` <!-- <div>test:{{test}}</div> <div class="container-fluid bg-1 text-center"></div> -->
   <!--  <div class="w3-example mx-auto col-8">  -->
      
       <table  *ngIf="detail_exists === true" class="table table-bordered mx-auto col-8">
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
  ) { }

  test : number ;
  myHtml : any;
  username : string;
  detail_exists = false ;
    
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
  setcontents(test): void {
      this.detail_exists = true;
      this.myHtml = this.curcontents[test].contents;
      this.username = this.curcontents[test].username ;
      
  }
}
