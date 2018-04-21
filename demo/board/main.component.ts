import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MockDataService} from '../mock-data.service';

import {Person} from '../mock-data.service';
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

@Component({
    selector: 'main-component',
//  templateUrl: './test.component.html',
    template:` 
<!--    <div class="text-right mx-auto col-8">  
        <span (open)="setUsername($event)" [innerHTML]="username"></span>
        <button type="button" class="btn btn-primary" (click)="logout()">로그아웃</button>     
        <button type="button" class="btn btn-primary" routerLink="/login">로그인</button>     
        <button type="button" class="btn btn-primary" routerLink="/write">글쓰기</button>                   
    </div> 
-->
    <nav class="navbar navbar-dark bg-primary navbar-expand-md py-md-2">
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
    
    <div class="container mx-auto col-8">
        <app-dashboard class="mx-auto col-8" [curcontents]="curcontents"></app-dashboard> 
     
        <ngb-tabset>
        <ngb-tab title="종합">
            <ng-template ngbTabContent>
              
            </ng-template>
        </ngb-tab>
        <ngb-tab>
        <ng-template ngbTabTitle>추천</ng-template>
        <ng-template ngbTabContent>
        </ng-template>
          </ngb-tab>
          <ngb-tab title="Disabled" [disabled]="true">
            <ng-template ngbTabContent>
              <p>Sed commodo, leo at suscipit dictum, quam est porttitor sapien, eget sodales nibh elit id diam. Nulla facilisi. Donec egestas ligula vitae odio interdum aliquet. Duis lectus turpis, luctus eget tincidunt eu, congue et odio. Duis pharetra et nisl at faucibus. Quisque luctus pulvinar arcu, et molestie lectus ultrices et. Sed diam urna, egestas ut ipsum vel, volutpat volutpat neque. Praesent fringilla tortor arcu. Vivamus faucibus nisl enim, nec tristique ipsum euismod facilisis. Morbi ut bibendum est, eu tincidunt odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris aliquet odio ac lorem aliquet ultricies in eget neque. Phasellus nec tortor vel tellus pulvinar feugiat.</p>
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
    
    private person : any;
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
        if( this.person ){
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
          this.getdata1(); 
          
          console.log( "this.curcontents" , this.curcontents ) ;
/*
        if( this.person ){
               const id = +this.activatedRoute.snapshot.paramMap.get('id') ; 
               console.log( "id", id ,this.person[id].contents );
               this.dashboard.setcontents( this.person[id].contents );
              
        }
*/        
    }
    getdata1() {
        this._http.get( environment.IP + ':8080/api/books')
 //                   .map((res: Response) => res.json())
                    .subscribe(data => {                            
                            this.person = data ;
                            this.mockDataService.setdata(data);
                            this.table.onPageClicked(0) ;
                            this.curcontents = this.person ;
                            console.log("aa", this.person );  
                            
               })
    }
                                        
    logout(){
       this.authenticationService.logout();
    }
    getdata(){           
      this.dataSource = (rpd => this.mockDataService.listPersons(rpd.from, rpd.count, rpd.orderBy ));        
            const currentPage = this.activatedRoute.snapshot.queryParams['currentPage'];
    //      console.log("getdata", this.dataSource);
            if (currentPage) {
                this.table.currentPage = Number(currentPage);
            }    
    }
    get1(): void {
 //      this.tableComponent.refreshData();
       this.table.onPageClicked(0) ;
    }
    setUsername(){
 //        var username =  JSON.parse(localStorage.getItem("currentUser")) ;                       });    
 //        this.username = username['uesrname'];
         this.username = "asas";
//         console.log ( "asdaa" );
    }
    
}
