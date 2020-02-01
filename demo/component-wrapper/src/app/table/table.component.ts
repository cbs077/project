import {Component, ContentChild, Input, OnInit, Injectable } from '@angular/core';
import {TableResultsPage} from '../table-results-page';
import {PageRequestData} from '../page-request-data';
import {TableColumn} from '../table-column';
import {FooterLegend} from '../footer/footer-legend';
import {Observable} from 'rxjs/Observable';
import {ColumnOrder} from '../column-order';
import {TableStateService} from '../table-state.service';
import {TableState} from '../table-state';

@Component({
    moduleId: module.id,
    selector: 'ngx-iq-table',
    template: `<table class="table table-bordered table-striped">
        <thead>
        <tr class="header">
            <th *ngFor="let column of columns" [style.width]="column.width + '' + column.widthUnit + ''"
                [class]="column.css">
                <div *ngIf="column.prop !== undefined" class="sortable">
                    <a (click)="sort(column.prop)">
                        {{column.name}}
                    </a>
                    <i class="glyphicon glyphicon-chevron-up icon" *ngIf="getSortDirection(column) === 'asc'"></i>
                    <i class="glyphicon glyphicon-chevron-down icon" *ngIf="getSortDirection(column) === 'desc'"></i>
                </div>
    
                <div *ngIf="column.prop === undefined">
                        <span>
                            {{column.name}}
                        </span>
                </div>
            </th>
        </tr>
        </thead>
        <tbody class="body">
        <ng-template ngFor [ngForOf]="resultsPage.results" [ngForTemplate]="rows"  ></ng-template>
        </tbody>
    </table>
    <ngx-iq-footer [resultsPage]="resultsPage"
                   [currentPage]="currentPage"
                   (onPageClicked)="onPageClicked($event)"
                   [footerLegend]="footerLegend"></ngx-iq-footer>
    `,
    styleUrls: ['./table.component.css']
})
@Injectable()
export class TableComponent implements OnInit {

    @Input() tableId: string;
    @Input() dataSource: (requestPageData: PageRequestData) => Observable<TableResultsPage>;
    @Input() columns: TableColumn[] = [];
    @Input() pageSize: number;
    @Input() footerLegend: FooterLegend = {
        showingResults: 'Showing results',
        of: 'of',
        to: 'to',
        noresults: 'No results'
    };
    @Input() currentPage = 0;
    resultsPage: TableResultsPage;
    @ContentChild('rows') rows: any;
    private columnOrdering: ColumnOrder[] = [];

    constructor(private tableStateService: TableStateService) {
    }

    ngOnInit() {
        this.resultsPage = new TableResultsPage();
        this.resolveInitialPagination();
        this.loadData(this.buildDataRequestConfig());
    }

    private resolveInitialPagination() {
        if (this.tableId) {
            const tableState = this.tableStateService.state[this.tableId];
            if (tableState) {
                this.loadState(tableState);
            } else {
                this.saveState();
            }
        }
    }

    loadState(tableState: TableState) {
        this.columnOrdering = tableState.ordering;
        this.currentPage = tableState.currentPage;
    }

    saveState() {
        this.tableStateService.state[this.tableId] = {
            currentPage: this.currentPage,
            ordering: this.columnOrdering
        };
    }

    onPageClicked(page: number) {
        this.currentPage = page;
        if (this.tableId) {
            this.saveState();
        }
        const drc = this.buildDataRequestConfig();
        this.loadData(drc);
    }

    sort(prop: string) {
        if (this.columnOrdering.length === 0) {
            this.columnOrdering.push({
                property: prop,
                direction: 'asc'
            });
        } else {
            let indexToRemove = -1;
            this.columnOrdering.forEach((columnOrder, index) => {
                if (columnOrder.property === prop) {
                    indexToRemove = index;
                }
            });
            if (indexToRemove > 0) {
                const previousDirection = this.columnOrdering[indexToRemove].direction;
                this.columnOrdering.splice(indexToRemove, 1);
                this.columnOrdering.splice(0, 0, {
                    property: prop,
                    direction: previousDirection === 'asc' ? 'desc' : 'asc'
                });
            } else if (indexToRemove === 0) {
                const previousDirection = this.columnOrdering[indexToRemove].direction;
                this.columnOrdering[indexToRemove].direction = previousDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.columnOrdering.splice(0, 0, {
                    property: prop,
                    direction: 'asc'
                });
            }
        }

        const drc = this.buildDataRequestConfig();
        this.loadData(drc);
    }

    buildDataRequestConfig(): PageRequestData {
        const drc = new PageRequestData();
        drc.from = this.currentPage * this.pageSize;
        drc.count = this.pageSize;
        drc.orderBy = this.columnOrdering;
        return drc;
    }

    private loadData(requestPageData: PageRequestData) {
    //    console.log( "loadData",  this.dataSource);
        this.dataSource(requestPageData)
            .subscribe((resultsPage) => this.resultsPage = resultsPage);
    }

    refreshData() {
        console.log("rfresh()");
 //       this.loadData(this.buildDataRequestConfig());
        
        this.currentPage = 0;
        if (this.tableId) {
            this.saveState();
        }
        const drc = this.buildDataRequestConfig();
        this.loadData(drc);
    }

    getSortDirection(column: TableColumn): 'asc' | 'desc' {
        let sortDirection;
        this.columnOrdering
            .forEach((c) => {
                if (column.prop === c.property) {
                    sortDirection = c.direction;
                }
            });
        return sortDirection;
    }
}
