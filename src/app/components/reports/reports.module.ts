import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgPipesModule } from 'ngx-pipes';

import { TimeFromPipe } from '../../pipes/from.pipe';

import { ReportsComponent } from '../reports/reports.component';

import {
  ParabolTextModule,
  ParabolPendingModule
} from 'parabol-material';

@NgModule({
  declarations: [
    ReportsComponent,
    TimeFromPipe
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    NgPipesModule,
    NgxJsonViewerModule,
    ParabolTextModule,
    ParabolPendingModule
  ],
  bootstrap: [ ReportsComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ReportsModule { }
