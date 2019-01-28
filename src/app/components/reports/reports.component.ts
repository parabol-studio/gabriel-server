import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.html'
})
export class ReportsComponent {
  public reports: any;
  public filter: string;
  public selectedReport: Object;

  constructor(private http: HttpClient, private router: Router) {
    const location = window.location.origin.replace('4000', '8002');

    const headers = {
      headers: new HttpHeaders({
        'uuid': JSON.parse(sessionStorage.getItem('gabriel-session')).uuid
      })
    };

    this.http.get(`${ location }/gabriel/reports`, headers).subscribe(
      reports => this.reports = reports,
      err => {
        sessionStorage.removeItem('gabriel-session');
        this.router.navigate(['/gabriel/auth']);
      }
    );
  }

  public showBody(log) { this.selectedReport = log; }

  public filterList(value) { this.filter = (value === '') ? null : value; }

  public checkType(log) {
    return (typeof log === 'object') ? true : false;
  }
}
