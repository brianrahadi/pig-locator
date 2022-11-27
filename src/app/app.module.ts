import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReportTableComponent } from './report-table/report-table.component';
import { PigReportComponent } from './pig-report/pig-report.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { AddReportButtonComponent } from './add-report-button/add-report-button.component';
import { MatDialogModule } from '@angular/material/dialog';
// import { AddReportDialogComponent } from './add-report-dialog/add-report-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ReportTableComponent,
    PigReportComponent,
    MapComponent,
    // AddReportDialogComponent,
    AddReportButtonComponent
  ],
  // entryComponents: [AddReportDialogComponent, AddReportButtonComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
