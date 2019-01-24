import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reports',
  templateUrl: '../templates/reports.html'
})
export class ReportsComponent {
  public reports: any;
  public filter: string;
  public selectedReport: Object;

  constructor(private http: HttpClient) {
    const location = window.location.origin.replace('4000', '8085'); 

    this.http.get(`${ location }/gabriel/reports`).subscribe(
      reports => this.reports = reports,
      err => console.log(err)
    );
  }

  public showBody(log) { this.selectedReport = log; }

  public filterList(value) { this.filter = (value === '') ? null : value; }
}
