import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MockDataService} from '../mock-data.service';

//import {Board} from '../mock-data.service';
import {PageRequestData} from '../component-wrapper/src/app/page-request-data';
import {TableResultsPage} from '../component-wrapper/src/app/table-results-page';
import {TableColumn} from '../component-wrapper/src/app/table-column';
import {ActivatedRoute} from '@angular/router';
import {TableComponent} from '../component-wrapper/src/app/table/table.component';
//import {Http} from '@angular/http';

import { HttpClient } from "@angular/common/http"; 
//import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';
import { AuthenticationService } from '../loginpage/_services/index';
import { environment } from '../environment';

declare var jquery:any;
declare var $ :any;

@Component({
    moduleId: module.id,
    selector: 'main-component',
//  templateUrl: './test.component.html',
    template:` 
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <!-- Brand -->
  <a class="navbar-brand" href="#">KnowHow</a>

  <!-- Links -->
  <ul class="navbar-nav ml-auto">
    <li class="nav-item">
      <a class="nav-link" href="#">로그아웃</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" routerLink="/login" >로그인</a>
    </li>

    
  </ul>
  <ul class="navbar-nav">
    <!-- Dropdown -->
    <li class="nav-item dropdown mr-auto">
      <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
        사용자
      </a>
      <div class="dropdown-menu" style="margin-left:-20px;min-width:7rem">
        <a class="dropdown-item" href="#">회원정보</a>
        <a class="dropdown-item" href=""(click)="logout()" >로그아웃</a>
      </div>
    </li>
  </ul>
</nav>

<!--
    <nav class="navbar navbar-dark bg-primary navbar-expand-md py-md-2 fixed-top">
        <a class="navbar-brand" href="#">노하우</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item py-md-2"><a href="//codeply.com" class="nav-link">Codeply</a></li>
                <li class="nav-item py-md-2"><a href="#" class="nav-link">Link</a></li>
            </ul>
      
            <ul class="navbar-nav">
              <li class="nav-item">          
                <a (open)="setUsername($event)" [innerHTML]="username"></a> 
              </li>
              <li class="nav-item">
                <a class="nav-link" (click)="logout()">로그아웃</a>
              </li>          
              <li class="nav-item">
                <a class="nav-link" routerLink="/login">로그인</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/write">글쓰기</a>
              </li>
            </ul>
        </div>
    </nav>
  
-->
  <div class="input-group mx-auto col-10 mt-4">    
      <input type="text" class="form-control" placeholder="Search for...">
      <span class="input-group-btn">
        <button class="btn btn-secondary" type="button" routerLink="/write">Go!</button>
      </span>
      <span class="col-1"></span>
  </div>

 <!-- detail write -->      
    <div class="container mx-auto col-10">
        <app-dashboard class="mx-auto col-8" [curcontents]="curcontents"></app-dashboard> 
     
        <ngb-tabset class="border-primary">
            <ngb-tab title="종합">
            <ng-template ngbTabContent>    
            </ng-template>
            </ngb-tab>
            <ngb-tab>
            <ng-template ngbTabTitle>추천</ng-template>
            <ng-template ngbTabContent>
            </ng-template>
            </ngb-tab> 
        </ngb-tabset>

        <ngx-iq-table
                    [tableId]="'testTable'"
                    [dataSource]="dataSource"
                    [columns]="columns"
                    [pageSize]=5>
                <ng-template #rows let-item="$implicit" let-i="index">
                    <tr>
                        <td>{{item.id}}</td>
                        <td>{{item.category}}</td> <!-- item.id -->
                        <td ><a routerLink="/dashboard/{{i}}" (click)="handleHeaderRowClick(i)">{{item.title}}</a></td>                   
     <!--  <a [routerLink]="['/dashboard', item.title]" <td><a ng-href="#/write">{{item.title}}</a></td>-->         
                    </tr>
          </ng-template>
        </ngx-iq-table>
        <router-outlet></router-outlet>
    </div>
`,

    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    @ViewChild(TableComponent) table: TableComponent;    
    @ViewChild(DashboardComponent) dashboard: DashboardComponent;
    
    private board : any;
    username:string ;
    dataSource: (requestPageData: PageRequestData) => Observable<TableResultsPage>;
    
    columns: TableColumn[] = [
        {
            name: '번호',
            prop: 'author',
            width: 10,
            widthUnit: '%'
        }, {
            name: '분류',
            prop: 'category',
            width: 20,
            widthUnit: '%'
        },{
            name: '제목',
            prop: 'title',
            width: 50,
            widthUnit: '%'
        } 
    ];
    curcontents : any ;
   
    constructor(private mockDataService: MockDataService,
                private tableComponent: TableComponent,
                private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private _http: HttpClient) 
    {  
         var username =  JSON.parse(localStorage.getItem("currentUser")) ;
         if( username != null ) this.username = username['username'];
         console.log("constructor" );  
        
    //    console.log( "username", username , username['username'] );
    //    this.getdata();        
    }
    ngAfterViewChecked(){
        if( this.board ){
           const id = +this.activatedRoute.snapshot.paramMap.get('id') ; 
        }
    }
    handleHeaderRowClick(data){
//       this.detail_exists = true ;
       const id = +this.activatedRoute.snapshot.paramMap.get('id') ;  
       this.dashboard.setcontents( data ); 
    }
    ngOnInit(): void {            
          this.getdata();   
//          this.getdata1(); 
          
          console.log( "this.curcontents" , this.curcontents ) ;
/*
        if( this.board ){
               const id = +this.activatedRoute.snapshot.paramMap.get('id') ; 
               console.log( "id", id ,this.board[id].contents );
               this.dashboard.setcontents( this.board[id].contents );              
        }
*/        
    }
/*    getdata1() {
      
    }
 */                                       
    logout(){
       this.authenticationService.logout();
    }
    getdata(){           
      this.dataSource = (rpd => this.mockDataService.listboard(rpd.from, rpd.count, rpd.orderBy ));        
            const currentPage = this.activatedRoute.snapshot.queryParams['currentPage'];
    //      console.log("getdata", this.dataSource);
            if (currentPage) {
                this.table.currentPage = Number(currentPage);
            }    
        
            this._http.get( environment.IP + ':8080/api/board')
 //                   .map((res: Response) => res.json())
                    .subscribe(data => {                            
                            this.board = data ;
                            this.mockDataService.setdata(data);
                            this.table.onPageClicked(0) ;
                            this.curcontents = this.board ;
                            console.log("get data", this.board );  
           })
    }
 /*   get1(): void {
 //      this.tableComponent.refreshData();
       this.table.onPageClicked(0) ;
    }
*/    
    setUsername(){
 //        var username =  JSON.parse(localStorage.getItem("currentUser")) ;                       });    
 //        this.username = username['uesrname'];
 //        this.username = "asas";
//         console.log ( "asdaa" );
    }
    
}
